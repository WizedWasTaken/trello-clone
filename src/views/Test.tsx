import React, { useState, useEffect } from "react";
import NavBar from "../components/Nav";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
  }, []);

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", String(!darkMode));
  };

  return (
    <div>
      <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  );
};

export default App;
