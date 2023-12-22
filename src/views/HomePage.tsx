import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

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
  }, []);

  return (
    <Container fluid className="text-center homepage-container">
      <Row className="my-5">
        <Col>
          <h1 className="display-2">LotusRP</h1>
          <h4 className="display-7 mb-5">
            Din vej til <b>{displayedText}</b> RP oplevelser
          </h4>
          <Button variant="success" size="lg">
            Tilslut dig
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
