import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { db } from "../../firebaseConfig";
import { useAuthenticate } from "../../Context";
import { ROOT_FOLDER } from "../../CustomHook";

export default function AddFolderButton({ currentFolder }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const { currentUser } = useAuthenticate();

  function openModal() {
    setOpen(true);
  }
  function closeModal() {
    setOpen(false);
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (currentFolder == null) return;
    const path = [...currentFolder.path];
    if (currentFolder !== ROOT_FOLDER) {
      path.push({ name: currentFolder.name, id: currentFolder.id });
    }
    db.folders.add({
      name: name,
      parentId: currentFolder.id,
      userId: currentUser.uid,
      path: path,
      createdAt: db.getCurrentTimestamp(),
    });
    setName("");
    closeModal();
  }

  return (
    <>
      <Button
        onClick={openModal}
        style={{
          backgroundColor: "#505050", 
          color: "white", 
          border: "none",
          fontSize: 20,
          borderRadius: "5px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          transition: "0.3s",
        }}
        className="btn-lg m-3"
      >
        Add a New Folder
      </Button>
      <Modal show={open} onHide={closeModal} centered>
        <Modal.Dialog
          style={{ borderRadius: "10px", boxShadow: "0 0 15px rgba(0,0,0,0.3)" }}
        >
          <Modal.Body style={{ backgroundColor: "#f8f9fa", padding: "20px" }}>
            <h5 className="text-center" style={{ color: "#505050", marginBottom: "1rem" }}>
              Add a New Folder
            </h5>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label style={{ color: "#505050" }}>Folder Name</Form.Label> {/* Updated color */}
                <Form.Control
                  type="text"
                  className="bg-light text-dark border rounded"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    borderRadius: "5px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    borderColor: "#505050", 
                  }}
                />
                {/* Custom CSS to override the blue border on focus */}
                <style>
                  {`
                    .form-control:focus {
                      border-color: #505050 !important;
                      box-shadow: none !important;
                    }
                    /* Ensure that the modal buttons are styled properly */
                    .modal-footer .btn {
                      background-color: #505050 !important;
                      border-color: #505050 !important;
                      color: white !important;
                    }
                    .modal-footer .btn:focus,
                    .modal-footer .btn:hover {
                      background-color: #505050 !important;
                      border-color: #505050 !important;
                      color: white !important;
                    }
                  `}
                </style>
              </Form.Group>
              <Modal.Footer style={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  className="col-5"
                  variant="outline-secondary"
                  onClick={closeModal}
                  style={{
                    backgroundColor: "transparent",
                    borderColor: "#505050", 
                    color: "#505050", 
                    borderRadius: "5px",
                    padding: "10px",
                    transition: "0.3s",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="col-5"
                  type="submit"
                  style={{
                    backgroundColor: "#505050", 
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    padding: "10px",
                    transition: "0.3s",
                  }}
                >
                  Create Folder
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal.Dialog>
      </Modal>
    </>
  );
}


