import React, { Component } from 'react';
export default class Home extends Component {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //   }
  // }
  render() {                

    return (
      <div className="Home"  style={{ backgroundImage: `url("images/homeBackground.png")` }} > 
        <div className="homeText">
          {/* <h1>[ Photo Crop ]</h1> */}
          <h2>Crop your photos easliy for you application</h2>
        </div>
      </div>
    );
  }
}
