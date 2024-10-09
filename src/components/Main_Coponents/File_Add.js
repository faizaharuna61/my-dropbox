import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useAuthenticate } from "../../Context";
import { storage, db } from "../../firebaseConfig"; 
import { ROOT_FOLDER } from "../../CustomHook"; 
import { v4 as uuidV4 } from "uuid";
import { ProgressBar, Toast } from "react-bootstrap";

export default function FileUploader({ currentFolder }) {
  const [activeUploads, setActiveUploads] = useState([]);
  const { currentUser } = useAuthenticate(); 

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (!currentFolder || !selectedFile) return;

    const baseFileName = selectedFile.name.substring(0, selectedFile.name.lastIndexOf(".")) || selectedFile.name;
    const fileExtension = selectedFile.name.substring(selectedFile.name.lastIndexOf(".")) || "";

    const uniqueId = uuidV4();
    setActiveUploads((previousUploads) => [
      ...previousUploads,
      { id: uniqueId, name: selectedFile.name, progress: 0, hasError: false },
    ]);

    // Check for duplicates and assign versioning if needed
    checkForDuplicateAndUpload(baseFileName, fileExtension, selectedFile, uniqueId);
  };

  const checkForDuplicateAndUpload = async (baseFileName, fileExtension, selectedFile, uniqueId) => {
    let version = 0;
    let fileNameToUpload = baseFileName + fileExtension;

    const folderFiles = await db.files
      .where("folderId", "==", currentFolder.id) 
      .where("userId", "==", currentUser.uid) 
      .get();

    
    folderFiles.forEach((doc) => {
      const existingFile = doc.data().name;
      if (existingFile === fileNameToUpload) {
        version += 1;
        fileNameToUpload = `${baseFileName} (${version})${fileExtension}`;
      }
    });

    const fileLocation =
      currentFolder === ROOT_FOLDER
        ? `${currentFolder.path.join("/")}/${fileNameToUpload}`
        : `${currentFolder.path.join("/")}/${currentFolder.name}/${fileNameToUpload}`;

    const uploadTask = storage
      .ref(`/files/${currentUser.uid}/${fileLocation}`) 
      .put(selectedFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress = snapshot.bytesTransferred / snapshot.totalBytes;
        setActiveUploads((previousUploads) =>
          previousUploads.map((file) =>
            file.id === uniqueId ? { ...file, progress: uploadProgress } : file
          )
        );
      },
      () => {
        setActiveUploads((previousUploads) =>
          previousUploads.map((file) =>
            file.id === uniqueId ? { ...file, hasError: true } : file
          )
        );
      },
      () => {
        setActiveUploads((previousUploads) =>
          previousUploads.filter((file) => file.id !== uniqueId)
        );

        uploadTask.snapshot.ref.getDownloadURL().then((downloadUrl) => {
          db.files.add({
            url: downloadUrl,
            name: fileNameToUpload, 
            createdAt: db.getCurrentTimestamp(),
            folderId: currentFolder.id, 
            userId: currentUser.uid, 
          });
        });
      }
    );
  };

  return (
    <>
      <label
        className="btn btn-lg m-3 text-white"
        style={{ backgroundColor: "#5a6268", borderRadius: "4px" }} 
      >
        Add file
        <input
          type="file"
          onChange={handleFileUpload}
          style={{ display: "none" }}
        />
      </label>
      {activeUploads.length > 0 &&
        ReactDOM.createPortal(
          <div
            style={{
              position: "fixed",
              bottom: "1rem",
              right: "1rem",
              maxWidth: "300px",
              display: "flex", 
              flexDirection: "column", 
              gap: "0.5rem", 
            }}
          >
            {activeUploads.map((file) => (
              <Toast
                key={file.id}
                onClose={() =>
                  setActiveUploads((previousUploads) =>
                    previousUploads.filter(
                      (uploadingFile) => uploadingFile.id !== file.id
                    )
                  )
                }
                style={{ marginBottom: "0.5rem" }} 
              >
                <Toast.Header closeButton={file.hasError}>
                  {file.name}
                </Toast.Header>
                <Toast.Body>
                  <ProgressBar
                    animated={!file.hasError}
                    variant={file.hasError ? "danger" : "info"}
                    now={file.hasError ? 100 : file.progress * 100}
                    label={
                      file.hasError
                        ? "Error"
                        : `${Math.round(file.progress * 100)}%`
                    }
                  />
                </Toast.Body>
              </Toast>
            ))}
          </div>,
          document.body
        )}
    </>
  );
}
