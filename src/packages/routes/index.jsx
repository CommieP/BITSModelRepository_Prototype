import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../HomePage"

function RoutesHOC() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" Component={HomePage} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesHOC;
