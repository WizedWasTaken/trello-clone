import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

// Changelog & Nyheder import
import ChangeLog from "../components/ChangeLog";
import Nyheder from "../components/Nyheder";

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
  const [showLotusRPColumn, setShowLotusRPColumn] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    let interval: NodeJS.Timeout;

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

  const connectToFiveMServer = () => {
    alert("VIRKER IKKE");
    const fivemLink = `fivem://connect/IP IKKE SAT IND`;

    window.open(fivemLink);
  };

  const toggleLotusRPColumn = () => {
    setShowLotusRPColumn((prevShowLotusRPColumn) => !prevShowLotusRPColumn);
  };

  const getChangeLogColSpan = () => {
    return showLotusRPColumn ? 4 : 12;
  };

  // Inline styles
  const buttonContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  };

  const buttonStyle: React.CSSProperties = {
    width: "60%",
  };

  return (
    <Container fluid className="text-center homepage-container">
      <Row className="my-5">
        <Col
          xs={{ span: 12, order: 3 }}
          md={{ span: getChangeLogColSpan(), order: 3 }}
          className="mb-3 mt-3 box"
        >
          <div style={buttonContainerStyle}>
            <Button
              variant="secondary"
              onClick={toggleLotusRPColumn}
              style={buttonStyle}
            >
              {showLotusRPColumn ? "Større Changelog" : "Mindre Changelog"}
            </Button>
          </div>
          <ChangeLog />
        </Col>
        {showLotusRPColumn && (
          <Col
            xs={{ span: 12, order: 2 }}
            md={{ span: 4, order: 1 }}
            className="mb-3 mt-3"
          >
            <Nyheder />
          </Col>
        )}
        {showLotusRPColumn && (
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
                  window.open("https://discord.gg/lotusrp", "_blank")
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
        )}
      </Row>
    </Container>
  );
};

export default HomePage;
