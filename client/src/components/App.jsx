import React, { Component } from 'react';
import { Route, Link, NavLink, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Collection from './pages/Collection';
// import AddCountry from './pages/AddCountry';
import Secret from './pages/Secret';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Upload from './pages/Upload';

import api from '../api';
import logo from '../logo.svg';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      photos: [],
      clickedPhoto: String,
      // circle: {},
      stylez: {}
      // popup: false
    }
  }

  handleLogoutClick = (e) => {
    api.logout()
  }

  handleShow = () => {
    console.log("handleShow 1 is running")
    this.setState({ show: true });
  }

  handleShow2 = () => {
    console.log("handleShow 2 is running")
    this.setState({ show2: true });
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  handleClose2 = () => {
    this.setState({ show2: false });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <nav class="navbar fixed-top navbar-expand-lg navbar-dark scrolling-navbar">
            <a class="navbar-brand navLogo" href="/"><strong>[ Photo Crop ]</strong></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        {!api.isLoggedIn() && <a class="nav-link" href="#" onClick={this.handleShow} >Sign Up</a>}
                    </li>
                    <li class="nav-item">
                        {!api.isLoggedIn() && <a class="nav-link" href="#" onClick={this.handleShow2}>Log In</a>}
                    </li>
                    <li class="nav-item">
                        {api.isLoggedIn() && <a class="nav-link" href="/collection">Collection</a>}
                    </li>
                    <li class="nav-item">
                        {api.isLoggedIn() && <a class="nav-link" href="/upload">Upload Photo</a>}
                    </li>
                    <li class="nav-item">
                      {api.isLoggedIn() && <a class="nav-link" href="/" onClick={(e)=> this.handleLogoutClick(e)}>Logout</a>}
                    </li>
                </ul>
            </div>
          </nav>
        </header>
        <Switch>
          <Route path="/" exact component={(props) => <Home {...props} show={this.state.show} show2={this.state.show2} handleClose={this.handleClose} handleClose2={this.handleClose2}/>} />
          <Route path="/collection" component={Collection} />
          <Route path="/upload" component={Upload} />

          {/* <Route path="/add-country" component={AddCountry} /> */}
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/secret" component={Secret} />
          <Route render={() => <h2>404</h2>} />
        </Switch>
      </div>
    );
  }
}