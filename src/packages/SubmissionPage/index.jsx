import { useSelector, useDispatch } from 'react-redux';
import { setTitle, setFile, clearFormData } from '../store/reducers/formReducer'; // Import the actions
import { useNavigate } from 'react-router-dom';
import { storage } from '../firebaseConfig';
import { ref, uploadBytes } from 'firebase/storage';

const SubmissionPage = ({ user }) => {
    const formData = useSelector(state => state.formData); // Access the form data from the store
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleTitleChange = (e) => {
        dispatch(setTitle(e.target.value));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file && (file.name.endsWith(".gltf") || file.name.endsWith(".glb"))) {
            // Create a URL for the file
            const fileUrl = URL.createObjectURL(file);

            // Dispatch the file URL to the store instead of the file itself
            dispatch(setFile(fileUrl));
        } else {
            alert("Only GLTF or GLB files are allowed");
            // Clear the file in the store if it's invalid
            dispatch(setFile(null));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.file) {
                const fileRef = ref(storage, `models/${user.uid}/${formData.title}`); // Reference to Firebase storage

                // Upload the file to Firebase storage
                const snapshot = await uploadBytes(fileRef, formData.file);
                console.log("File uploaded successfully:", snapshot);

                dispatch(clearFormData());
            } else {

            }
        } catch {

        }

    };

    const handlePreview = () => {
        navigate("/previewCanvas");
        console.log("Preview the model:", formData.file);
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
                        disabled={!formData.file} // Disable if no valid file is uploaded
                    >
                        Preview
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SubmissionPage;
