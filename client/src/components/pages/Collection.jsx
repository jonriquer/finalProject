import React, { Component } from "react";
import api from "../../api";
import {Image, Video, Transformation, CloudinaryContext} from "cloudinary-react";


export default class Collection extends Component {

  state = {
      photos: [],
      // height: 300,
      circle: {

      }
  };

  componentDidMount() {
    api
      .getCollection()
      .then(photos => {
        // console.log(photos);
        this.setState({
          photos: photos
        });
      })
      .catch(err => console.log(err));
  }

  handleChange = e => {
    this.setState({
      height: e.target.value
    });
  };

  render() {
    return (
      <div className="Collection">
        <h2>List of Photos</h2>
        
        {this.state.photos.map((c, index) => (
          <li key={index}>
            <button>
              <Image
                cloudName="jonriquer"
                publicId={c.photoUrl}
                height="300" 
                width="300"
                // type="fetch"
                // gravity="face:center" 
                // quality="100"
                // crop="fill"
                // radius="max"
              >
              </Image>
            </button>
          </li>
        ))}
      </div>
    );
  }
}
