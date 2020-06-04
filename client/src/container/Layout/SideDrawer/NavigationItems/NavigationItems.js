import React from 'react';
import classes from './NavigationItems.css'
import Aux from '../../../../HOC/Auxiliary'
import {Link,withRouter} from 'react-router-dom';

const NavigationItems=(props)=>{
    let sidebarItems=(
        <div className={classes.SidebarItems}>
            {props.location.pathname==="/sign-up"?
            <Link to="/">
                <p className={classes.navItem}>Sign in</p>
            </Link>
            :<Link to="/sign-up">
                <p className={classes.navItem}>Sign up</p>
            </Link>
            }
            <Link to="/about">
                <p className={classes.navItem}>About</p>
            </Link>
        </div>
    ); 
    if(props.authenticated){
        sidebarItems=(
            <div className={classes.SidebarItems}>
                <Link to="/home-screen">
                    <p className={classes.navItem}>Home</p>
                </Link>
                <Link to="/about">
                    <p className={classes.navItem}>About</p>
                </Link>
                <p className={classes.navItem} onClick={props.logoutClicked}>Log out</p>
            </div>
        );
    }
    return(
        <Aux>
            {sidebarItems}
        </Aux>
    );
}

export default withRouter(NavigationItems);