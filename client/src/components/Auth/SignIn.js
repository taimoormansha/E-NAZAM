import { useEffect, useState, useContext } from "react";
import { Container, Alert, Button, Form, Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import AuthContext from "../../contexts/AuthContext";

const SignIn = () => {
  const { user, setNewUser } = useContext(AuthContext);
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const history = useHistory();

  const API_URL = "http://localhost:8001";

  const handleInput = (e) => {
    let inputData = { [e.target.id]: e.target.value };
    setData({ ...data, ...inputData });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const res = await axios.post(`${API_URL}/auth/signin`, {
        email: data.email,
        password: data.password,
      });

      if (!res.data?.user.isApproved)
        swal("Pending Approval", "Your Account Approval is Pending", "info");

      // If user is approved, Set Token and Redirect to dashboard
      if (res.data?.user?.isApproved) {
        await setNewUser(res.data.user);
        localStorage.setItem("authToken", res.data.authToken);
        history.push("/admin/dashboard");
      }
    } catch {
      setError("Unable to Sign In.");
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w100" style={{ minWidth: "325px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Sign In</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {msg && <Alert variant="success">{msg}</Alert>}
            <Form onSubmit={handleSignIn}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={handleInput}
                />
              </Form.Group>
              <Form.Group className="mb-1" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={handleInput}
                  required
                />
              </Form.Group>
              <div className="w-100 text-left mb-3">
                <Link className="text-black" to="/auth/forgotpassword">
                  I forgot my password
                </Link>
              </div>
              <Button className="w-100" variant="primary" type="submit">
                Sign In
              </Button>
            </Form>
            <div className="w-100 text-center mt-3">
              Need an Account?{" "}
              <Link className="text-black" to="/auth/user">
                Sign Up
              </Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default SignIn;