import React from "react";
import { Card, Button } from "react-bootstrap";
import { useAuthenticate } from "../Context";
import { Link, useHistory } from "react-router-dom";
import Center from "./Align_Center";

export default function Profile() {
  const { currentUser } = useAuthenticate(); 
  const history = useHistory(); 

  const handleRedirectToLogin = () => {
    history.push("/login"); 
  }

  return (
    <Center>
      <Card style={{ backgroundColor: "#505050", border: "none", width: '400px', padding: '20px', borderRadius: '15px' }}>
        <Card.Body>
          <h2 className="text-center mb-4" style={{ color: "white" }}>My Profile</h2>
          
          {/* Panel for user information */}
          <div style={{ backgroundColor: "#ffffff", borderRadius: '10px', padding: '15px', marginBottom: '15px' }}>
            <strong style={{ color: "#505050" }}>Email:</strong> 
            <span style={{ color: "#505050" }}> {currentUser.email}</span>
          </div>

          {/* Update Profile Button */}
          <Link to="/update-profile" className="btn w-100 mt-3" style={{ backgroundColor: "#A9A9A9", color: "white", border: "none", borderRadius: '10px', padding: '10px', transition: "transform 0.3s ease-in-out" }}>
            Update Profile
          </Link>

          {/* Go to Login Button */}
          <Button className="w-100 mt-3" onClick={handleRedirectToLogin} style={{ backgroundColor: "#A9A9A9", color: "white", border: "none", borderRadius: '10px', padding: '10px', transition: "transform 0.3s ease-in-out" }}>
            Go to Login
          </Button>
        </Card.Body>
      </Card>
    </Center>
  );
}
