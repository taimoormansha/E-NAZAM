import { useState } from "react";
import { Container, Alert, Button, Form, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const ForgotPassword = () => {
  const [data, setData] = useState({});
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const HOST = "http://localhost:8001";

  const handleInput = (e) => {
    let inputData = { [e.target.id]: e.target.value };
    setData({ ...data, ...inputData });
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const API_URL = `${HOST}/auth/forgot-password`;
      setLoading(true);

      const res = await axios.post(API_URL, {
        email: data.email,
      });

      if (res.data?.success) {
        swal(
          "Great!",
          "A password reset email has been sent to your account with reset link.",
          "success"
        );
      } else {
        swal("Error", "Unable to send Email, Invalid details.", "error");
      }
    } catch (error) {
      console.error(error);
      setMsg("Unable to send email.");
    }

    setLoading(false);
  };

  return (
    <>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w100" style={{ minWidth: "325px", maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h3 className="text-center mb-4">Request Password Reset</h3>
              {msg && <Alert variant="error">{msg}</Alert>}
              <Form onSubmit={handleForgotPassword}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={handleInput}
                    required
                  />
                </Form.Group>
                <Button
                  disabled={loading}
                  className="w-100"
                  variant="primary"
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
              <div className="w-100 text-center mt-3">
                Back to{" "}
                <Link className="text-black" to="/auth/signin">
                  Sign In
                </Link>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
};

export default ForgotPassword;