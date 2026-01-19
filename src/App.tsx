import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import BuilderPage from "./pages/BuilderPage";
import SubmissionPage from "./pages/SubmissionPage";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BuilderPage />} />
        <Route path="/submission" element={<SubmissionPage />} />
        <Route
          path="*"
          element={
            <div className="flex h-screen justify-center items-center text-destructive flex-col gap-5">
              <span>404 - Page Not Found</span>

              <Link to={"/"} className="text-primary">
                Go back to home page
              </Link>
            </div>
          }
        />
      </Routes>
      <Toaster position="top-center" richColors theme="light" />
    </BrowserRouter>
  );
}
