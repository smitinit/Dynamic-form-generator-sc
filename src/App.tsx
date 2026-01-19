import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import BuilderPage from "./pages/BuilderPage";
import SubmissionPage from "./pages/SubmissionPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BuilderPage />} />
        <Route path="/submission" element={<SubmissionPage />} />
        <Route
          path="*"
          element={
            <div>
              404 - Page Not Found
              <br />
              <Link to={"/"}>Go back to home page</Link>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
