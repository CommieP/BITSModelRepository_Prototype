import { useSelector, useDispatch } from 'react-redux';
import { setFirstName, setLastName, setFile, clearFormData } from '../store/reducers/formReducer'; // Import the actions
import { useNavigate } from 'react-router-dom';

const SubmissionPage = () => {
    const formData = useSelector(state => state.formData); // Access the form data from the store
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleFirstNameChange = (e) => {
        dispatch(setFirstName(e.target.value));
    };

    const handleLastNameChange = (e) => {
        dispatch(setLastName(e.target.value));
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform your submission logic here (e.g., send data to an API)
        console.log("Form submitted:", formData);

        // Clear the store after submission
        dispatch(clearFormData());
    };

    const handlePreview = () => {
        navigate("/previewCanvas");
        console.log("Preview the model:", formData.file);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        value={formData.firstName}
                        onChange={handleFirstNameChange}
                        required
                    />
                </div>
                <br></br>
                <br></br>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        value={formData.lastName}
                        onChange={handleLastNameChange}
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
