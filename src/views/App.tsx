import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import ApplicationPage from "./ApplicationPage";
import NotFoundPage from "./404Page";
import RulesPage from "./RulePage";
import DiscordRedirect from "./DiscordRedict";

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/regler" element={<RulesPage />} />
        <Route path="/discord" element={<DiscordRedirect />} />
        <Route path="/ansøg" element={<ApplicationPage />} />
        {/* 404 FEJL */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;
