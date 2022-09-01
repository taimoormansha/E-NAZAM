import { useState } from "react";
import { Container, Alert, Button, Form, Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const ResetPassword = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const API_URL = "http://localhost:8001";

  const params = new URLSearchParams(document.location.search);
  const token = params.get("token");

  const handleInput = (e) => {
    let inputData = { [e.target.id]: e.target.value };
    setData({ ...data, ...inputData });
  };

  const handleConfirmPassword = (e) => {
    handleInput(e);
    setPasswordError(
      data.password !== e.target.value ? "Passwords do not match." : null
    );
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      setError("Enter Matching Passwords");
      return;
    }

    try {
      setError("");
      setLoading(true);
      const res = await axios.post(
        `${API_URL}/auth/reset-password?token=${token}`,
        {
          password: data.password,
          confirmPassword: data.confirmPassword,
        }
      );

      if (res.data?.success) {
        swal(
          "Great!",
          "Your password has been successfully reset.",
          "success"
        ).then(() => history.push("/auth/signin"));

        history.push();
      } else {
        swal("Error", "Unable to Proceed, Invalid details.", "error");
      }
    } catch (error) {
      console.error(error);
      setError("Unable to proceed.");
    }
  };

  return (
    <>
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w100" style={{ minWidth: "325px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Reset Password</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleResetPassword}>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    onChange={handleInput}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    onChange={handleConfirmPassword}
                    required
                  />
                </Form.Group>
                {!!passwordError && (
                  <Alert variant="danger">{passwordError}</Alert>
                )}
                <Button
                  disabled={loading}
                  className="w-100"
                  variant="primary"
                  type="submit"
                >
                  Reset Password
                </Button>
              </Form>
              <div className="w-100 text-center mt-3">
                Already have an account?{" "}
                <Link className="text-black" to="/auth/signin">
                  Log In
                </Link>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
};

export default ResetPassword;