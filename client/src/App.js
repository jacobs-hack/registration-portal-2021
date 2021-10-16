import * as React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Form, FloatingLabel, Card, ListGroup, Row, Col, Button, Image, Modal, Spinner } from 'react-bootstrap';
import jhlogo from './jh-logo-colored.png';
import Terms from './Terms.js';
import axios from 'axios';
import { countries_list } from './countries';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: countries_list,
      show: false,
      validated: false,
      submitting: false,
      submitted: false,

      formData: {
        fullname: '',
        birthday: '',
        gender: '',
        pronouns: '',
        nationality: '',
        ethnicity: '',
        onCampus: '',
        college: '',
        room: '',
        street: '',
        zip: '',
        city: 'Bremen',
        country: 'DE',
        email: '',
        phone: '',
        university: 'Jacobs University Bremen',
        degree: '',
        major: '',
        gradYear: '',
        exp: '',
        prevHack: '',
        whyApply: '',
        drive: '',
        creativity: '',
        role: '',
        strength: '',
        weakness: '',
        built: '',
        achieve: '',
        partTeam: '',
        team: '',
        teamMembers: '',
        diet: '',
        tshirt: '',
        needs: '',
        questions: '',
        linkedin: '',
        github: '',
        cvlink: '',
        terms: '',
        mlh: '',
        privacy: ''
      }
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.inputChanged = this.inputChanged.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  inputChanged(e) {
    this.setState({ errors: null });

    const formInput = this.state.formData;
    if (e.target.name === "onCampus") {
      if (e.target.value === "Yes") {
        formInput.onCampus = true;
      }
      else {
        formInput.onCampus = false;
      }
    }
    else if (e.target.name === "exp") {
      if (e.target.value === "Yes") {
        formInput.exp = true;
      }
      else {
        formInput.exp = false;
      }
    }
    else if (e.target.name === "team") {
      if (e.target.value === "Yes") {
        formInput.team = true;
      }
      else {
        formInput.team = false;
      }
    }
    else if (e.target.name === "terms") {
      if (e.target.checked) {
        formInput.terms = true;
      }
    }
    else if (e.target.name === "mlh") {
      if (e.target.checked) {
        formInput.mlh = true;
      }
    }
    else if (e.target.name === "privacy") {
      if (e.target.checked) {
        formInput.privacy = true;
      }
    }
    else if (e.target.name === "messages") {
      if (e.target.checked) {
        formInput.messages = true;
      }
    }
    else {
      formInput[e.target.name] = e.target.value;
    }

    this.setState({ formData: formInput });
    // console.log(formInput);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    this.setState({ validated: true });

    if (this.state.formData.fullname !== null && this.state.formData.birthday !== null
      && this.state.formData.gender !== null && this.state.formData.pronouns !== null
      && this.state.formData.nationality && this.state.formData.ethnicity 
      && this.state.formData.onCampus !== null && this.state.formData.street !== null 
      && this.state.formData.zip !== null && this.state.formData.city !== null 
      && this.state.formData.country !== null && this.state.formData.email !== null 
      && this.state.formData.university !== null && this.state.formData.degree !== null 
      && this.state.formData.major !== null && this.state.formData.gradYear !== null
      && this.state.formData.exp !== null && this.state.formData.whyApply !== null
      && this.state.formData.role !== null && this.state.formData.achieve !== null
      && this.state.formData.partTeam !== null && this.state.formData.team !== null
      && this.state.formData.diet !== null && this.state.formData.tshirt !== null
      && this.state.formData.terms !== null && this.state.formData.mlh !== null
      && this.state.formData.privacy !== null) {
        this.setState({ submitting: true });
        
        axios.post('/api/signup', this.state.formData)
          .then(response => {
            this.setState({ submitting: false});
            this.setState({ submitted: true});
            console.log('Registered successfully!');
            // alert('Registered successfully!');
          })
          .catch(error => {
            this.setState({ submitting: false });
            console.error('There was an error!', error);
            alert('There was an error registering you! Please contact e.kulla@jacobs-university.de if you are having trouble registering.', error);
          }
        );
    }
    else {
      alert('Please fill all required fields!')
    }
  }

  render() {
    return (
      <div className="App">
        <div id="img-cont">
          <Image src={jhlogo} id="logo" />
        </div>

        <div id="intro-text">
          <h1 style={{paddingTop:20}}>jacobs<i>Hack</i>! 2021</h1>
          <h2>Registration Form</h2>
        </div>

        {
          (this.state.submitted === false) ?

          <div id="form-cont">
            <Card id="form-card">
              <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h5 className="mb-3 pt-2">Demographics</h5>
                    <FloatingLabel label="Full Name *" className="mb-3">
                      <Form.Control type="text" placeholder="Full Name" name="fullname" required value={this.state.formData.fullname} onChange={this.inputChanged} />
                      <Form.Text className="text-muted">
                        Please write your name as it appears on your passport
                      </Form.Text>
                      <Form.Control.Feedback type="invalid">
                        Please provide your full name.
                      </Form.Control.Feedback>
                    </FloatingLabel>

                    <FloatingLabel label="Birthday *" className="mb-3">
                      <Form.Control type="date" placeholder="DD/MM/YYYY" required name="birthday" value={this.state.formData.birthday} onChange={this.inputChanged} />
                      <Form.Control.Feedback type="invalid">
                        Please provide your birthday.
                      </Form.Control.Feedback>
                    </FloatingLabel>

                    <Row>
                      <Col md>
                        <FloatingLabel label="Gender *" className="mb-3">
                          <Form.Select aria-label="Gender" name="gender" required value={this.state.formData.gender} onChange={this.inputChanged}>
                            <option value="" disabled>Select Gender</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                            <option value="O">Other</option>
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            Please select your gender.
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </Col>

                      <Col md>
                        <FloatingLabel label="Pronouns *" className="mb-3">
                          <Form.Select aria-label="Pronouns" name="pronouns" required value={this.state.formData.pronouns} onChange={this.inputChanged}>
                            <option value="" disabled>Select Pronouns</option>
                            <option value="he/him">He/Him</option>
                            <option value="she/her">She/Her</option>
                            <option value="they/them">They/Them</option>
                            <option value="other">Other</option>
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            Please select your pronouns.
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </Col>
                    </Row>

                    <Row>
                      <Col md>
                        <FloatingLabel label="Nationality *" className="mb-3">
                          <Form.Select aria-label="Nationality" name="nationality" required value={this.state.formData.nationality} onChange={this.inputChanged}>
                            <option value="" disabled>Select Country</option>
                            {(this.state.countries !== null || this.state.countries !== '') ?
                              this.state.countries.map((country, key) => (
                                <option value={country.code} key={key}>{country.name}</option>
                              )) : null
                            }
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            Please select your nationality.
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </Col>

                      <Col md>
                        <FloatingLabel label="Ethnicity *" className="mb-3">
                          <Form.Select aria-label="Ethnicity" name="ethnicity" required value={this.state.formData.ethnicity} onChange={this.inputChanged}>
                            <option value="" disabled>Select Ethnicity</option>
                            <option value="native">American Indian or Alaska Native</option>
                            <option value="asian">Asian</option>
                            <option value="black">Black or African American</option>
                            <option value="hispanic">Hispanic or Latino</option>
                            <option value="islander">Native Hawaiian or Other Pacific Islander</option>
                            <option value="white">White</option>
                            <option value="other">Other</option>
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            Please select your ethnicity.
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <h5 className="mb-3 pt-2">Contact Details</h5>

                    <div className="mb-3">
                      <Form.Label>Do you live on campus? *</Form.Label><br/>
                      <Form.Check inline label="Yes" value="Yes" type="radio" name="onCampus" onChange={this.inputChanged} required/>
                      <Form.Check inline label="No" value="No" type="radio" name="onCampus" onChange={this.inputChanged}/>
                      <Form.Control.Feedback type="invalid">
                        Please select an answer.
                      </Form.Control.Feedback>
                    </div>

                    {
                      (this.state.formData.onCampus === true) ?
                        <Row>
                          <Col md>
                            <FloatingLabel label="College" className="mb-3">
                              <Form.Select aria-label="College" name="college" value={this.state.formData.college} onChange={this.inputChanged}>
                                <option value="" disabled>Select College</option>
                                <option value="c3">College 3</option>
                                <option value="krupp">Krupp</option>
                                <option value="merc">Mercator</option>
                                <option value="nord">Nordmetall</option>
                              </Form.Select>
                            </FloatingLabel>
                          </Col>

                          <Col md>
                            <FloatingLabel label="Room Number" className="mb-3">
                              <Form.Control type="text" placeholder="XX" name="room" value={this.state.formData.room} onChange={this.inputChanged} />
                            </FloatingLabel>
                          </Col>
                        </Row>
                        : null
                    }

                    <FloatingLabel label="Street Address *" className="mb-3">
                      <Form.Control type="text" placeholder="Campus Ring 1" required name="street" value={this.state.formData.street} onChange={this.inputChanged} />
                      <Form.Control.Feedback type="invalid">
                        Please provide your street address.
                      </Form.Control.Feedback>
                    </FloatingLabel>

                    <Row>
                      <Col md>
                        <FloatingLabel label="ZIP Code *" className="mb-3">
                          <Form.Control type="number" placeholder="28759" name="zip" required value={this.state.formData.zip} onChange={this.inputChanged} />
                          <Form.Control.Feedback type="invalid">
                            Please provide your zip code.
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </Col>

                      <Col md>
                        <FloatingLabel label="City *" className="mb-3">
                          <Form.Control type="text" placeholder="Bremen" name="city" required value={this.state.formData.city} onChange={this.inputChanged} />
                          <Form.Control.Feedback type="invalid">
                            Please provide your city of residence.
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </Col>

                      <Col md>
                        <FloatingLabel label="Country *" className="mb-3">
                          <Form.Select aria-label="Country" name="country" required value={this.state.formData.country} onChange={this.inputChanged}>
                            <option value="0" disabled>Select Country</option>
                            {(this.state.countries !== null || this.state.countries !== '') ?
                              this.state.countries.map((country, key) => (
                                <option value={country.code} key={key}>{country.name}</option>
                              )) : null
                            }
                          </Form.Select>
                        </FloatingLabel>
                        <Form.Control.Feedback type="invalid">
                          Please select your country of residence.
                        </Form.Control.Feedback>
                      </Col>
                    </Row>

                    <FloatingLabel label="Email Address *" className="mb-3">
                      <Form.Control type="email" placeholder="example@email.com" name="email" required value={this.state.formData.email} onChange={this.inputChanged} />
                      <Form.Control.Feedback type="invalid">
                        Please provide your email.
                      </Form.Control.Feedback>
                    </FloatingLabel>

                    <FloatingLabel label="Phone Number" className="mb-3">
                      <Form.Control type="text" placeholder="+491234567890" name="phone" value={this.state.formData.phone} onChange={this.inputChanged} />
                    </FloatingLabel>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <h5 className="mb-3 pt-2">Education</h5>

                    <FloatingLabel label="University *" className="mb-3">
                      <Form.Control type="text" placeholder="Jacobs University Bremen" name="university" required value={this.state.formData.university} onChange={this.inputChanged} />
                      <Form.Control.Feedback type="invalid">
                        Please provide your university.
                      </Form.Control.Feedback>
                    </FloatingLabel>

                    <Row>
                      <Col md>
                        <FloatingLabel label="Degree *" className="mb-3">
                          <Form.Select aria-label="Degree" name="degree" required value={this.state.formData.degree} onChange={this.inputChanged}>
                            <option value="" disabled>Select Degree</option>
                            <option value="bachelor">Bachelor</option>
                            <option value="master">Master</option>
                            <option value="phd">PhD</option>
                            <option value="other">Other</option>
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            Please select your degree.
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </Col>

                      <Col md>
                        <FloatingLabel label="Major *" className="mb-3">
                          <Form.Control type="text" placeholder="Computer Science" name="major" required value={this.state.formData.major} onChange={this.inputChanged} />
                          <Form.Control.Feedback type="invalid">
                            Please provide your major.
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </Col>
                    </Row>

                    <FloatingLabel label="Graduation Year *" className="mb-3">
                      <Form.Control type="number" placeholder="2021" name="gradYear" required value={this.state.formData.gradYear} onChange={this.inputChanged} />
                      <Form.Control.Feedback type="invalid">
                        Please provide your graduation year.
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <h5 className="mb-3 pt-2">Experience</h5>

                    <div className="mb-3">
                      <Form.Label>Have you attended any hackathon(s) before? *</Form.Label><br />
                      <Form.Check inline label="Yes" value="Yes" type="radio" name="exp" onChange={this.inputChanged} required />
                      <Form.Check inline label="No" value="No" type="radio" name="exp" onChange={this.inputChanged} />
                      <Form.Control.Feedback type="invalid">
                        Please select an answer.
                      </Form.Control.Feedback>
                    </div>

                    {
                      (this.state.formData.exp === true) ?
                        <FloatingLabel label="Which one(s), and what year(s) did you attend it/them?" className="mb-3">
                          <Form.Control as="textarea" placeholder="..." style={{ height: '100px' }} name="prevHack" value={this.state.formData.prevHack} onChange={this.inputChanged} />
                        </FloatingLabel>
                        : null
                    }

                    <FloatingLabel label="Why did you choose to apply for jacobsHack! 2021? *" className="mb-3">
                      <Form.Control as="textarea" placeholder="..." style={{ height: '100px' }} name="whyApply" required value={this.state.formData.whyApply} onChange={this.inputChanged} />
                      <Form.Control.Feedback type="invalid">
                        Please provide an answer.
                      </Form.Control.Feedback>
                    </FloatingLabel>

                    <FloatingLabel label="What drives you to participate in hackathons?" className="mb-3">
                      <Form.Control as="textarea" placeholder="..." style={{ height: '100px' }} name="drive" value={this.state.formData.drive} onChange={this.inputChanged} />
                    </FloatingLabel>

                    <FloatingLabel label="What inspires you? How do you express your creativity?" className="mb-3">
                      <Form.Control as="textarea" placeholder="..." style={{ height: '100px' }} name="creativity" value={this.state.formData.creativity} onChange={this.inputChanged} />
                    </FloatingLabel>

                    <FloatingLabel label="What is your desired role in the hackathon? *" className="mb-3">
                      <Form.Control as="textarea" placeholder="..." style={{ height: '100px' }} name="role" required value={this.state.formData.role} onChange={this.inputChanged} />
                      <Form.Control.Feedback type="invalid">
                        Please provide an answer.
                      </Form.Control.Feedback>
                    </FloatingLabel>

                    <FloatingLabel label="What is your strength when working with people?" className="mb-3">
                      <Form.Control as="textarea" placeholder="..." style={{ height: '100px' }} name="strength" value={this.state.formData.strength} onChange={this.inputChanged} />
                    </FloatingLabel>

                    <FloatingLabel label="What are your weaknesses?" className="mb-3">
                      <Form.Control as="textarea" placeholder="..." style={{ height: '100px' }} name="weakness" value={this.state.formData.weakness} onChange={this.inputChanged} />
                    </FloatingLabel>

                    <FloatingLabel label="What have you built before?" className="mb-3">
                      <Form.Control as="textarea" placeholder="..." style={{ height: '100px' }} name="built" value={this.state.formData.built} onChange={this.inputChanged} />
                    </FloatingLabel>

                    <FloatingLabel label="What do you hope to achieve with your build(s)? *" className="mb-3">
                      <Form.Control as="textarea" placeholder="..." style={{ height: '100px' }} name="achieve" required value={this.state.formData.achieve} onChange={this.inputChanged} />
                      <Form.Control.Feedback type="invalid">
                        Please provide an answer.
                      </Form.Control.Feedback>
                    </FloatingLabel>

                    <div className="mb-3">
                      <Form.Label>Would you like to be part of a team? *</Form.Label><br />
                      <Form.Check inline label="Yes" value="Yes" type="radio" name="partTeam" required onChange={this.inputChanged} />
                      <Form.Check inline label="No" value="No" type="radio" name="partTeam" onChange={this.inputChanged} />
                      <Form.Control.Feedback type="invalid">
                        Please select an answer.
                      </Form.Control.Feedback>
                    </div>

                    <div className="mb-3">
                      <Form.Label>Do you already have a team? *</Form.Label><br />
                      <Form.Check inline label="Yes" value="Yes" type="radio" name="team" required onChange={this.inputChanged} />
                      <Form.Check inline label="No" value="No" type="radio" name="team" onChange={this.inputChanged} />
                      <Form.Control.Feedback type="invalid">
                        Please select an answer.
                      </Form.Control.Feedback>
                    </div>

                    {
                      (this.state.formData.team === true) ?
                        <FloatingLabel label="What are the names of the other team members?" className="mb-3">
                          <Form.Control as="textarea" placeholder="..." style={{ height: '100px' }} name="teamMembers" value={this.state.formData.teamMembers} onChange={this.inputChanged} />
                        </FloatingLabel>
                        : null
                    }
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <h5 className="mb-3 pt-2">Miscellaneous</h5>

                    <FloatingLabel label="Dietary Requirements *" className="mb-3">
                      <Form.Select aria-label="Diet" name="diet" required value={this.state.formData.diet} onChange={this.inputChanged}>
                        <option value="" disabled>Select Dietary Preference</option>
                        <option value="vegetarian">Vegetarian</option>
                        <option value="vegan">Vegan</option>
                        <option value="none">None</option>
                        <option value="other">Other</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        Please select your dietary needs.
                      </Form.Control.Feedback>
                    </FloatingLabel>

                    <FloatingLabel label="T-Shirt Size *" className="mb-3">
                      <Form.Select aria-label="T-Shirt Size" name="tshirt" required value={this.state.formData.tshirt} onChange={this.inputChanged}>
                        <option value="" disabled>Select Size</option>
                        <option value="xs">XS</option>
                        <option value="s">S</option>
                        <option value="m">M</option>
                        <option value="l">L</option>
                        <option value="xl">XL</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        Please select your T-Shirt size.
                      </Form.Control.Feedback>
                    </FloatingLabel>

                    <FloatingLabel label="Do you have any other needs or special requests?" className="mb-3">
                      <Form.Control as="textarea" placeholder="..." style={{ height: '100px' }} name="needs" value={this.state.formData.needs} onChange={this.inputChanged} />
                    </FloatingLabel>

                    <FloatingLabel label="Do you have any additional comments, questions or concerns?" className="mb-3">
                      <Form.Control as="textarea" placeholder="..." style={{ height: '100px' }} name="questions" value={this.state.formData.questions} onChange={this.inputChanged} />
                    </FloatingLabel>

                    <FloatingLabel label="Link to LinkedIn Profile" className="mb-3">
                      <Form.Control type="text" placeholder="LinkedIn" name="linkedin" value={this.state.formData.linkedin} onChange={this.inputChanged} />
                    </FloatingLabel>

                    <FloatingLabel label="Link to GitHub" className="mb-3">
                      <Form.Control type="text" placeholder="GitHub" name="github" value={this.state.formData.github} onChange={this.inputChanged} />
                    </FloatingLabel>

                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>Upload CV</Form.Label>
                      <Form.Control type="file" name="cvlink" value={this.state.formData.cvlink} onChange={this.inputChanged}/>
                    </Form.Group>

                    {/* <FloatingLabel label="Link to CV" className="mb-3">
                      <Form.Control type="text" placeholder="CV" name="cvlink" value={this.state.formData.cvlink} onChange={this.inputChanged} />
                    </FloatingLabel>
                    <Form.Text className="text-muted">
                      Provide a lik to Google Drive or other if you'd like to be reached out by companies.
                    </Form.Text> */}
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Form.Label inline><Form.Check label=" " type="checkbox" name="terms" required inline value={this.state.formData.terms} onChange={this.inputChanged} />I have read and agreed to the <a href="#" onClick={this.handleShow}>jacobsHack! 2021 Terms & Conditions</a>. *</Form.Label>

                    <Form.Label inline><Form.Check label=" " type="checkbox" name="mlh" required inline value={this.state.formData.mlh} onChange={this.inputChanged} />I have read and agree to the <a href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf" target="blank_" rel="noopener noreferrer">MLH Code of Conduct</a>. I further agree to the terms of both the <a href="https://github.com/MLH/mlh-policies/tree/master/prize-terms-and-conditions" target="blank_" rel="noopener noreferrer">MLH Contest Terms and Conditions</a> and the <a href="https://mlh.io/privacy" rel="noopener noreferrer">MLH Privacy Policy</a>. *</Form.Label>

                    <Form.Label inline><Form.Check label=" " type="checkbox" name="privacy" required inline value={this.state.formData.privacy} onChange={this.inputChanged} />I authorize you to share my application/registration information with Major League Hacking for event administration, ranking, MLH administration, and with my authorization email in-line with the <a href="https://mlh.io/privacy" target="blank_" rel="noopener noreferrer">MLH Privacy Policy</a>. *</Form.Label>
                  </ListGroup.Item>

                  <ListGroup.Item id="btns">
                    <Button variant="secondary" size="lg">
                      <a href="https://jacobshack.com" style={{ textDecoration: 'none', color: 'white' }}>Return to Website</a>
                    </Button>

                    <Button variant="primary" size="lg" type="submit" onClick={this.handleSubmit}>
                      Register Now!
                    </Button>

                    {
                      (this.state.submitting === true) ?
                        <h3 style={{ textAlign:"center", color:"rgba(127, 150, 218)", paddingTop:30 }}><Spinner animation="border" role="status" /> Submitting...</h3>
                        : null
                    }
                  </ListGroup.Item>
                </ListGroup>
              </Form>
            </Card>
          </div>

          :

          <div>
            <Card className="text-center registration-success">
              <Card.Header>Successfully Regisered!</Card.Header>
              <Card.Body>
                <Card.Title>Thank you for registering!</Card.Title>
                <Card.Text>
                  We are heppy to welcome you to the jacobs<i>Hack</i>! 2021 event! <br/>
                  More instructions will be provided soon.
                </Card.Text>
                <a href="https://jacobshack.com/" target="blank_" rel="noopener noreferrer"><Button variant="primary">Visit Website</Button></a>
              </Card.Body>
            </Card>
          </div>
        }

        <Modal show={this.state.show} onHide={this.handleClose} dialogClassName="modal-90w">
          <Modal.Header closeButton>
            <Modal.Title>jacobsHack! 2021 Terms & Conditions</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Terms />
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
