import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import FeaturesPage from "./FeaturesPage";
import ContactPage from "./ContactPage";
import TestPage from "./TestPurposes";
import NotFoundPage from "./NotFoundPage"; // A 404 page or similar

interface AppProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const App: React.FC<AppProps> = ({ darkMode }) => {
  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      <Routes>
        <Route path="/home" element={<HomePage darkMode={darkMode} />} />
        <Route
          path="/features"
          element={<FeaturesPage darkMode={darkMode} />}
        />
        <Route path="/contact" element={<ContactPage darkMode={darkMode} />} />
        <Route path="/test" element={<TestPage darkMode={darkMode} />} />
        <Route path="*" element={<NotFoundPage darkMode={darkMode} />} />
      </Routes>
    </div>
  );
};

export default App;
