import React from 'react';
import classes from './NewNote.css'

const newNote=(props)=>{
    return(
        <div className={classes.NewNote} 
        onClick={props.addNotes}>
            <div className={classes.plus}></div>
        </div>
    );
}

export default newNote;