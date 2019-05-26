import React, { Component } from "react";
import api from "../../api";
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
    this.setState({ popup: !this.state.popup, picID: e.target.id, clickedPhoto: e.target.src});
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
    
    api.saveStyles(this.state.stylez, this.state.picID).then(res=>{
      console.log('saved',res)
      this.onHide()
      setTimeout(function(){
        window.location.reload();
      },200);
    })
  }

  headShot = () => {
    //this.settate.styles
    let stylez = {...this.state.stylez}
    stylez.crop = "fill"
    stylez.gravity = "face"
    stylez.radius = "max"
    stylez.quality = "100"
    stylez.default = "false"
    
    this.setState({stylez: stylez})
  }

  cartoonify = () => {
    let stylez = {...this.state.stylez}
    stylez.effect = "cartoonify"
    stylez.default = "false"
    this.setState({stylez: stylez})
  }

  frost = () => {
    let stylez = {...this.state.stylez}
    stylez.effect2 = "art:frost"
    stylez.default = "false"
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

  render() {
    
    return (
      <div className="Collection">
        
        <h2>List of Photos</h2>

        {/* {this.state.popup ? this.showUp() : ""} */}

        {this.state.photos.map((c, index) => {
          // console.log(c)
          return (
          // (this.state.stylez.default) ? 
            
              <li key={index}>
                <Image
                
                  // className="listPic"
                  cloudName="jonriquer"
                  publicId={(c.stylez.default=== true) ? this.state.baseUrl + c.photoUrl: c.photoUrl}
                  height="300"
                  width="300"
                  onClick={this.editPopUp}
                  id={c._id}
                  radius={c.stylez.radius}
                  // type="fetch"
                  // gravity={c.stylez.gravity}
                  // quality={c.stylez.quality}
                  // crop={c.stylez.crop}
                  // radius={c.stylez.radius}
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
                   radius={c.stylez.radius}
                   effect= {c.stylez.effect}
                   />

                   <Transformation 
                    effect= {c.stylez.effect2}
                   />
                </Image>
              </li>

             
            // ) :
            //     (
            //       <li key={index}>
            //         <Image
            //           // className="listPic"
            //           cloudName="jonriquer"
            //           publicId={c.photoUrl}
            //           height="300"
            //           width="300"
            //           onClick={this.editPopUp}
            //           id={c._id}
            //           type="fetch"
            //           gravity={c.stylez.gravity}
            //           quality={c.stylez.quality}
            //           crop={c.stylez.crop}
            //           radius={c.stylez.radius}
            //         />
            //       </li>
            //     )
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
              <code><Button onClick={this.reset}>Reset</Button></code>
            </Col>
            <Col xs={6} md={4} className="btnCol">
              <code><Button onClick={this.cartoonify}>Cartoonify</Button></code>
            </Col>
          </Row>
           
          <Row className="show-grid modalBtnCont">
          <Col xs={12} md={4} className="btnCol">
              <code><Button onClick={this.frost}>Frost</Button></code>
            </Col>
            <Col xs={6} md={4} className="btnCol">
              <code><Button >Primavera</Button></code>
            </Col>
            <Col xs={6} md={4} className="btnCol">
              <code><Button >Aurora</Button></code>
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
