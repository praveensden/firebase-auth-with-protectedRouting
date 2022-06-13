import React, { useContext, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import { userAuthContext } from "../context/UserAuthContext";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [err, setErr] = useState();
  const navigate = useNavigate();
  const { login, googleSignin } = useContext(userAuthContext);
  const handleSubmit = async (e) => {
    setErr("");
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/home");
    } catch (err) {
      setErr(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignin();
      navigate("/home");
    } catch (err) {
      setErr(err.message);
    }
  };
  return (
    <>
      <div className="p-4 box">
        <h2 className="mb-3">Firebase Auth Login</h2>
        {err && <Alert variant="danger">{err}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="email address"
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            ></Form.Control>
          </Form.Group>
          <div className="d-grid gap-2">
            <Button variant="primary" type="submit">
              Log In
            </Button>
          </div>
        </Form>
        <div className="mt-3 text-center w-100 bg-red">
          <GoogleButton type="dark" onClick={handleGoogleSignIn} />
        </div>
        <div className="p-4 box mt-3 text-center">
          Don't have an account?
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </>
  );
};

export default Login;
