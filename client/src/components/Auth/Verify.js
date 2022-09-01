import { useState } from "react";
import { Container, Alert, Button, Form, Card } from "react-bootstrap";
import { Route, Redirect, Link, useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const Verify = () => {
  const [data, setData] = useState({});
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  // const { signup, currentUser } = useAuth();
  const history = useHistory();

  const handleInput = (e) => {
    let inputData = { [e.target.id]: e.target.value };
    setData({ ...data, ...inputData });
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const API_URL = "http://localhost:8001/auth/user";
      setLoading(true);

      // await signup(data.email, data.password);
      const res = await axios.post(API_URL, {
        email: data.email,
      });

      if (!res.data?.exists) {
        if (res.data?.isEmailSent)
          swal(
            "Great!",
            "A verification email has been sent to your account.",
            "success"
          );
      } else {
        if (res.data?.role === "Super-Admin" || res.data?.isApproved)
          history.push("/auth/signin");

        swal("Pending Approval", "Your Account Approval is Pending", "info");
      }
    } catch {
      setMsg("Unable to create account.");
    }

    setLoading(false);
  };

  return (
    <>
      <Route
        path="/auth/user"
        render={() =>
          false ? (
            <Redirect to="/admin/dashboard" />
          ) : (
            <Container
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "100vh" }}
            >
              <div
                className="w100"
                style={{ minWidth: "325px", maxWidth: "400px" }}
              >
                <Card>
                  <Card.Body>
                    <h2 className="text-center mb-4">Verify Email</h2>
                    {msg && <Alert variant="success">{msg}</Alert>}
                    <Form onSubmit={handleVerify}>
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
                        Authenticate
                      </Button>
                    </Form>
                    <div className="w-100 text-center mt-3">
                      Already have an account?{" "}
                      <Link className="text-black" to="/auth/signin">
                        Sign In
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </Container>
          )
        }
      />
    </>
  );
};

export default Verify;