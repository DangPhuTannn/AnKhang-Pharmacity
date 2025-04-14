import { Route, Routes } from "react-router-dom";
import InitialPage from "./InitialPage";
import NavigatingNextAndBack from "./NavigatingNextAndBack";
import DetailPage from "./DetailPage";
import { BrowserRouter as Router } from "react-router-dom";
export default function CSE483() {
  return (
    <Router>
      <NavigatingNextAndBack>
        <Routes>
          <Route path="/" element={<InitialPage />} />
          <Route path="/:pageURL" element={<DetailPage />} />
        </Routes>
      </NavigatingNextAndBack>
    </Router>
  );
}
