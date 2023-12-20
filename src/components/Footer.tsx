import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer: React.FC = () => {
  return (
    <Container fluid>
      <Row>
        <Col className="text-center">
          <p>&copy; {new Date().getFullYear()} Lotus RP</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
