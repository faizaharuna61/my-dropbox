import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuthenticate } from "../Context";
import { Link, useHistory } from "react-router-dom";
import Center from "./Align_Center";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuthenticate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function signIn(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Wrong Email/Password");
    }

    setLoading(false);
  }

  return (
    <Center>
      <Card
        style={{
          maxWidth: "400px",
          margin: "auto",
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#505050",
          padding: "20px",
          color: "white",
        }}
      >
        <Card.Body>
          <h2
            style={{
              textAlign: "center",
              color: "white",
              marginBottom: "30px",
              fontFamily: "Arial, sans-serif",
              fontWeight: "bold",
            }}
          >
            Log In
          </h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={signIn}>
            <Form.Group id="email" style={{ marginBottom: "15px" }}>
              <Form.Control
                style={{
                  backgroundColor: "#ffffff",
                  color: "#212529",
                  border: "none",
                  borderRadius: "5px",
                  padding: "10px",
                }}
                type="email"
                placeholder="Enter Email"
                ref={emailRef}
                required
              />
            </Form.Group>
            <Form.Group id="password" style={{ marginBottom: "20px" }}>
              <Form.Control
                style={{
                  backgroundColor: "#ffffff",
                  color: "#212529",
                  border: "none",
                  borderRadius: "5px",
                  padding: "10px",
                }}
                type="password"
                placeholder="Enter Password"
                ref={passwordRef}
                required
              />
            </Form.Group>
            <Button
              disabled={loading}
              style={{
                width: "100%",
                backgroundColor: "#505050",
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "10px",
                transition: "transform 0.3s ease-in-out",
              }}
              type="submit"
            >
              Log In
            </Button>
          </Form>
          <div style={{ textAlign: "center", marginTop: "15px", color: "white" }}>
            <Link to="/forgot-password" style={{ color: "#ffffff", textDecoration: "none" }}>
              Forgot Password?
            </Link>
          </div>
          <div style={{ textAlign: "center", marginTop: "10px", color: "white" }}>
            New here? <Link to="/signup" style={{ color: "#ffffff", textDecoration: "none" }}>Sign Up</Link>
          </div>
        </Card.Body>
      </Card>
    </Center>
  );
}
