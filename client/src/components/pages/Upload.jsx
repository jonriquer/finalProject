import React, { Component } from 'react';
import api from '../../api';
import { Redirect } from 'react-router-dom';
// import Axios from 'axios';


export default class Upload extends Component {
  state = {
      file:null,
  }

  handleChange = (e) => {
    this.setState({
      file: e.target.files[0]
    })
  }

  handleSubmit = (e) =>  {
    e.preventDefault()
    // Reuse of the method "addPicture" from the file '../api'
    api.addPicture(this.state.file).then(result=>{
      console.log('saved,', result)
      this.setState(result.saved)
    })
  }

  render() {  

    if(!api.isLoggedIn()){
      return (<Redirect to='/' />)
    }   

    return (
      <div className="Home">
        <h2>Home</h2>
        <p>This is a sample project with the MERN stack</p>
        <img src={this.state.photoUrl} width="300px" alt=""/>
        <form onSubmit={this.handleSubmit}>
          <input type="file" onChange={(e)=>this.handleChange(e)} /> <br/>
          <button type="submit">Save new profile picture</button>
        </form>
      </div>
    );
  }



}