import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

// Import React Components
import App from "./views/App";
import NavBar from "./components/Nav";
import Footer from "./components/Footer";

// Stylesheets
import "bootstrap/dist/css/bootstrap.min.css";

const Main = () => {
  return (
    <Router basename="/lotusrp">
      <NavBar />
      <App />
      <Footer />
    </Router>
  );
};

const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error("Root element not found!");
} else {
  ReactDOM.createRoot(rootElement).render(<Main />);
}

export default Main;
