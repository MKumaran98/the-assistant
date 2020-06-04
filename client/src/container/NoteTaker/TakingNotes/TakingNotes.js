import React from 'react';
import TextArea from '../../../UI/TextArea/TextArea'
import classses from './TakingNotes.css';
import Button from '../../../UI/Button/Button'

const takingNotes=(props)=>{
    return(
        <div>
            <form onSubmit={props.addNoteClicked}  className={classses.TakingNotesContainer}>
                <div className={classses.textAreaContainer}>
                    <TextArea placeholder="Enter Notes..."
                     textAdded={props.textAdded} 
                     disabled={props.characterLimit} 
                     textValue={props.textValue}
                     required={true}
                     >
                        
                    </TextArea>
                    <small>{props.textCount}/300</small>
                </div>
                    <Button>Add Note</Button>
            </form>
        </div>
    );
}

export default takingNotes; 