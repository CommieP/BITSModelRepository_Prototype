import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutPage from "../AboutPage";
import NavBar from "../NavBar";
import LoginSignupPage from "../LoginSignupPage";

function RoutesHOC() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route exact path="/about" element={<AboutPage />} />
        <Route exact path="/login" element={<LoginSignupPage/>} />
        
        <Route exact path="/" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesHOC;
