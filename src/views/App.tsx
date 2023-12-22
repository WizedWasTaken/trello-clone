import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import ContactPage from "./ContactPage";
import NotFoundPage from "./404Page";
import RulesPage from "./RulePage";
import Test from "./Test";
import DiscordRedirect from "./DiscordRedict";

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/kontakt" element={<ContactPage />} />
        <Route path="/regler" element={<RulesPage />} />
        <Route path="/test" element={<Test />} />
        <Route path="/discord" element={<DiscordRedirect />} />
        {/* 404 FEJL */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
