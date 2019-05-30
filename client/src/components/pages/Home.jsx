import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import api from "../../api";
import PasswordStrengthMeter from './PasswordStrengthMeter';
export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      message: null
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  // ===== SIGN UP SUBMIT BUTTON ============
  handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      username: this.state.username,
      password: this.state.password
    };
    api
      .signup(data)
      .then(result => {
        console.log("SUCCESS!");
        this.props.history.push("/upload"); // Redirect to the home page
        this.props.handleClose();
      })
      .catch(err => this.setState({ message: err.toString() }));
  }

  handleClick = () => {
    this.invisbtn.click()
  }
  //====== END SIGN UP SUBMIT BUTTON ==============

  
  //====== LOG IN SUBMIT BUTTON =================
  handleSubmit2 = (e) => {
    e.preventDefault()
    api.login(this.state.username, this.state.password)
      .then(result => {
        console.log('SUCCESS!')
        this.props.history.push("/collection") // Redirect to the home page
        this.props.handleClose2();
      })
      .catch(err => this.setState({ message: err.toString() }))
  }

  handleClick2 = () => {
    this.invisbtn2.click()
  }
  //===== END LOG IN SUBMIT BUTTON =================

  render() {

    // console.log(this.state);
    return (
      <div
        className="Home"
        style={{ backgroundImage: `url("images/crop.jpeg")` }}
      >
        <div className="homeText">
          <h1>
            Crop your photos <br/> 
            easliy for your <br/> 
            application
          </h1>
        </div>

        {/* ===== SIGN UP MODAL ============================ */}
        <Modal show={this.props.show} onHide={this.props.handleClose}>

          <Modal.Header closeButton>
            <Modal.Title>Sign Up</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={this.state.username}
                  name="username"
                  onChange={this.handleInputChange}
                  required="true"
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  name="password"
                  onChange={this.handleInputChange}
                  required= "true"
                />
                <PasswordStrengthMeter password={this.state.password}/>
              </Form.Group>

              {/* === Invisible Button for "Enter click Submit" === */}
              <button 
                ref={x => this.invisbtn = x} 
                type="submit" 
                style={{ width: `0`, height: `0`, border: `none`, backgroundColor: 'white'}}> 
              </button>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              type="submit"
              onClick= {this.handleClick}
            >
              Submit
            </Button>
          </Modal.Footer>
          
        </Modal>
        {/* ======= END SIGN UP MODAL ========================== */}


        {/* ====== LOG IN MODAL ===================================== */}
        <Modal show={this.props.show2} onHide={this.props.handleClose2}>

          <Modal.Header closeButton>
            <Modal.Title>Log In</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form  onSubmit={this.handleSubmit2}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={this.state.username}
                  name="username"
                  onChange={this.handleInputChange}
                  required= "true"
                />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  name="password"
                  onChange={this.handleInputChange}
                  required= "true"
                />
              </Form.Group>
                {/* === Invisible Button for "Enter click Submit" === */}
                <button 
                  ref={x => this.invisbtn2 = x} 
                  type="submit" 
                  style={{ width: `0`, height: `0`, border: `none`, backgroundColor: 'white'}}> 
                </button> 
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleClose2}>
              Close
            </Button>
            <Button
              variant="primary"
              type="submit"
              onClick={this.handleClick2}
            >
              Log In
            </Button>
          </Modal.Footer>

        </Modal>
        {/* ======= END LOG IN MODAL ======================================= */}

      </div>
    );
  }
}
