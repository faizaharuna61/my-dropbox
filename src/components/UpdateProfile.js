import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuthenticate } from "../Context";
import { Link, useHistory } from "react-router-dom";
import Center from "./Align_Center";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuthenticate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  function updateProfile(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    const promises = [];
    setLoading(true);
    setError("");
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/user");
      })
      .catch(() => {
        setError("Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Center>
      <Card
        style={{
          maxWidth: "500px",
          margin: "auto",
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#505050",
          color: "white",
          padding: "20px",
        }}
      >
        <Card.Body>
          <h2
            style={{
              textAlign: "center",
              color: "white",
              marginBottom: "20px",
              fontFamily: "Arial, sans-serif",
              fontWeight: "bold",
            }}
          >
            Update Profile
          </h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={updateProfile}>
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
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password" style={{ marginBottom: "15px" }}>
              <Form.Control
                style={{
                  backgroundColor: "#ffffff",
                  color: "#212529",
                  border: "1px solid #ced4da",
                  borderRadius: "10px",
                  padding: "10px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
                type="password"
                placeholder="Password"
                ref={passwordRef}
              />
            </Form.Group>
            <Form.Group id="password-confirm" style={{ marginBottom: "20px" }}>
              <Form.Control
                style={{
                  backgroundColor: "#ffffff",
                  color: "#212529",
                  border: "1px solid #ced4da",
                  borderRadius: "10px",
                  padding: "10px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
                type="password"
                placeholder="Confirm Password"
                ref={passwordConfirmRef}
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
              Update
            </Button>
          </Form>
          <div style={{ textAlign: "center", marginTop: "15px" }}>
            <Link
              to="/user"
              style={{
                color: "#A9A9A9", // Same color as the button
                textDecoration: "none",
                fontSize: "16px",
                padding: "10px",
                backgroundColor: "#505050", // Background color to match the card
                borderRadius: "10px",
                display: "inline-block",
                width: "100%",
                textAlign: "center",
                marginTop: "10px", // Add margin for spacing
              }}
            >
              Cancel
            </Link>
          </div>
        </Card.Body>
      </Card>
    </Center>
  );
}
