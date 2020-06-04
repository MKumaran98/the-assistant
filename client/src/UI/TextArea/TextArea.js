import React from 'react';
import classes from './TextArea.css'

const textArea=(props)=>{
    return(
        <textarea placeholder={props.placeholder} 
        className={classes.TextArea} 
        onChange={(event)=>props.textAdded(event)} 
        disabled={props.disabled}
        value={props.textValue}
        required={props.required}
        >
            
        </textarea>
    );
}

export default textArea;