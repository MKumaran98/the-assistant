import React from 'react';
import classes from './SideDrawer.css';
import NavigationItems from './NavigationItems/NavigationItems';
import Backdrop from '../../../UI/Backdrop/Backdrop'
import Aux from '../../../HOC/Auxiliary';

const sideDrawer=(props)=>{
    let sideDrawerclass=[classes.SideDrawer];
    if(props.open){
        sideDrawerclass.push(classes.Open)
    }else{
        sideDrawerclass.push(classes.Close)
    }
    return(
        <Aux>
            <Backdrop backdropClicked={props.closed} show={props.open}/>
            <div className={sideDrawerclass.join(' ')}>
                <nav>
                    <NavigationItems authenticated={props.authenticated}
                                    logoutClicked={props.logoutClicked}
                    />
                </nav>
            </div>
        </Aux>
    );

}

export default sideDrawer;