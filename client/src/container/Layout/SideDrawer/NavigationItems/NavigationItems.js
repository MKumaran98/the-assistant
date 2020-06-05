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
    let quickNav=null;
    if(props.location.pathname==="/notes"){
        quickNav=(
            <Aux>
                <Link to="/checklist">
                    <p className={classes.navItem}>Checklist</p>
                </Link>
                <Link to="/todo-list">
                    <p className={classes.navItem}>Todolist</p>
                </Link>
            </Aux>
        )
    }else if(props.location.pathname==="/checklist"){
        quickNav=(
            <Aux>
                <Link to="/notes">
                    <p className={classes.navItem}>Notes</p>
                </Link>
                <Link to="/todo-list">
                    <p className={classes.navItem}>Todolist</p>
                </Link>
            </Aux>
        )
    }else if(props.location.pathname==="/todo-list"){
        quickNav=(
            <Aux>
                <Link to="/notes">
                    <p className={classes.navItem}>Notes</p>
                </Link>
                <Link to="/checklist">
                    <p className={classes.navItem}>CheckList</p>
                </Link>
            </Aux>
        )
    }

    if(props.authenticated){
        sidebarItems=(
            <div className={classes.SidebarItems}>
                {quickNav}
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