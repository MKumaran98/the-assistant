import React,{Component} from 'react';
import classes from './TodoList.css'
import Modal from '../../component/Modal/Modal';
import Button from '../../UI/Button/Button';
import NewTask from './NewTask/NewTask';
import TaskList from './TaskList/TaskList';
import SelectedTask from './SelectedTask/SelectedTask';
import { connect } from 'react-redux';
import axios from 'axios';


class TodoList extends Component{
    state={
        list:[],
        title:'',
        dueDate:'',
        description:'',
        priority:'1',
        modalOpen:false,
        addtask:false,
        selectedTask:null
    }

    componentDidMount(){
        let config = {
            headers: {
               Authorization: "Bearer " + this.props.token
            }
        }
        axios.get("/api-gettodolist/"+this.props.userId,config)
        .then(response=>{
            if(this.state.list.length!==response.data.data.list.length){
                this.setState({
                    list:response.data.data.list
                })
            }
        });
    }

    addNewTaskHandler=()=>{
        this.setState({
            modalOpen:true,
            addtask:true,
            selectedTask:null
        })
    }

    closeModalHandler=()=>{
        this.setState({
            modalOpen:false,
            selectedTask:null
        })
    }

    titleAddedHandler=(event)=>{
        this.setState({
            title:event.target.value
        })
    }

    descriptionAddedHandler=(event)=>{
        this.setState({
            description:event.target.value
        }) 
    }

    dueDateHandler=(event)=>{
        this.setState({
            dueDate:event.target.value
        })
    }

    priorityHandler=(event)=>{
        this.setState({
            priority:event.target.value
        })
    }

    addTaskHandler=(event)=>{
        event.preventDefault();
        let newTask={
            title:this.state.title,
            dueDate:this.state.dueDate,
            description:this.state.description,
            priority:this.state.priority
        }
        let updatedList=[...this.state.list];
        updatedList.push(newTask);
        this.setState({
            list:updatedList,
            addtask:false,
            title:'',
            dueDate:'',
            description:'',
            priority:'1',
            modalOpen:false
        })
        this.sendTodoList(updatedList);
    }

    taskClickedHandler=(event,index)=>{
        this.setState({
            selectedTask:index,
            modalOpen:true,
            addtask:false
        })
    }

    deleteClickedHandler=(event)=>{
        event.preventDefault();
        let updatedList=[...this.state.list];
        updatedList.splice(this.state.selectedTask,1);
        this.setState({
            list:updatedList,
            modalOpen:false,
            selectedTask:null
        })
        this.sendTodoList(updatedList);
    }

    sendTodoList=(updatedTodoList)=>{
        let config = {
            headers: {
               Authorization: "Bearer " + this.props.token
            }
        }
        
        let data={
            list:updatedTodoList
        }

        axios.post("/api-settodolist/"+this.props.userId,data,config)
        .then(response=>{
        })
        .catch(error=>{
            alert("cannot add item now do check back later")
        });
    }

    render(){
        let showModal=null;
        let taskList=null;
        if(this.state.list.length>0){
            taskList=this.state.list.map((task,index)=>{
                return(<TaskList key={task.title+""+Math.random()} 
                index={index}
                title={task.title}
                priority={task.priority}
                dueDate={task.dueDate}
                description={task.description}
                taskClicked={this.taskClickedHandler}
                />);
            })
        }


        if(this.state.modalOpen){
            showModal=(<Modal
                        show={this.state.modalOpen}
                        backdropClicked={this.closeModalHandler}
                        >
                        {this.state.addtask?
                            <NewTask
                            titleAdded={this.titleAddedHandler}
                            descriptionAdded={this.descriptionAddedHandler}
                            dueDate={this.dueDateHandler}
                            priority={this.priorityHandler}
                            addTask={this.addTaskHandler}

                            />
                        :null}
                        {
                            this.state.selectedTask!=null?<SelectedTask
                            title={this.state.list[this.state.selectedTask].title}
                            priority={this.state.list[this.state.selectedTask].priority}
                            dueDate={this.state.list[this.state.selectedTask].dueDate}
                            description={this.state.list[this.state.selectedTask].description}
                            deleteClicked={this.deleteClickedHandler}
                            />
                            
                        :null
                        }
                        </Modal>);
        }

        return(
            <div className={classes.TodoList}>
                <h1>Todo List</h1>
                {showModal}
                {taskList}
                <div className={classes.btn}>
                    <Button buttonClicked={this.addNewTaskHandler}>
                        Add New Task
                    </Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps=state=>{
    return{
        userId:state.userId,
        token:state.token
    }
}

export default connect(mapStateToProps,null)(TodoList);