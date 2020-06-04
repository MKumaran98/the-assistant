import React from 'react';
import classes from './ChecklistItems.css';
import Textbar from '../../../UI/Textbar/Textbar';
import Button from '../../../UI/Button/Button';


const checkListItems=(props)=>{
    return(
    <div>
        <form onSubmit={(event)=>props.itemAdded(event)} className={classes.TextbarContainer}>
            <Textbar
            placeHolder="Add item..."
            dataEntered={props.dataEntered}
            value={props.currentValue}
            disabled={props.disabled}
            required={true}
            />
            <small>{props.textCount}/15</small>
            <Button>Add Item</Button>
        </form>
    </div>
    );
}

export default checkListItems;