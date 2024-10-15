import { useSelector, useDispatch } from 'react-redux';
import { setTitle, clearFormData } from '../store/reducers/formReducer'; // Import the actions
import { useNavigate } from 'react-router-dom';
import { storage } from '../firebaseConfig';
import { ref, uploadBytes } from 'firebase/storage';
import { useState } from 'react';

const SubmissionPage = ({ user }) => {
    const formData = useSelector(state => state.formData); // Access the form data from the store
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Local state to store the actual file
    const [file, setFile] = useState(null);

    const handleTitleChange = (e) => {
        dispatch(setTitle(e.target.value));
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile && (selectedFile.name.endsWith(".gltf") || selectedFile.name.endsWith(".glb"))) {
            // Store the actual file object in the state
            setFile(selectedFile);
        } else {
            alert("Only GLTF or GLB files are allowed");
            setFile(null); // Clear the file in state if it's invalid
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (file) {
                const fileRef = ref(storage, `models/${user.uid}/${formData.title}`); // Reference to Firebase storage

                const metadata = {
                    contentType: file.type, // Get the content type from the file itself
                };

                const snapshot = await uploadBytes(fileRef, file, metadata); // Upload the file object
                console.log("File uploaded successfully:", snapshot);

                dispatch(clearFormData()); // Clear form data in the store
                setFile(null); // Clear local file state
            } else {
                console.error("No file selected for upload.");
            }
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    const handlePreview = () => {
        navigate("/previewCanvas");
        console.log("Preview the model:", file);
    };

    return (
        <div className='page'>
            <form onSubmit={handleSubmit} className='submissionCont'>
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={handleTitleChange}
                        required
                    />
                </div>
                <br></br>
                <br></br>
                <div>
                    <label>Upload 3D Model (GLTF/GLB):</label>
                    <input type="file" accept=".gltf,.glb" onChange={handleFileChange} />
                </div>
                <br></br>
                <br></br>
                <div>
                    <button type="submit">Submit</button>
                    <button
                        type="button"
                        onClick={handlePreview}
                        disabled={!file} // Disable if no valid file is uploaded
                    >
                        Preview
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SubmissionPage;
