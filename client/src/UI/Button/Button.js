import React from 'react';
import classes from './Button.css'; 

const Button=(props)=>{
    let btnClass=[classes.Btn]; 
    if(props.btnType){
        btnClass.push(classes[props.btnType]);
        btnClass=btnClass.join(" ");
    }
    return(
        <button className={btnClass}
                onClick={props.buttonClicked}
                type="submit"
                >{props.children}</button>
    )
}

export default Button;