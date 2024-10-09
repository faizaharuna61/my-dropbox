import React from "react";
import { Container, Spinner, Alert } from "react-bootstrap";
import { useCustomHook } from "../../CustomHook";
import AddFolderButton from "./Add_Folder";
import FileUploader from "./File_Add";
import Folder from "./Folder";
import File from "./File";
import Navbar from "../Navbar";
import FolderBreadcrumbs from "./FolderBreadcrumbs";
import { useParams, useLocation } from "react-router-dom";
import { db } from "../../firebaseConfig"; 

function Home() {
  const { folderId } = useParams();
  const { state = {} } = useLocation();

  const { folder, childFolders, childFiles, isLoading, error } = useCustomHook(folderId, state.folder);

  const handleDeleteFile = (fileId) => {
    db.files.doc(fileId).delete().then(() => {
      console.log("File deleted successfully!");
    }).catch((error) => {
      console.error("Error deleting file: ", error);
    });
  };

  if (isLoading) {
    return (
      <>
        <Navbar />
        <Container fluid className="text-center mt-5">
          <Spinner animation="border" variant="primary" />
        </Container>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <Container fluid className="text-center mt-5">
          <Alert variant="danger">Failed to load folders and files: {error.message}</Alert>
        </Container>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Container fluid>
        <div className="d-flex align-items-center mb-3">
          <FolderBreadcrumbs currentFolder={folder} />
          <FileUploader currentFolder={folder} />
          <AddFolderButton currentFolder={folder} />
        </div>

        {childFolders.length > 0 && (
          <div className="d-flex flex-wrap">
            {childFolders.map(childFolder => (
              <div key={childFolder.id} style={{ maxWidth: "150px" }} className="p-2">
                <Folder folder={childFolder} />
              </div>
            ))}
          </div>
        )}

        {childFolders.length > 0 && childFiles.length > 0 && <hr />}

        {childFiles.length > 0 ? (
          <div className="d-flex flex-wrap">
            {childFiles.map(childFile => (
              <div key={childFile.id} style={{ width: "auto" }} className="p-2">
                <File file={childFile} onDelete={handleDeleteFile} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-4">
            <p>No files found in this folder.</p>
          </div>
        )}
      </Container>
    </>
  );
}

export default Home;
