import React, { Component } from 'react';
import api from '../../api';
import { Redirect } from 'react-router-dom';
// import Axios from 'axios';


export default class Upload extends Component {
  state = {
      file:null,
      baseUrl: "http://res.cloudinary.com/jonriquer/image/upload/"
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
      <div className="Upload"  style={{ backgroundImage: `url("images/upload.jpg")` }} > 
        <div className="uploadDisplay">

          <img src={this.state.photoUrl ? this.state.baseUrl + this.state.photoUrl : 'http://support.hostgator.com/img/articles/weebly_image_sample.png'} width="300px" />

          <div class="input-group">
            <form onSubmit={this.handleSubmit}>
              <div class="custom-file">
                <input type="file" onChange={(e)=>this.handleChange(e)} class="custom-file-input uploadInput" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04"/>
                <label class="custom-file-label uploadInput" for="inputGroupFile04">Choose file</label>
              </div>
              <div class="input-group-append">
                <button class="btn btn-outline-primary uploadBtn" type="submit" id="inputGroupFileAddon04">Upload</button>
              </div>
            </form>
          </div>

        </div>
      </div>
    );
  }



}