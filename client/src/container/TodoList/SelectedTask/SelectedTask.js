import React from 'react';
import classes from './SelectedTask.css'
import Button from '../../../UI/Button/Button'

const selectedTask=(props)=>{
    return(
        <div className={classes.SelectedTask}>
            <h2>Title: {props.title}</h2>
            <small>DueDate: {props.dueDate}</small>
            <p>Priority: {props.priority}</p>
            <p>Description: {props.description}</p>
            <Button buttonClicked={props.deleteClicked}
            btnType="Danger"
            >Delete Task</Button>
        </div>
    );
}

export default selectedTask;