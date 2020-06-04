import React from 'react';
import classes from './About.css'
import linkedIn from './linkedin.jpg';

const about=(props)=>{
    return(
        <div className={classes.mastHead}>
            <h1 style={{textAlign:"center"}}>Hope you like the app!!</h1>
            <p style={{marginTop:"30px",fontSize:"1.5rem"}}>
                Hey I'm Kumaran, if you like this app do hit me up! </p>
                
            <a href="https://www.linkedin.com/in/muthu-kumaran-760735184/">
                <img src={linkedIn} alt="Linked In" className={classes.linkedin}/>
            </a>
        </div>
    );
}

export default about;