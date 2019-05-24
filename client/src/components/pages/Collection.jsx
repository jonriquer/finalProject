import React, { Component } from "react";
import api from "../../api";
import {Image, Video, Transformation, CloudinaryContext} from "cloudinary-react";
import { Modal, Col, Container, Row, Button } from 'react-bootstrap';


export default class Collection extends Component {

  state = {
      photos: [],
      // height: 300,
      circle: {

      },
      popup: false
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

  handleChange = (e) => {
    this.setState({
      height: e.target.value
    });
  };

  editPopUp = (e) => {
    console.log("Clicked", e.target.id);
    this.setState({popup: !this.state.popup, picID: e.target.id})

  }

  showUp = () => {
    return(   
        <Modal {...this.props} aria-labelledby="contained-modal-title-vcenter">
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Using Grid in Modal
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Container>
                  <Row className="show-grid">
                    <Col xs={12} md={8}>
                      <code>.col-xs-12 .col-md-8</code>
                    </Col>
                    <Col xs={6} md={4}>
                      <code>.col-xs-6 .col-md-4</code>
                    </Col>
                  </Row>
      
                  <Row className="show-grid">
                    <Col xs={6} md={4}>
                      <code>.col-xs-6 .col-md-4</code>
                    </Col>
                    <Col xs={6} md={4}>
                      <code>.col-xs-6 .col-md-4</code>
                    </Col>
                    <Col xs={6} md={4}>
                      <code>.col-xs-6 .col-md-4</code>
                    </Col>
                  </Row>
                </Container>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.props.onHide}>Close</Button>
              </Modal.Footer>
            </Modal>
                )
  }

  headShot = () => {

  }

  render() {
    return (
      <div className="Collection">

        <h2>List of Photos</h2>
        
        {this.state.popup ? this.showUp(): 'no pop up'}

        {this.state.photos.map((c, index) => (
          <li key={index}>
              <Image className="listPic" 
                cloudName="jonriquer"
                publicId={c.photoUrl}
                height="300" 
                width="300"
                onClick={this.editPopUp}
                id={c._id}
                // type="fetch"
                // gravity="face:center" 
                // quality="100"
                // crop="fill"
                // radius="max"
                
              >
              </Image>
          </li>
        ))}
      </div>
    );
  }
}
