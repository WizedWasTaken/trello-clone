/**
 * Represents the home page component.
 *
 * This component displays a homepage with a typewriter effect and buttons to connect to a server and Discord.
 *
 * @returns The rendered home page component.
 */
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import ChangeLog from "../components/ChangeLog";
import Nyheder from "../components/Nyheder";

/**
 * Functional component for the home page.
 */
const HomePage: React.FC = () => {
  const messages = [
    "sjove",
    "spændende",
    "fantastiske",
    "episke",
    "kreative",
    "forbløffende",
    "unikke",
    "intense",
    "uventede",
  ];

  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    let interval: NodeJS.Timeout;

    /**
     * Function to create typewriter effect.
     */
    const typewriterEffect = () => {
      const message = messages[currentIndex];
      let currentCharIndex = 0;

      interval = setInterval(() => {
        setDisplayedText((prevText) => {
          const currentChar = message[currentCharIndex];
          currentCharIndex++;

          if (currentCharIndex >= message.length) {
            clearInterval(interval);
            setTimeout(() => {
              const deleteInterval = setInterval(() => {
                setDisplayedText((prevText) => {
                  const newText = prevText.slice(0, -1);
                  if (newText === "") {
                    clearInterval(deleteInterval);
                    currentIndex = (currentIndex + 1) % messages.length;
                    setTimeout(typewriterEffect, 1000);
                  }
                  return newText;
                });
              }, 250);
            }, 3000);
          }

          return prevText + currentChar;
        });
      }, 200);
    };

    typewriterEffect();

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Connects to the FiveM server by opening a FiveM link in a new window.
   */
  const connectToFiveMServer = () => {
    const fivemLink = `fivem://connect/lotusrp.dk`;

    window.open(fivemLink);
  };

  /**
   * CSS properties for the button container.
   */
  const buttonContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  };

  /**
   * CSS properties for the button.
   */
  const buttonStyle: React.CSSProperties = {
    width: "60%",
  };

  /**
   * Renders the home page component.
   *
   * @returns The rendered home page component.
   */
  return (
    <Container fluid className="text-center homepage-container">
      <Row className="my-5">
        <Col
          xs={{ span: 12, order: 2 }}
          md={{ span: 4, order: 3 }}
          className="mb-3 mt-3 box"
        >
          <ChangeLog />
        </Col>
        <Col
          xs={{ span: 12, order: 3 }}
          md={{ span: 4, order: 1 }}
          className="mb-3 mt-3"
        >
          <Nyheder />
        </Col>
        <Col
          xs={{ span: 12, order: 1 }}
          md={{ span: 4, order: 2 }}
          className="mb-3 mt-3"
        >
          <h1 className="display-2">LotusRP</h1>
          <h4 className="display-7 mb-5">
            Din vej til <b>{displayedText}</b> RP oplevelser
          </h4>
          <div style={buttonContainerStyle}>
            <Button
              variant="success"
              style={{ ...buttonStyle, marginBottom: "1rem" }}
              onClick={() =>
                window.open("https://discord.gg/ejDJHkytAR", "_blank")
              }
            >
              Tilslut Discorden
            </Button>
            <Button
              variant="success"
              onClick={connectToFiveMServer}
              style={buttonStyle}
            >
              Tilslut Serveren
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
