import React from 'react';
import {NavLink} from 'react-router-dom'
import classes from './HomeScreen.css'

const homeScreen=(props)=>{

    return(
        <div style={{"textAlign":"center"}}>
            <NavLink to="/notes">
                <div className={[classes.Tiles,classes.NotesTile].join(" ")}>
                    <p>Notes</p>
                </div>
            </NavLink>
            <NavLink to="/checklist">
                <div className={[classes.Tiles,classes.ListTile].join(" ")}>
                    <p>List</p>
                </div>
            </NavLink>
            <NavLink to="/todo-list">
                <div className={[classes.Tiles,classes.TodoTile].join(" ")}>
                    <p>ToDo</p>
                </div>
            </NavLink>
        </div>
    );
}

export default homeScreen;