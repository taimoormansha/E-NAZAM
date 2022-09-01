import axios from "axios";
import AuthContext from "contexts/AuthContext";
import React, { useContext } from "react";
import swal from "sweetalert";

// react-bootstrap components
import { Button, Card, Form, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";

function User() {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState(user?.name);
  const host = "http://localhost:8001";
  const authToken = localStorage.getItem("authToken");
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData);
    try {
      if (userData.name && userData.name.length < 3) {
        throw "Invalid Values, Name must contain atleast 3 letters. ";
      }

      if (userData.password && userData.password.length < 8) {
        throw "Invalid Values, Password must contain atleast 8 letters.";
      }

      const response = await axios.post(
        `${host}/user/${user._id}`,
        { name: userData.name, password: userData.password },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": authToken,
          },
        }
      );
      if (response.data?.success) {
        if (userData.name.length >= 3) setName(userData.name);
        swal("Great!", "Your Account has been updated.", "success");
      }
    } catch (error) {
      swal("Oops!", error, "error");
      console.error(error);
    }
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Edit Profile</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleUpdateUser}>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <Form.Control
                          defaultValue={user?.email}
                          disabled
                          placeholder="Email"
                          type="email"
                          name="email"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <label>Username</label>
                        <Form.Control
                          defaultValue={user?.name}
                          placeholder="Username"
                          type="text"
                          name="name"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <label>New Password</label>
                        <Form.Control
                          defaultValue=""
                          placeholder="New Password"
                          type="password"
                          name="password"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-left"
                    type="submit"
                    variant="info"
                  >
                    Update Profile
                  </Button>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <div className="card-image">
                <img
                  alt="..."
                  src={require("assets/img/photo-1431578500526-4d9613015464.jpeg")}
                ></img>
              </div>
              <Card.Body>
                <div className="author">
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={require("assets/img/faces/face-0.jpg")}
                    ></img>
                    <h5 className="title">{name}</h5>
                  </a>
                  <p className="description">{user?.email}</p>
                </div>
              </Card.Body>
              
              {/* <div className="button-container mr-auto ml-auto">
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-facebook-square"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-twitter"></i>
                </Button>
                <Button
                  className="btn-simple btn-icon"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  variant="link"
                >
                  <i className="fab fa-google-plus-square"></i>
                </Button>
              </div> */}
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default User;