import React, { useEffect, useState } from "react";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const GalleryPage = () => {
  const [modelFiles, setModelFiles] = useState([]);
  const navigate = useNavigate();

  // Recursive function to list files in all subdirectories
  const listFilesInFolder = async (folderRef) => {
    const fileList = [];
    
    const res = await listAll(folderRef);
    
    for (const folder of res.prefixes) {
      // Recursively list files in subfolders
      const subfolderFiles = await listFilesInFolder(folder);
      fileList.push(...subfolderFiles);
    }
    
    for (const file of res.items) {
      // Get download URL for each file
      const url = await getDownloadURL(file);
      fileList.push({
        name: file.name,
        url,
      });
      console.log(url);
    }

    return fileList;
  };

  useEffect(() => {
    const listAllModels = async () => {
      try {
        const rootFolderRef = ref(storage, 'models/'); // Root folder for all users
        const allFiles = await listFilesInFolder(rootFolderRef);
        setModelFiles(allFiles);
      } catch (error) {
        console.error("Error listing files:", error);
      }
    };

    listAllModels();
  }, []);

  const handleModelClick = (url) => {
    // Navigate to the 3D viewer page with the model URL
    navigate("/viewer", { state: { modelUrl: url } });
  };

  return (
    <div className="galleryPage">
      <h2>Model Gallery</h2>
      <div className="galleryGrid">
        {modelFiles.length === 0 ? (
          <p>No models found</p>
        ) : (
          modelFiles.map((file) => (
            <div key={file.name} className="galleryItem" onClick={() => handleModelClick(file.url)}>
              <img src="/icons/3d-file-icon.png" alt={file.name} /> {/* Display file icons */}
              <p>{file.name}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GalleryPage;
