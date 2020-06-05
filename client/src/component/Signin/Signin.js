import React,{ Component} from 'react';
import classes from './Signin.css';
import Button from '../../UI/Button/Button'
import Textbar from '../../UI/Textbar/Textbar'
import {withRouter,Link} from 'react-router-dom'
import {connect} from 'react-redux';
import * as authActions from '../../store/Actions/auth'


class Signin extends Component{
    state={
        email:'',
        password:'',
        isAuthenticated:false
    }

    loginHandler=(event)=>{
        event.preventDefault();
        let data={
            email:this.state.email,
            password:this.state.password
        }
        this.props.onAuthStart();
        this.props.onLogin(data);
    }

    emailEnteredHandler=(event)=>{
        this.setState({
            email:event.target.value
        })
    }

    passwordEnteredHandler=(event)=>{
        this.setState({
            password:event.target.value
        })
    }

    
    render(){
        let errorDispatch=null;
        if(this.props.error){
            errorDispatch= alert("Invalid email/password");
            this.props.onErrorDispatch();
        }


        return(    
                <div className={classes.SigninContainer}>
                    <h1>Log In</h1>
                        {errorDispatch}
                        <form onSubmit={this.loginHandler} style={{width:"90%"}}>
                            <div style={{width:"80%"}}>
                                <Textbar 
                                    type="email"
                                    placeHolder="Email"
                                    required={true}
                                    name="email"
                                    dataEntered={this.emailEnteredHandler}
                                />
                            </div>
                            <div style={{width:"80%"}}>
                                <Textbar 
                                    type="password"
                                    placeHolder="Password"
                                    required={true}
                                    name="password"
                                    dataEntered={this.passwordEnteredHandler}
                                />
                            </div>
                            
                        <Button>Log In</Button>
                        </form>
                        <Link to="/sign-up">
                            <p>First Time?Sign up!</p>
                        </Link>
                </div>
            
        );
    }
    
}

const mapStateToProps=state=>{
    return{
        token:state.token,
        userId:state.userId,
        error:state.error!==null
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onAuthStart:()=>dispatch(authActions.authStart()),
        onLogin:(data)=>dispatch(authActions.logInAsync(data)),
        onErrorDispatch:()=>dispatch(authActions.resetError())
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Signin));