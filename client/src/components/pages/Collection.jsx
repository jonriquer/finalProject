import React, { Component } from "react";
import api from "../../api";
import { Redirect } from 'react-router-dom';
import {
  Image,
  // Video,
  Transformation,
  // CloudinaryContext
} from "cloudinary-react";
import { Modal, Col, Container, Row, Button, ButtonToolbar } from "react-bootstrap";


export default class Collection extends Component {
  state = {
    photos: [],
    clickedPhoto: String,
    photoUrl: String,
    stylez: null,
    baseUrl: "http://res.cloudinary.com/jonriquer/image/upload/"
  };

  componentDidMount() {
    api
      .getCollection()
      .then(photos => {
        console.log(photos);
        this.setState({
          photos: photos,
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
    console.log("Clicked", e.target.id, e.target.src);
    let thePhoto = this.state.photos.find(eachPhoto=>{
      return eachPhoto._id == e.target.id
    })
    console.log(thePhoto.stylez)
    this.setState({ popup: !this.state.popup, picID: e.target.id, clickedPhoto: e.target.src, stylez: thePhoto.stylez});
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
    if(this.state.stylez===null) return false
    
    api.saveStyles(this.state.stylez, this.state.picID).then(res=>{
      console.log('saved',res, this.state.baseUrl)
      this.onHide()
      setTimeout(function(){
        // window.location.reload();
      },200);
    })
  }

  delete = () => {
    api.deletePhoto(this.state.picID).then(res=>{
      console.log('deleted', res)
      this.onHide()
      setTimeout(function(){
        window.location.reload();
      },200);
    })
  }

  circle = () => {
    let stylez = {...this.state.stylez}
    stylez.crop = "fill"
    stylez.gravity = "face"
    stylez.radius = "max"
    stylez.quality = "1000"
    stylez.default = "false"
    this.setState({stylez})
  }

  square = () => {
    let stylez = {...this.state.stylez}
    stylez.crop = "fill"
    stylez.gravity = "face"
    stylez.quality = "100"
    stylez.zoom = "0.5"
    stylez.default = "false"
    delete stylez.radius 
    this.setState({stylez})
  }  

  reset = () => {
    let stylez = {...this.state.stylez}
    stylez.crop = null
    stylez.gravity = null
    stylez.radius = null
    stylez.quality = null
    stylez.default = "true"
    this.setState({stylez})
  }

  cartoonify = () => {
    let stylez = {...this.state.stylez}
    stylez.effect = "cartoonify"
    stylez.default = "false"
    stylez.quality = "100"
    this.setState({stylez})
  }

  frost = () => {
    let stylez = {...this.state.stylez}
    stylez.effect2 = "art:frost"
    stylez.default = "false"
    this.setState({stylez})
  }

  primavera = () => {
    let stylez = {...this.state.stylez}
    stylez.effect3 = "art:primavera"
    stylez.default = "false"
    this.setState({stylez})
  }

  blackAndWhite = () => {
    let stylez = {...this.state.stylez}
    stylez.effect4 = "art:audrey"
    stylez.default = "false"
    this.setState({stylez})
  }

  none = () => {
    let stylez = {...this.state.stylez}
    delete stylez.effect
    delete stylez.effect2
    delete stylez.effect3
    delete stylez.effect4
    stylez.default = "false"
    this.setState({stylez})
  }


  render() {

    if(!api.isLoggedIn()){
      return (<Redirect to='/' />)
    }  
    
    return (
      <div className="Collection">
        
        <h2>List of Photos</h2>

        {this.state.photos.map((c, index) => {
          // console.log(c)
          return (
            
              <li key={index}>
                <Image
                  cloudName="jonriquer"
                  publicId={(c.stylez.default=== true) ? this.state.baseUrl + c.photoUrl: c.photoUrl}
                  height="300"
                  width="300"
                  onClick={this.editPopUp}
                  id={c._id}
                  radius={c.stylez.radius}
                >
                  
                <Transformation 
                  height="300" width="300"
                  gravity={c.stylez.gravity}
                  quality={c.stylez.quality}
                  crop={c.stylez.crop}
                  radius={c.stylez.radius}
                  effect= {c.stylez.effect}
                  effect= {c.stylez.effect2}
                />

                <Transformation
                effect= {c.stylez.effect}
                />

                <Transformation 
                effect= {c.stylez.effect2}
                />

                <Transformation 
                  effect= {c.stylez.effect3}
                />

                <Transformation 
                  effect= {c.stylez.effect4}
                />

                </Image>
              </li>

        )})}
      
        
      <Modal {...this.props} onHide={this.onHide} aria-labelledby="contained-modal-title-vcenter" show={this.state.popup }>
        
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit your Photo
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

            <Row className="show-grid modalBtnTitle">
              <h3>Crop</h3>
            </Row>

            <Row className="show-grid centerModal">
              <Col xs={12} md={4} className="btnCol">
                <code><Button className="btn btn-light"  onClick={this.circle}>Circle</Button></code>
              </Col>
              <Col xs={6} md={4} className="btnCol">
                <code><Button className="btn btn-light" onClick={this.square}>Square</Button></code>
              </Col>
              <Col xs={6} md={4} className="btnCol">
                <code><Button className="btn btn-light" onClick={this.reset}>Default</Button></code>
              </Col>
            </Row>

            <Row className="show-grid modalBtnTitle">
              <h3>Filter</h3>
            </Row>
            
            <Row className="show-grid centerModal">
            <Col xs={12} md={4} className="btnCol">
                <code><Button className="btn btn-info" onClick={this.frost}>Frost</Button></code>
              </Col>
              <Col xs={6} md={4} className="btnCol">
                <code><Button className="btn btn-info" onClick={this.primavera}>Primavera</Button></code>
              </Col>
              <Col xs={6} md={4} className="btnCol">
                <code><Button className="btn btn-info" onClick={this.blackAndWhite}>B & W</Button></code>
              </Col>
              <Col xs={6} md={4} className="btnCol">
                <code><Button className="btn btn-info" onClick={this.cartoonify}>Cartoonify</Button></code>
              </Col>
              <Col xs={6} md={4} className="btnCol">
                <code><Button className="btn btn-info" onClick={this.none}>None</Button></code>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        
        <Modal.Footer>
          <Button className="btn btn-danger" onClick={this.delete}>Delete</Button>
          <Button className="btn btn-success" onClick={this.save}>Save</Button>
        </Modal.Footer>
      </Modal>

      </div>
    );
  }
}
