import React, { Component } from 'react';
import Layout from '../Layout/Layout'
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {onReload} from '../../store/Actions/auth'

class App extends Component {
  componentDidMount(){
    this.props.onReload();
  }
  render() {
    return (
      <BrowserRouter>
        <div>
            <Layout/>
        </div>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps=dispatch=>{
  return{
    onReload:()=>dispatch(onReload())
  }
}

export default connect(null,mapDispatchToProps)(App);
