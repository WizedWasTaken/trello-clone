import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

// Import React Components
import App from "./views/App"; // Adjust the import path as needed
import NavBar from "./components/Nav"; // Adjust the import path as needed
import Footer from "./components/Footer"; // Adjust the import path as needed

// Stylesheets
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/index.scss";

// eslint-disable-next-line react-refresh/only-export-components
const Main = () => {
  return (
    <React.StrictMode>
      <Router>
        <NavBar />
        <App />
        <Footer />
      </Router>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<Main />);
