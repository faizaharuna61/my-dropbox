import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthenticate } from "../Context";
import { FaUserEdit, FaSignOutAlt, FaDropbox } from "react-icons/fa";

export default function NavbarComponent() {
  const { logout } = useAuthenticate();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Navbar expand="sm" className="d-flex justify-content-between" style={{ backgroundColor: "#6c757d" }}> {/* Navbar with grey background */}
      <Nav>
        <Nav.Link
          as={Link}
          to="/user"
          className="d-flex align-items-center"
          style={{ backgroundColor: "#5a6268", color: "white", padding: "0.375rem 0.75rem", borderRadius: "4px" }} // Same styling as Logout button
        >
          <span style={{ position: "relative", display: "inline-block" }}>
            <FaUserEdit className="me-2" />
            <span
              style={{
                visibility: "hidden",
                position: "absolute",
                bottom: "100%",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                color: "black",
                padding: "5px",
                borderRadius: "4px",
                whiteSpace: "nowrap",
              }}
            >
              Edit Profile
            </span>
          </span>
          Edit Profile
        </Nav.Link>
        <Button
          onClick={handleLogout}
          className="p-2 d-flex align-items-center"
          style={{ backgroundColor: "#5a6268", color: "white", borderRadius: "4px" }} // Same styling for the button
        >
          <span style={{ position: "relative", display: "inline-block" }}>
            <FaSignOutAlt className="me-2" />
            <span
              style={{
                visibility: "hidden",
                position: "absolute",
                bottom: "100%",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                color: "black",
                padding: "5px",
                borderRadius: "4px",
                whiteSpace: "nowrap",
              }}
            >
              Logout
            </span>
          </span>
          Logout
        </Button>
      </Nav>
      <Navbar.Brand as={Link} to="/" className="text-white d-flex align-items-center"> {/* White text for contrast */}
        <span style={{ position: "relative", display: "inline-block" }}>
          <FaDropbox className="me-3" />
          <span
            style={{
              visibility: "hidden",
              position: "absolute",
              bottom: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              color: "black",
              padding: "5px",
              borderRadius: "4px",
              whiteSpace: "nowrap",
            }}
          >
            My Dropbox
          </span>
        </span>
        My Dropbox
      </Navbar.Brand>
    </Navbar>
  );
}
