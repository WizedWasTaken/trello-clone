import React from "react";
import { Container, Row, Col, Accordion } from "react-bootstrap";

interface FeaturesPageProps {}

const FeaturesPage: React.FC<FeaturesPageProps> = () => {
  return (
    <Container className="mb-5">
      <Row className="p-5">
        <Col>
          <h1 className="text-center">Fordele ved min task manager</h1>
        </Col>
      </Row>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Hvorfor vælge os?</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Accordion Item #2</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default FeaturesPage;
