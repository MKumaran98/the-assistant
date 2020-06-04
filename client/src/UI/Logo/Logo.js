import React from 'react';
import Logo from '../../assets/images/logo.png';
import classes from './Logo.css';

const logo=(props)=>{
    return(
        <img src={Logo} alt="The Assistant" className={classes.LogoImage}/>
    );
}

export default logo;