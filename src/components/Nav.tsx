import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Form, Offcanvas } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import brandImage from "../assets/logo.png";
import flashbangMp3Fil from "./../assets/flashbang.mp3";

import "../styles/Nav.scss";

const audio = new Audio(flashbangMp3Fil);

const MyNavbar: React.FC = () => {
  const [show, setShow] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleNavLinkClick = () => handleClose();

  const toggleDarkMode = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    document.documentElement.setAttribute("data-bs-theme", newTheme);
    localStorage.setItem("darkMode", newTheme);
    setIsDarkMode(!isDarkMode);

    // Flashbang lyd ved skift til lightmode.
    // if (newTheme === "light") {
    //   audio.play();
    // } else {
    audio.pause();
    //   audio.currentTime = 0;
    // }
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("darkMode") || "light";
    document.documentElement.setAttribute("data-bs-theme", storedTheme);
    setIsDarkMode(storedTheme === "dark");
  }, []);

  return (
    <Navbar expand={false}>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="navbar-brand-custom">
            <img
              alt="Brand Logo"
              src={brandImage}
              width="30"
              height="30"
              className=""
            />{" "}
            Lotus RP
          </Navbar.Brand>
        </LinkContainer>
        <Form>
          <Form.Check
            type="switch"
            id="custom-switch"
            // label={isDarkMode ? "Dark Mode" : "FLASHBANG!!!"}
            label={isDarkMode ? "Dark Mode" : "Light Mode"}
            checked={isDarkMode}
            onChange={toggleDarkMode}
          />
        </Form>
        <Navbar.Toggle onClick={handleShow} aria-controls="offcanvasNavbar" />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
          show={show}
          onHide={handleClose}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <div onClick={handleNavLinkClick}>
                <LinkContainer to="/">
                  <Nav.Link>Hjem</Nav.Link>
                </LinkContainer>
              </div>
              <div onClick={handleNavLinkClick}>
                <LinkContainer to="/contact">
                  <Nav.Link>Kontakt</Nav.Link>
                </LinkContainer>
              </div>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
