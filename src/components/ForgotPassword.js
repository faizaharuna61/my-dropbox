import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuthenticate } from "../Context";
import { Link } from "react-router-dom";
import Center from "./Align_Center";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuthenticate();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function passwordReset(e) {
    e.preventDefault();
    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }
    setLoading(false);
  }

  return (
    <Center>
      <Card
        style={{
          maxWidth: "500px",
          margin: "auto",
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#505050", // Card background color
          color: "white",
          padding: "20px",
        }}
      >
        <Card.Body>
          <h2
            className="text-center mb-4"
            style={{
              color: "white",
              fontFamily: "Arial, sans-serif",
              fontWeight: "bold",
            }}
          >
            Password Reset
          </h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={passwordReset}>
            <Form.Group id="email" style={{ marginBottom: "15px" }}>
              <Form.Control
                style={{
                  backgroundColor: "#ffffff",
                  color: "#212529",
                  border: "1px solid #ced4da",
                  borderRadius: "10px",
                  padding: "10px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
                type="email"
                placeholder="Email"
                ref={emailRef}
                required
              />
            </Form.Group>
            <Button
              disabled={loading}
              style={{
                width: "100%",
                backgroundColor: "#A9A9A9", // Button color (lighter dark ash)
                color: "white",
                border: "none",
                borderRadius: "10px",
                padding: "10px",
                fontSize: "16px",
                transition: "transform 0.3s ease-in-out",
              }}
              type="submit"
            >
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link
              to="/login"
              style={{
                color: "#A9A9A9", // Same color as the button
                textDecoration: "none",
                fontSize: "16px",
                padding: "10px",
                backgroundColor: "#505050", // Background color to match the card
                borderRadius: "10px",
                display: "inline-block",
              }}
            >
              Login
            </Link>
          </div>
          <div className="w-100 text-center mt-2" style={{ color: "white" }}>
            Need an account?{" "}
            <Link
              to="/signup"
              style={{
                color: "#A9A9A9", // Same color as the button
                textDecoration: "none",
              }}
            >
              Sign Up
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Center>
  );
}
