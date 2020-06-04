import React from 'react';
import classes from './Hamburger.css'

const hamburger =(props)=>{
    return(
        <div onClick={props.open} className={classes.DrawerToggle}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
}

export default hamburger;