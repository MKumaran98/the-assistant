import React from 'react';
import classes from './TaskList.css';

const taskList =(props)=>{
    let taskListClass=[classes.TaskList]

    switch (Number.parseInt(props.priority,0)) {
        case 1:
            taskListClass.push(classes.low)
            break;
        case 2:
            taskListClass.push(classes.lowMedium)
            break;
        case 3:
            taskListClass.push(classes.medium)
            break;
        case 4:
            taskListClass.push(classes.mediumHigh)
            break;
        case 5:
            taskListClass.push(classes.high)
            break;    
        default:
            taskListClass.push(classes.low)
            break;
    }
    
    return(
        <div className={taskListClass.join(" ")} onClick={(event)=>props.taskClicked(event,props.index)}>
            <h3>{props.title}</h3>
            <small>{props.dueDate}</small>
            <p>{props.description}</p>
        </div>
    )
}

export default taskList;