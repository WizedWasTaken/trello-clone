import React from "react";
import { Container, Row, Col } from "react-bootstrap";

interface FooterProps {
  darkMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ darkMode }) => {
  const footerClass = darkMode ? "text-light bg-dark" : "text-dark bg-light";

  return (
    <Container fluid className={footerClass} style={{ height: "5vh" }}>
      <Row>
        <Col className="text-center">
          <p>&copy; {new Date().getFullYear()} Noah Task Manager</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
