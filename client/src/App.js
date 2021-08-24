import * as React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Form, FloatingLabel, Card, ListGroup, Row, Col, Button, Image, Modal } from 'react-bootstrap';
import jhlogo from './jh-logo-colored.png';
import Terms from './Terms.js';

/*

TODO

* Form validation and error checks on submit
* Make sure all fields are correct
* Make some sections appear upon user choice
* Connect with backend
* Success page once form is submitted
* Deploy

*/

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      show: false
    };

    this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    fetch("https://restcountries.eu/rest/v2/all")
    .then(response => response.json())
    .then(response => {
      this.setState({countries: response});
      console.log(this.state.countries);
    })
    .catch(err => { console.log(err); 
    });
  }

  handleClose() {
		this.setState({ show: false });
	}

	handleShow() {
		this.setState({ show: true });
	}

  render() {
    let count1 = 0;
    let count2 = 0;

    return (
      <div className="App">
        <div id="img-cont">
          <Image src={jhlogo} id="logo"/>
        </div>

        <div id="intro-text">
          <h1 style={{paddingTop:20}}>jacobsHack! 2021</h1>
          <h2>Registration Form</h2>
        </div>

        <div id="form-cont">
          <Card id="form-card">
            <Form>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h5 className="mb-3 pt-2">Demographics</h5>

                  <FloatingLabel label="Full Name *" className="mb-3">
                    <Form.Control type="text" placeholder="Full Name" name="fullname" required/>
                    <Form.Text className="text-muted">
                      Please write your name as it appears on your passport
                    </Form.Text>
                  </FloatingLabel>

                  <FloatingLabel label="Birthday *" className="mb-3" required>
                    <Form.Control type="date" placeholder="DD/MM/YYYY" name="birthday"/>
                  </FloatingLabel>

                  <Row>
                    <Col md>
                      <FloatingLabel label="Gender *" className="mb-3" required>
                        <Form.Select aria-label="Gender" name="gender" defaultValue="0">
                          <option value="0" disabled>Select Gender</option>
                          <option value="1">Male</option>
                          <option value="2">Female</option>
                          <option value="3">Other</option>
                        </Form.Select>
                      </FloatingLabel>
                    </Col>
                    
                    <Col md>
                      <FloatingLabel label="Pronouns" className="mb-3">
                        <Form.Select aria-label="Pronouns" name="pronouns" defaultValue="0">
                          <option value="0" disabled>Select Pronouns</option>
                          <option value="1">He/Him</option>
                          <option value="2">She/Her</option>
                          <option value="3">They/Them</option>
                          <option value="4">Other</option>
                        </Form.Select>
                      </FloatingLabel>
                    </Col>
                  </Row>

                  <Row>
                    <Col md>
                      <FloatingLabel label="Nationality *" className="mb-3" required>
                        <Form.Select aria-label="Nationality" name="nationality" defaultValue="0">
                          <option value="0" disabled>Select Country</option>
                          { (this.state.countries !== null || this.state.countries !== '') ?
                            this.state.countries.map(country => (
                              <option value={count1++} key={count1++}>{country.name}</option>
                            )) : null
                          }
                        </Form.Select>
                      </FloatingLabel>
                    </Col>
                    
                    <Col md>
                      <FloatingLabel label="Ethnicity" className="mb-3">
                        <Form.Select aria-label="Ethnicity" name="ethnicity" defaultValue="0">
                          <option value="0" disabled>Select Ethnicity</option>
                          <option value="1">American Indian or Alaska Native</option>
                          <option value="2">Asian</option>
                          <option value="3">Black or African American</option>
                          <option value="4">Hispanic or Latino</option>
                          <option value="5">Native Hawaiian or Other Pacific Islander</option>
                          <option value="6">White</option>
                          <option value="7">Other</option>
                        </Form.Select>
                      </FloatingLabel>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h5 className="mb-3 pt-2">Contact Details</h5>

                  <div className="mb-3">
                    <Form.Label>Do you live on Campus? *</Form.Label><br/>
                    <Form.Check inline label="Yes" type="radio" name="campus" required/>
                    <Form.Check inline label="No" type="radio" name="campus"/>
                  </div>

                  <Row>
                    <Col md>
                      <FloatingLabel label="College" className="mb-3">
                        <Form.Select aria-label="Degree" name="college" defaultValue="0">
                          <option value="0" disabled>Select College</option>
                          <option value="1">College 3</option>
                          <option value="2">Krupp</option>
                          <option value="3">Mercator</option>
                          <option value="4">Nordmetall</option>
                        </Form.Select>
                      </FloatingLabel>
                    </Col>
                    
                    <Col md>
                      <FloatingLabel label="Room Number" className="mb-3">
                        <Form.Control type="text" placeholder="XX" name="room"/>
                      </FloatingLabel>
                    </Col>
                  </Row>

                  <FloatingLabel label="Street Address *" className="mb-3" required>
                    <Form.Control type="text" placeholder="Campus Ring 1" name="street"/>
                  </FloatingLabel>

                  <Row>
                    <Col md>
                      <FloatingLabel label="ZIP Code *" className="mb-3" required>
                        <Form.Control type="number" placeholder="28759" name="zip"/>
                      </FloatingLabel>
                    </Col>
                    
                    <Col md>
                      <FloatingLabel label="City *" className="mb-3" required>
                        <Form.Control type="text" placeholder="Bremen" name="city"/>
                      </FloatingLabel>
                    </Col>

                    <Col md>
                      <FloatingLabel label="Country *" className="mb-3" required>
                        <Form.Select aria-label="Country" name="country" defaultValue="0">
                          <option value="0" disabled>Select Country</option>
                          { (this.state.countries !== null || this.state.countries !== '') ?
                            this.state.countries.map(country => (
                              <option value={count2++} key={count2++}>{country.name}</option>
                            )) : null
                          }
                        </Form.Select>
                      </FloatingLabel>
                    </Col>
                  </Row>

                  <FloatingLabel label="Email Address *" className="mb-3" required>
                    <Form.Control type="email" placeholder="example@email.com" name="email"/>
                  </FloatingLabel>

                  <FloatingLabel label="Phone Number" className="mb-3">
                    <Form.Control type="text" placeholder="+491234567890" name="phone"/>
                  </FloatingLabel>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h5 className="mb-3 pt-2">Education</h5>

                  <FloatingLabel label="University *" className="mb-3" required>
                    <Form.Control type="text" placeholder="Jacobs University Bremen" name="university" defaultValue="Jacobs University Bremen"/>
                  </FloatingLabel>

                  <Row>
                    <Col md>
                      <FloatingLabel label="Degree *" className="mb-3" required>
                        <Form.Select aria-label="Degree" name="degree" defaultValue="0">
                          <option value="0" disabled>Select Degree</option>
                          <option value="1">Bachelor</option>
                          <option value="2">Master</option>
                          <option value="3">PhD</option>
                          <option value="4">Other</option>
                        </Form.Select>
                      </FloatingLabel>
                    </Col>

                    <Col md>
                      <FloatingLabel label="Major *" className="mb-3" required>
                        <Form.Control type="text" placeholder="Computer Science" name="major"/>
                      </FloatingLabel>
                    </Col>
                  </Row>

                  <FloatingLabel label="Graduation Year *" className="mb-3" required>
                    <Form.Control type="text" placeholder="2021" name="grad-year"/>
                  </FloatingLabel>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h5 className="mb-3 pt-2">Experience</h5>

                  <div className="mb-3">
                    <Form.Label>Have you attended any hackathon(s) before?</Form.Label><br/>
                    <Form.Check inline label="Yes" type="radio" name="exp"/>
                    <Form.Check inline label="No" type="radio" name="exp"/>
                  </div>

                  <FloatingLabel label="Which one(s), and what year(s) did you attend it/them?" className="mb-3">
                    <Form.Control as="textarea" placeholder="..." style={{ height: '100px' }} name="prev-hack"/>
                  </FloatingLabel>

                  <FloatingLabel label="Why did you choose to apply for jacobsHack! 2021?" className="mb-3">
                    <Form.Control as="textarea" placeholder="..." style={{ height: '100px' }} name="why-apply"/>
                  </FloatingLabel>

                  <FloatingLabel label="What drives you to participate in hackathons?" className="mb-3">
                    <Form.Control as="textarea" placeholder="..." style={{ height: '100px' }} name="drive"/>
                  </FloatingLabel>

                  <FloatingLabel label="What inspires you? How do you express your creativity?" className="mb-3">
                    <Form.Control as="textarea" placeholder="..." style={{ height: '100px' }} name="creativity"/>
                  </FloatingLabel>

                  <FloatingLabel label="What is your desired role in the hackathon?" className="mb-3">
                    <Form.Control as="textarea" placeholder="..." style={{ height: '100px' }} name="role"/>
                  </FloatingLabel>

                  <FloatingLabel label="What is your strength when working with people?" className="mb-3">
                    <Form.Control as="textarea" placeholder="..." style={{ height: '100px' }} name="strength"/>
                  </FloatingLabel>

                  <FloatingLabel label="What are your weaknesses?" className="mb-3">
                    <Form.Control as="textarea" placeholder="..." style={{ height: '100px' }} name="weakness"/>
                  </FloatingLabel>

                  <FloatingLabel label="What have you built before?" className="mb-3">
                    <Form.Control as="textarea" placeholder="..." style={{ height: '100px' }} name="built"/>
                  </FloatingLabel>

                  <FloatingLabel label="What do you hope to achieve with your build(s) at JacobsHack! 2021?" className="mb-3">
                    <Form.Control as="textarea" placeholder="..." style={{ height: '100px' }} name="achieve"/>
                  </FloatingLabel>

                  <div className="mb-3">
                    <Form.Label>Would you like to be part of a team? *</Form.Label><br/>
                    <Form.Check inline label="Yes" type="radio" name="part-team" required/>
                    <Form.Check inline label="No" type="radio" name="part-team"/>
                  </div>

                  <div className="mb-3">
                    <Form.Label>Do you already have a team? *</Form.Label><br/>
                    <Form.Check inline label="Yes" type="radio" name="team" required/>
                    <Form.Check inline label="No" type="radio" name="team"/>
                  </div>

                  <FloatingLabel label="What are the names of the other team members?" className="mb-3">
                    <Form.Control as="textarea" placeholder="..." style={{ height: '100px' }} name="team-members"/>
                  </FloatingLabel>
                </ListGroup.Item>
                
                <ListGroup.Item>
                  <h5 className="mb-3 pt-2">Miscellaneous</h5>

                  <FloatingLabel label="Dietary Requirements" className="mb-3">
                    <Form.Select aria-label="Diet" name="diet" defaultValue="0">
                      <option value="0" disabled>Select Dietary Preference</option>
                      <option value="1">Vegetarian</option>
                      <option value="2">Vegan</option>
                      <option value="3">None</option>
                      <option value="4">Other</option>
                    </Form.Select>
                  </FloatingLabel>

                  <FloatingLabel label="T-Shirt Size *" className="mb-3" required>
                    <Form.Select aria-label="T-Shirt Size" name="tshirt" defaultValue="0">
                      <option value="0" disabled>Select Size</option>
                      <option value="1">XS</option>
                      <option value="2">S</option>
                      <option value="3">M</option>
                      <option value="4">L</option>
                      <option value="5">XL</option>
                    </Form.Select>
                  </FloatingLabel>

                  <FloatingLabel label="Do you have any other needs or special requests?" className="mb-3">
                    <Form.Control as="textarea" placeholder="..." style={{ height: '100px' }} name="needs"/>
                  </FloatingLabel>

                  <FloatingLabel label="Do you have any additional comments, questions or concerns?" className="mb-3">
                    <Form.Control as="textarea" placeholder="..." style={{ height: '100px' }} name="questions"/>
                  </FloatingLabel>

                  <FloatingLabel label="How did you hear about the event?" className="mb-3">
                    <Form.Control type="text" placeholder="..." name="hear"/>
                  </FloatingLabel>

                  <FloatingLabel label="Link to LinkedIn Profile" className="mb-3">
                    <Form.Control type="text" placeholder="LinkedIn" name="linkedin"/>
                  </FloatingLabel>

                  <FloatingLabel label="Link to GiHub" className="mb-3">
                    <Form.Control type="text" placeholder="GitHub" name="github"/>
                  </FloatingLabel>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Form.Label inline><Form.Check label=" " type="checkbox" name="terms" required inline/>I have read and agreed to the <a href="#" onClick={this.handleShow}>jacobsHack! 2021 Terms & Conditions</a>. *</Form.Label>

                  <Form.Label inline><Form.Check label=" " type="checkbox" name="mlh" required inline/>I have read and agree to the <a href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf" rel="noopener noreferrer">MLH Code of Conduct</a>. I further agree to the terms of both the <a href="https://github.com/MLH/mlh-policies/tree/master/prize-terms-and-conditions" rel="noopener noreferrer">MLH Contest Terms and Conditions</a> and the <a href="https://mlh.io/privacy" rel="noopener noreferrer">MLH Privacy Policy</a>. *</Form.Label>

                  <Form.Label inline><Form.Check label=" " type="checkbox" name="privacy" required inline/>I authorize you to share my application/registration information with Major League Hacking for event administration, ranking, MLH administration, and with my authorization email in-line with the <a href="https://mlh.io/privacy" rel="noopener noreferrer">MLH Privacy Policy</a>. *</Form.Label>

                  <Form.Label inline><Form.Check label=" " type="checkbox" name="messages" inline/>I authorize Major League Hacking to send me occasional messages about hackathons.</Form.Label>
                </ListGroup.Item>

                <ListGroup.Item id="btns">
                  <Button variant="secondary" size="lg">
                    <a href="https://jacobshack.com" style={{textDecoration:'none', color:'white'}}>Return to Website</a>
                  </Button>
                  
                  <Button variant="primary" size="lg" type="submit">
                    Submit
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Form>
          </Card>
        </div>

        <Modal show={this.state.show} onHide={this.handleClose} dialogClassName="modal-90w">
					<Modal.Header closeButton>
						<Modal.Title>jacobsHack! 2021 Terms & Conditions</Modal.Title>
					</Modal.Header>
					<Modal.Body>
            <Terms/>
          </Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={this.handleClose}>
							Close
            </Button>
					</Modal.Footer>
				</Modal>
      </div>
    );
  }
}

export default App;
