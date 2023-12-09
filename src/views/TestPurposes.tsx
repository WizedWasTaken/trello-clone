import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

const TestPage: React.FC = () => {
  const handleTestButtonClick = () => {
    alert("Button clicked!");
  };

  return (
    <Container className="my-5">
      <Row>
        <Col className="text-center">
          <h1>Test Page</h1>
          <p>
            This page is for testing various components and functionalities.
          </p>

          <Button variant="primary" onClick={handleTestButtonClick}>
            Test Button
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default TestPage;
