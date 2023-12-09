import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

// Import React Components
import App from "./views/App"; // Adjust the import path as needed
import NavBar from "./components/Nav"; // Adjust the import path as needed
import Footer from "./components/Footer"; // Adjust the import path as needed

// Stylesheets
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.scss";

const Main = () => {
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
    <React.StrictMode>
      <Router>
        <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <App darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Footer darkMode={darkMode} />
      </Router>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Main />);
