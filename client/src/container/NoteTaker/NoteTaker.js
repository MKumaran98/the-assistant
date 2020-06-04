import React,{Component} from 'react';
import Aux from '../../HOC/Auxiliary';
import NewNote from './NewNote/NewNote';
import Modal from '../../component/Modal/Modal';
import TakingNotes from './TakingNotes/TakingNotes';
import DisplayNotes from './DisplayNotes/DisplayNotes';
import Button from '../../UI/Button/Button';
import axios from 'axios'; 
import {connect} from 'react-redux';
import Spinner from '../../UI/Spinner/Spinner'

class NoteTaker extends Component{

    state={
        modalOpen:false,
        notes:[],
        newNote:'',
        characterLimit:false,
        previewNotes:false,
        selectedNote:null,
        takingNotes:false,
        editNote:false
    }

    newNoteClickedHandler=()=>{
        this.setState({
            modalOpen:true,
            characterLimit:false,
            takingNotes:true,
            editNote:false
        })
    }

    closeModalHandler=()=>{
        this.setState({
            modalOpen:false,
            previewNotes:false,
            selectedNote:null,
            takingNotes:false,
            editNote:false
        })
    }

    addNoteClickedHandler=(event)=>{
        //send axios put request here
        event.preventDefault();
        let updatedNotes=[...this.state.notes];
        if(this.state.editNote){
            updatedNotes[this.state.selectedNote]=this.state.newNote
        }else{
            updatedNotes.push(this.state.newNote);
        }
        this.setState({
            notes:updatedNotes,
            newNote:'',

            modalOpen:false,
            takingNotes:false,
            editNote:false
        })
        this.sendNotes(updatedNotes);
    }

    textAddedHandler=(event)=>{
        if(event.target.value.length<=300){
            this.setState({
                newNote:event.target.value,
            })
        }else{
            this.setState({
                characterLimit:true,
            })
            
        }
    }

    viewNotesHandler=(event,note)=>{
        let newSelectedNote=this.state.notes.indexOf(note);
        this.setState({
            modalOpen:true,
            selectedNote:newSelectedNote,
            previewNotes:true,
            
        })
    }

    editButtonClickedHandler=(event)=>{
        this.setState({
                editNote:true,
                newNote:this.state.notes[this.state.selectedNote],
                previewNotes:false
            })
    }

    deleteButtonClickedHandler=(event)=>{
        let updatedNotes=[...this.state.notes];
        updatedNotes.splice(this.state.selectedNote,1);
        this.setState({
            notes:updatedNotes,
            modalOpen:false,
            previewNotes:false
        })
        this.sendNotes(updatedNotes);
    }

    componentDidMount(){
        let config = {
            headers: {
               Authorization: "Bearer " + this.props.token
            }
        }
        axios.get("/api/api-getnotes/"+this.props.userId,config)
        .then(response=>{
            if(this.state.notes.length!==response.data.data.notes.length){
                this.setState({
                    notes:response.data.data.notes
                })
            }
        });
    }

    sendNotes=(updatedNotes)=>{
        let config = {
            headers: {
               Authorization: "Bearer " + this.props.token
            }
        }
        
        let data={
            notes:updatedNotes
        }

        axios.post("/api/api-postnotes/"+this.props.userId,data,config)
        .then(response=>{
        })
        .catch(error=>{console.log(error);alert("cannot add item now do check back later")});
    }    

    render(){
        let takeNewNote=null;
        let previewNotes=null;
        if(this.state.previewNotes&&!this.state.editNote){
            previewNotes=(
                            <Aux>
                                <p style={{marginTop:"10px",marginLeft:"10px"}}>{this.state.notes[this.state.selectedNote]}</p>
                                <Button buttonClicked={this.editButtonClickedHandler}>Edit</Button>   
                                <Button buttonClicked={this.deleteButtonClickedHandler} btnType="Danger">Delete</Button> 
                            </Aux>
                        )
        }

        if(this.state.modalOpen){
            takeNewNote=<Modal show={this.state.modalOpen}
                        backdropClicked={this.closeModalHandler}    
                    >
                    {this.state.takingNotes?<TakingNotes 
                        addNoteClicked={this.addNoteClickedHandler}
                        textAdded={this.textAddedHandler}
                        textCount={this.state.newNote.length}
                        characterLimit={this.state.characterLimit}
                        />:null}
                    {this.state.editNote?<TakingNotes 
                        addNoteClicked={this.addNoteClickedHandler}
                        textAdded={this.textAddedHandler}
                        textCount={this.state.newNote.length}
                        characterLimit={this.state.characterLimit}
                        textValue={this.state.newNote}
                        />:null}
                    {previewNotes}
                    </Modal>
        }
        let existingNotes=null;
        if(this.state.notes){
            existingNotes=this.state.notes.map(note=>{
                return(<DisplayNotes key={note+""+Math.random()} viewNotes={this.viewNotesHandler}>
                    {note}
                </DisplayNotes>)
            })
        }
        let noteTaker=<Spinner/>

        if(this.state.notes.length>=0){
            noteTaker=(<Aux>
                <h1 style={{textAlign:"center"}}>Notes</h1>
                <NewNote
                addNotes={this.newNoteClickedHandler}
                />
                {existingNotes}
                {takeNewNote}
            </Aux>);
        }
        return(
            noteTaker
        );
    }
}

const mapStateToProps=state=>{
    return{
        userId:state.userId,
        token:state.token
    }
}

export default connect(mapStateToProps)(NoteTaker);