import React, { useState } from "react";
import { Navbar, Nav, Container, Button, Offcanvas } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import brandImage from "../assets/logo.png";

interface MyNavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const MyNavbar: React.FC<MyNavbarProps> = ({ darkMode, toggleDarkMode }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Navbar
      bg={darkMode ? "dark" : "light"}
      variant={darkMode ? "dark" : "light"}
      expand={false}
    >
      <Container>
        <Navbar.Brand href="#home" className="navbar-brand-custom">
          <img
            alt=""
            src={brandImage}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Noah Task Manager
        </Navbar.Brand>
        <Button
          onClick={toggleDarkMode}
          variant={darkMode ? "light" : "secondary"}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </Button>
        <Navbar.Toggle onClick={handleShow} aria-controls="offcanvasNavbar" />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
          show={show}
          onHide={handleClose}
          className={darkMode ? "bg-dark text-white" : "bg-light"}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              Find Hvad Du Vil
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <LinkContainer to="/home">
                <Nav.Link>Hjem</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/features">
                <Nav.Link>Funktioner</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/contact">
                <Nav.Link>Kontakt</Nav.Link>
              </LinkContainer>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
