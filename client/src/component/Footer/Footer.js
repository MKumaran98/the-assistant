import React from 'react';
import classes from './Footer.css'

const footer=(props)=>{
    return(
        <div className={classes.Footer}>
            <p>Made with Love<span role="img" aria-label="jsx-a11y/accessible-emoji">❤️</span> </p>
            <p>And React<span role="img" aria-label="jsx-a11y/accessible-emoji">😃</span></p>
        </div>
    );
}

export default footer;