import React from 'react';
import classes from './Header.css';
import Logo from '../../UI/Logo/Logo'
import Hamburger from './Hamburger/Hamburger'
import {Link} from 'react-router-dom';

const header=(props)=>{
    


    return(
        <div className={classes.HeaderContainer}>
            <div className={classes.LogoContainer}>
                <Link to='/'>
                    <Logo/>
                </Link>
            </div>
            <div className={classes.Hamburger}>
                <Hamburger  open={props.open}/>
            </div>
            
        </div>
    );
}

export default header