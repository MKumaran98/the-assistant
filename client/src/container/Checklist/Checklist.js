import React,{Component} from 'react';
import ChecklistItems from './ChecklistItems/ChecklistItems';
import ChecklistItem from './ChecklistItems/ChecklistItem/ChecklistItem';
import classes from './Checklist.css';
import Button from '../../UI/Button/Button';
import { connect } from 'react-redux';
import axios from 'axios';
import Spinner from '../../UI/Spinner/Spinner';


class Checklist extends Component{
    state={
        checklist:[],     
        newChecklist:{
            value:'',
            checked:false
        }
    }

    componentDidMount(){
        let config = {
            headers: {
               Authorization: "Bearer " + this.props.token
            }
        }
        axios.get("/api/api-getchecklist/"+this.props.userId,config)
        .then(response=>{
            if(this.state.checklist.length!==response.data.data.checklist.length){
                this.setState({
                    checklist:response.data.data.checklist
                })
            }
        });
    }

    dataEnteredHandler=(event)=>{
        let newItem={
            value:event.target.value,
            checked:false
        }
        this.setState({
            newChecklist:newItem
        })
    }

    itemAddedHandler=(event)=>{
        event.preventDefault();
        let newChecklist=[...this.state.checklist];
        newChecklist.push(this.state.newChecklist);
        this.setState({
            checklist:newChecklist,
            newChecklist:{
                value:'',
                checked:false
            }
        })
        this.sendChecklist(newChecklist);
    }

    itemDeleteHandler=(id,event)=>{
        let updatedList=this.state.checklist;
        updatedList.splice(id,1);
        this.setState({
            checklist:updatedList
        })
        this.sendChecklist(updatedList);
    }

    itemCheckedHandler=(event,id)=>{
        let item=this.state.checklist[id];
        item.checked=!this.state.checklist[id].checked;
        let newChecklist=this.state.checklist;
        newChecklist[id]=item;
        this.setState({
            checklist:newChecklist,
            newChecklist:{
                value:'',
                checked:false
            }
        })
        this.sendChecklist(newChecklist);
    }

    deleteListHandler=(event)=>{
        event.preventDefault();
        this.setState({
            checklist:[],
            newChecklist:{
                value:'',
                checked:false
            }
        })
        this.sendChecklist([]);
    }

    sendChecklist=(updatedChecklist)=>{
        let config = {
            headers: {
               Authorization: "Bearer " + this.props.token
            }
        }
        
        let data={
            checklist:updatedChecklist
        }

        axios.post("/api/api-checklist/"+this.props.userId,data,config)
        .then(response=>{
        })
        .catch(error=>alert("cannot add item now do check back later"));
        ;
    }

    render(){
        let checklist=null;
        if(this.state.checklist.length>0){
            checklist=this.state.checklist.map((item,index)=>{
                return(
                    <ChecklistItem
                        key={index+""+Math.random()}
                        id={index}
                        checked={item.checked}
                        itemDelete={this.itemDeleteHandler}
                        itemChecked={this.itemCheckedHandler}
                    >{item.value}</ChecklistItem>
                );
            })
        }

        let CheckList=<Spinner/>
        if(this.state.checklist.length>=0){
            CheckList=(
                <div className={classes.CheckList}>
                <h1>Check List</h1>
                {checklist}
                <ChecklistItems
                itemAdded={this.itemAddedHandler}
                dataEntered={this.dataEnteredHandler}
                textCount={this.state.newChecklist.value.length}
                currentValue={this.state.newChecklist.value}
                disabled={this.state.newChecklist.value.length>=15?true:false}
                />
                <div className={classes.btn}>
                    <Button 
                        btnType="Danger"
                        buttonClicked={(event)=>this.deleteListHandler(event)}
                    >
                        Delete List
                    </Button>
                </div>
            </div>
            );
        }

        return(
            CheckList
        );
    }
}

const mapStateToProps=state=>{
    return{
        userId:state.userId,
        token:state.token
    }
}

export default connect(mapStateToProps,null)(Checklist);