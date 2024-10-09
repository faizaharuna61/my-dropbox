import { faFile, faTrash, faShareSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Modal, Button, Toast, OverlayTrigger, Tooltip } from "react-bootstrap";
import './File.css'; 

export default function File({ file, onDelete }) {
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [zoomOut, setZoomOut] = useState(false);
  const [linkExpired, setLinkExpired] = useState(false);
  const [expirationMessage, setExpirationMessage] = useState(""); 

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleDelete = () => {
    setZoomOut(true); 
    setTimeout(() => {
      onDelete(file.id);
      setZoomOut(false); 
    }, 300); 
  };

  const handleShare = () => {
    if (linkExpired) {
      
      alert("The link has expired. Please refresh the page to get a new link.");
      return;
    }
    
    navigator.clipboard.writeText(file.url).then(() => {
      setShowToast(true);
      setExpirationMessage("File URL copied to clipboard! This link will expire in 1 minute."); 
      setTimeout(() => setShowToast(false), 3000);
      
      
      setLinkExpired(true);
      setTimeout(() => {
        setLinkExpired(false); 
        setExpirationMessage(""); 
      }, 60000); 
    });
  };

  return (
    <>
      <div className="file-container border p-4 mb-4 shadow-lg mx-2 border-lg w-auto">
        <div className="d-flex justify-content-between align-items-center">
          <button
            onClick={handleShow}
            className={`btn btn-outline-primary text-truncate flex-grow-1 file-button ${zoomOut ? "zoom-out" : ""}`}
            style={{
              cursor: "pointer",
              backgroundColor: "#505050", 
              color: "white",
              border: "none",
              borderRadius: "5px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              padding: "10px",
              transition: "transform 0.3s ease-in-out", 
            }}
          >
            <FontAwesomeIcon icon={faFile} className="mr-2" />
            {file.name}
          </button>

          <div className="button-group">
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id={`tooltip-preview`}>Preview</Tooltip>}
            >
              <button
                className={`btn btn-outline-info ${zoomOut ? "zoom-out" : ""}`}
                onClick={handleShow}
                style={{
                  backgroundColor: "#505050", 
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  padding: "10px",
                  transition: "transform 0.3s ease-in-out", 
                }}
              >
                <FontAwesomeIcon icon={faFile} />
              </button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id={`tooltip-share`}>Share</Tooltip>}
            >
              <button
                className={`btn btn-outline-success ${zoomOut ? "zoom-out" : ""}`}
                onClick={handleShare}
                style={{
                  backgroundColor: "#505050", 
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  padding: "10px",
                  transition: "transform 0.3s ease-in-out", 
                }}
              >
                <FontAwesomeIcon icon={faShareSquare} />
              </button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id={`tooltip-delete`}>Delete</Tooltip>}
            >
              <button
                className={`btn btn-outline-danger ${zoomOut ? "zoom-out" : ""}`}
                onClick={handleDelete}
                style={{
                  backgroundColor: "#505050", // Consistent styling
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  padding: "10px",
                  transition: "transform 0.3s ease-in-out", 
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </OverlayTrigger>
          </div>
        </div>
      </div>

      {/* Modal for file preview */}
      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{file.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe
            src={file.url}
            title={file.name}
            style={{ width: "100%", height: "500px", border: "none" }}
            allowFullScreen
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={handleDelete}
            style={{
              backgroundColor: "#505050", 
              color: "white",
              border: "none",
              borderRadius: "5px",
              padding: "10px",
              transition: "transform 0.3s ease-in-out", 
            }}
          >
            <FontAwesomeIcon icon={faTrash} className="mr-2" />
            Delete
          </Button>
          <Button
            variant="secondary"
            onClick={handleClose}
            style={{
              backgroundColor: "#505050", 
              color: "white",
              border: "none",
              borderRadius: "5px",
              padding: "10px",
              transition: "transform 0.3s ease-in-out", 
            }}
          >
            Close
          </Button>
          <Button
            variant="success"
            onClick={handleShare}
            style={{
              backgroundColor: "#505050", 
              color: "white",
              border: "none",
              borderRadius: "5px",
              padding: "10px",
              transition: "transform 0.3s ease-in-out", 
            }}
          >
            <FontAwesomeIcon icon={faShareSquare} className="mr-2" />
            Share
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast notification for sharing */}
      <Toast
        style={{
          position: "absolute",
          top: 60,
          left: 80,
          backgroundColor: "green",
          color: "white",
        }}
        show={showToast}
        onClose={() => setShowToast(false)}
      >
        <Toast.Body>{expirationMessage}</Toast.Body> {/* Updated message */}
      </Toast>
    </>
  );
}





