import React from 'react';
import classes from './Textbar.css'

const Textbar=(props)=>{
    return(
        <input type={props.type} 
        placeholder={props.placeHolder} 
        className={classes.Txtbar}
        required={props.required}
        onChange={event=>props.dataEntered(event)}
        disabled={props.disabled}
        value={props.value}
        ></input>
    );
}

export default Textbar;