import React from 'react';
import classes from './DisplayNotes.css';


const displayNotes=(props)=>{
    return(
        <div className={classes.DisplayNotes} onClick={(event)=>props.viewNotes(event,props.children)}>
            <p>{props.children.substring(0,30)}...</p>
        </div>
    );
}

export default displayNotes;