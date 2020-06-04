import React from 'react';
import classes from './Signup.css';
import Button from '../../UI/Button/Button'
import Textbar from '../../UI/Textbar/Textbar'

const signin=(props)=>{
    return(
        <div className={classes.SignupContainer}>
            <h1>Sign up</h1>
            <form onSubmit={props.signup} style={{width:"90%"}}>
                <div style={{width:"80%"}}>
                    <Textbar 
                        type="text"
                        placeHolder="Name"
                        required={true}
                        name="Name"
                        dataEntered={props.signupNameEntered}
                    />
                </div>
                <div style={{width:"80%"}}>
                    <Textbar 
                        type="email"
                        placeHolder="email"
                        required={true}
                        name="email"
                        dataEntered={props.signupEmailEntered}
                    />
                </div>
                <div style={{width:"80%"}}>
                    <Textbar 
                        type="password"
                        placeHolder="password"
                        required={true}
                        name="password"
                        dataEntered={props.signupPasswordEntered}
                    />
                </div>

            <Button>Sign Up</Button>
            </form>
        </div>
    );
}

export default signin;