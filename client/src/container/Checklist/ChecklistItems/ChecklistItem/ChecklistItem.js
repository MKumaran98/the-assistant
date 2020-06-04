import React from 'react';
import classes from './ChecklistItem.css'
import Button from '../../../../UI/Button/Button';

const checklistItem =(props)=>{
    return(
        <div className={classes.ChecklistItem}>
        
            <label className={classes.checkbox}>
                <input type="checkbox" checked={props.checked} onChange={(event)=>props.itemChecked(event,props.id)}/>
                <span>{props.children}</span>
            </label>
            
            <div className={classes.DeleteBtn}>
                <Button
                btnType="Danger"
                buttonClicked={props.itemDelete.bind(this,props.id)}
                >
                    X
                </Button>
            </div>
            
        </div>
    );
}

export default checklistItem;

