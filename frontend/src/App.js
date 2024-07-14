import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPAge from "./pages/LandingPAge";
import Recommendation from "./components/recommendation/Recommendation";
import RecommendationPage from "./pages/RecommendationPage";
import Visualize from "./pages/Visualize";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPAge />} />
        <Route path="/recommendation" element={<RecommendationPage />} />
        <Route path="/visualization" element={<Visualize />} />
        {/* <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
