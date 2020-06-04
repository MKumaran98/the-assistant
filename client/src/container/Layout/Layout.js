import React,{Component} from 'react';
import classes from './Layout.css';
import Header from '../Header/Header';
import SideDrawer from './SideDrawer/SideDrawer';
import Footer from '../../component/Footer/Footer';
import Signin from '../../component/Signin/Signin'
import {Route,Switch,withRouter, Redirect} from 'react-router-dom';
import NoteTaker from '../NoteTaker/NoteTaker';
import Checklist from '../Checklist/Checklist'
import TodoList from '../TodoList/TodoList';
import HomeScreen from '../../component/HomeScreen/HomeScreen';
import About from '../../component/About/About';
import Signup from '../../component/Signup/Signup';
import Axios from 'axios';
import { connect } from 'react-redux';
import * as authActions from '../../store/Actions/auth'

class Layout extends Component{
    state={
        showDrawerClosed:false,
        signupEmail:'',
        signupName:'',
        signupPassword:'',
    }
    
    hideDrawerClosedHandler=()=>{
        this.setState({
            showDrawerClosed:false
        });
    }

    showDrawerClosedHandler=()=>{
        this.setState({
            showDrawerClosed:true
        });
    }

    signupNameEnteredHandler=(event)=>{
        this.setState({
            signupName:event.target.value
        })
    }

    signupEmailEnteredHandler=(event)=>{
        this.setState({
            signupEmail:event.target.value
        })
    }

    signupPasswordEnteredHandler=(event)=>{
        this.setState({
            signupPassword:event.target.value
        })
        
    }
    
    signupHandler=(event)=>{
        event.preventDefault();
        let data={
            email:this.state.signupEmail,
            name:this.state.signupName,
            password:this.state.signupPassword
        }
        Axios.post('/api-signupuser',data)
        .then(response=>{
            let res=response.data.data.userAdded;
            if(!res){
                alert(response.data.message);
            }else{
                alert("User added successfully! ");
                this.props.history.push("/");
            }
        })
    }

    logoutClickedHandler=()=>{
        this.props.onLogout()
    }

    render()
    {
        return(    
            <div className={classes.container}>
                <header>
                    <Header open={this.showDrawerClosedHandler}/>
                    <SideDrawer closed={this.hideDrawerClosedHandler} 
                    open={this.state.showDrawerClosed} 
                    authenticated={this.props.isAuthenticated}
                    logoutClicked={this.logoutClickedHandler}
                    />
                </header>
                <main >
                    <Switch>
                        {this.props.isAuthenticated?<Redirect from="/sign-up" to="/home-screen"/>:null}
                        {this.props.isAuthenticated?null:<Route path="/sign-up" exact render={()=>(<Signup signupNameEntered={this.signupNameEnteredHandler} 
                                                                signupEmailEntered={this.signupEmailEnteredHandler} 
                                                                signupPasswordEntered={this.signupPasswordEnteredHandler} 
                                                                signup={this.signupHandler}/>)
                                                                }/>}
                        {this.props.isAuthenticated?<Route path="/home-screen" exact component={HomeScreen}/>:null}
                        {this.props.isAuthenticated?<Route path="/notes" exact component={NoteTaker}/>:null}
                        {this.props.isAuthenticated?<Route path="/checklist" exact component={Checklist}/>:null}
                        {this.props.isAuthenticated?<Route path="/todo-list" exact component={TodoList}/>:null}
                        <Route path="/about" exact component={About}/>
                        {this.props.isAuthenticated?null:<Route path="/" component={Signin}/>}
                        {this.props.isAuthenticated?<Redirect to="/home-screen"/>:null}
                    </Switch>
                                                    
                </main>
                {this.props.isAuthenticated?null:
                    <footer>
                        <Footer/>
                    </footer>
                }
                
            </div>
    );
    }
}

const mapStateToProps=state=>{
    return{
        isAuthenticated:state.token!==null
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onLogout:()=>dispatch(authActions.logoutUser())
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Layout));