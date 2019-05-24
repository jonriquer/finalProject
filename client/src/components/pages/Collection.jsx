import React, { Component } from "react";
import api from "../../api";
import {
  Image,
  // Video,
  // Transformation,
  // CloudinaryContext
} from "cloudinary-react";
import { Modal, Col, Container, Row, Button, ButtonToolbar } from "react-bootstrap";
export default class Collection extends Component {
  state = {
    photos: [],
    clickedPhoto: String,
    circle: {},
    styles: {}
    // popup: false
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

  editPopUp = e => {
    console.log("Clicked", e.target.id, e.target, e.target.parentNode.style);
    this.setState({ popup: !this.state.popup, picID: e.target.id, clickedPhoto: e.target.src, styles:e.target.parentNode.style});
  };

  // showUp = () => {
  //   return (
  //     <div className="modal">
  //      HELLO  
  //     </div>
  //   );
  // };

  onHide = () => {
    this.setState({popup : false})
  }

  save = () => {
    
    api.saveStyles(this.state.styles, this.state.picID).then(res=>{
      console.log('saved',res)
      this.onHide()

    })

    
    
  }

  headShot = () => {
    //this.settate.styles
    let styles = {...this.state.styles}
    styles.crop = "fill"
    this.setState({styles})
  };

  render() {
    return (
      <div className="Collection">
        
        <h2>List of Photos</h2>

        {/* {this.state.popup ? this.showUp() : ""} */}

        {this.state.photos.map((c, index) => {
          return (

          <li key={index} style={c.styles}>
            <Image
              className="listPic"
              cloudName="jonriquer"
              publicId={c.photoUrl}
              height="300"
              width="300"
              onClick={this.editPopUp}
              id={c._id}
              type={c.styles.type}
              gravity={c.styles.gravity}
              quality={c.styles.quality}
              crop={c.styles.crop}
              radius={c.styles.radius}
            />
          </li>
          
        )})}
      

      <Modal {...this.props} onHide={this.onHide} aria-labelledby="contained-modal-title-vcenter" show={this.state.popup }>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Using Grid in Modal
        </Modal.Title>
      </Modal.Header>
      <Modal.Body >
        <Container>
          <Row className="show-grid">
            <Col xs={12} md={12} className="centerModal">
              <code>
                <img src={this.state.clickedPhoto} width="400px"/>
              </code>
            </Col>
          </Row>

          <Row className="show-grid modalBtnCont">
            <Col xs={12} md={4} className="btnCol">
              <code><Button onClick={this.headShot}>Head Shot</Button></code>
            </Col>
            <Col xs={6} md={4} className="btnCol">
              <code><Button>Meme</Button></code>
            </Col>
            <Col xs={6} md={4} className="btnCol">
              <code><Button>Filter</Button></code>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={this.save}>Save</Button>
      </Modal.Footer>
      </Modal>

      </div>
    );
  }
}
