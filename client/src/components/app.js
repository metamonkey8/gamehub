import React, {Component} from 'react';
import { connect } from 'react-redux';
import FbLogin from '../containers/fb_login';
// import Login from '../containers/login';
import Auth0 from './auth0_login';
import {postProfile} from '../../actions/index.js';

export default class App extends Component {

  render() {    
    return (
      <div>
        <div id="header">
        <img src={require(__dirname + "/../../images/GameHub_logo.png")} />
        </div>
        <h1>GameHub</h1>
        <h2>slogan...</h2>
        <FbLogin />
        {this.props.children}
        <Auth0 />
      </div> 
    );
  }
}