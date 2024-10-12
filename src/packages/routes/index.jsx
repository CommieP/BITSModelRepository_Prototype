import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutPage from "../AboutPage";
import NavBar from "../NavBar";

function RoutesHOC() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        {/* Correct the path to "/about" */}
        <Route exact path="/about" element={<AboutPage />} />
        {/* Default route */}
        <Route exact path="/" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesHOC;
