import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import FeaturesPage from "./FeaturesPage";
import ContactPage from "./ContactPage";
import TestPage from "./TestPurposes";
import NotFoundPage from "./NotFoundPage";

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
