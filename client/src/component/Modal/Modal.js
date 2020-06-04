import React,{Component} from 'react';
import classes from './Modal.css';
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../HOC/Auxiliary'

class Modal extends Component{
    render(){
        return(
            <Aux>
                <Backdrop show={this.props.show} backdropClicked={this.props.backdropClicked}/>
                <div className={classes.Modal}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}



export default Modal;