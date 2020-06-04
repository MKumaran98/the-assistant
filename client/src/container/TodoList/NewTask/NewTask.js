import React from 'react';
import classes from './NewTask.css'
import TextArea from '../../../UI/TextArea/TextArea';
import Button from '../../../UI/Button/Button';
import TextBar from '../../../UI/Textbar/Textbar';

const newTask=(props)=>{
    return(
        <div className={classes.NewTask}>
            <form onSubmit={props.addTask}>
                <label>
                    <TextBar placeHolder="Title..." dataEntered={props.titleAdded} required={true}/>
                </label>
                <label>
                    <TextArea  placeHolder="Description" textAdded={props.descriptionAdded}/>
                </label>
                <label>
                    <span>Due Date</span>
                    <input type="date" className={classes.date} onChange={props.dueDate}/>
                </label>     
                <label>
                    <span>Priority</span>
                    <input type="range" min="1" max="5" defaultValue="1" className={classes.slider} onChange={props.priority}/>
                </label>    
                <Button>
                    Add Task    
                </Button>       
            </form>
        </div>
    );
}

export default newTask;