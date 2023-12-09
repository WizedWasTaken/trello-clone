import React from "react";
import { Container, Row, Col } from "react-bootstrap";

interface HomePageProps {
  darkMode: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ darkMode }) => {
  const textColorClass = darkMode ? "text-light" : "text-dark";

  return (
    <Container fluid className={darkMode ? "bg-dark" : "bg-light"}>
      <Row className="my-5">
        <Col>
          <h1 className={`text-center ${textColorClass}`}>
            Velkommen til Noah Task Manager
          </h1>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col className={`text-center ${textColorClass}`}>
          <p>
            Hjemmelavet wannabe Trello, til styring af diverse projekter,
            opgaver og meget mere.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
