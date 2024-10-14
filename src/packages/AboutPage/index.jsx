import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
    const navigate = useNavigate();

    const handleNaviagteSubmission = () => {
        navigate("/submissionPage");
    }
    return (
        <div className="page">
            <div className="pageTitle">
                BITS Design 3D Model Repository
            </div>
            <br></br>
            <div className="aboutButtonCont">
                <button className = "aboutButton" onClick={handleNaviagteSubmission}>Submit New Model</button>
                <br />
                <br />
                <button className = "aboutButton">View Models</button>
            </div>
        </div>
    )
}

export default AboutPage;