import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  // Function to navigate back to the home page
  const handleGoHome = () => {
    navigate("/home");
  };

  return (
    <Container className="text-center my-5">
      <Row>
        <Col>
          <h1>404: Lost in Space</h1>
          <p>We can't seem to find the page you're looking for.</p>
          <img
            src="src\assets\astronaut-removebg-preview.png"
            alt="Funny Astronaut"
            className="img-fluid"
            style={{ maxWidth: "400px" }}
          />
          <p>
            But look on the bright side, you've discovered a secret part of the
            universe!
          </p>
          <Button variant="primary" onClick={handleGoHome} className="me-2">
            Go Back Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;
