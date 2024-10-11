import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();

    const handleNaviagteSubmission = () =>{
        navigate("/submissionPage");
    }
    return (
        <>
            <div>
                BITS Design 3D Model Repository
            </div>
            <br></br>
            <div>
                <button onClick={handleNaviagteSubmission}>Submit the </button>
                <br/>
                <br/>
                <button>View Models</button>
            </div>
        </>
    )
}

export default HomePage