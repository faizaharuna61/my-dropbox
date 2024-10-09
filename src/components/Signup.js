
import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuthenticate } from "../Context";
import { Link, useHistory } from "react-router-dom";
import Center from "./Align_Center";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuthenticate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  async function signUp(e) {
    e.preventDefault();

    if (passwordRef.current.value.length < 6) {
      return setError("Password must be at least 6 characters long");
    }

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      if (isMounted.current) {
        history.push("/");
      }
    } catch {
      if (isMounted.current) {
        setError("Failed to create an account");
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
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
            Get Started with Us
          </h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={signUp}>
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
            <Form.Group id="password" style={{ marginBottom: "15px" }}>
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
            <Form.Group id="password-confirm" style={{ marginBottom: "20px" }}>
              <Form.Control
                style={{
                  backgroundColor: "#ffffff",
                  color: "#212529",
                  border: "none",
                  borderRadius: "5px",
                  padding: "10px",
                }}
                type="password"
                placeholder="Confirm Password"
                ref={passwordConfirmRef}
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
              Sign Up
            </Button>
          </Form>
          <div style={{ textAlign: "center", marginTop: "20px", color: "white" }}>
            Already have an account? <Link to="/login" style={{ color: "#ffffff", textDecoration: "none" }}>Log In</Link>
          </div>
        </Card.Body>
      </Card>
    </Center>
  );
}
