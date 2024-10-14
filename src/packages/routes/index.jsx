import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutPage from "../AboutPage";
import NavBar from "../NavBar";
import LoginSignupPage from "../LoginSignupPage";
import ProfilePage from "../ProfilePage";
import { useSelector } from "react-redux";

function RoutesHOC() {
  const user = useSelector((state) => state.userData);
  return (
    <BrowserRouter>
      <NavBar user = {user.uid}/>
      <Routes>
        <Route exact path="/about" element={<AboutPage />} />
        <Route exact path="/login" element={<LoginSignupPage/>} />
        <Route exact path="/profile" element={<ProfilePage email = {user.email} />} />
        <Route exact path="/" element={<AboutPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesHOC;
