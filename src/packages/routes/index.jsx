import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../HomePage"
import SubmissionPage from "../SubmissionPage";
import PreviewCanvas from "../PreviewCanvas";

function RoutesHOC() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" Component={HomePage} />
        <Route exact path="/submissionPage" Component={SubmissionPage} />
        <Route exact path="/previewCanvas" Component={PreviewCanvas} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesHOC;
