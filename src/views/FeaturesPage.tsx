import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

interface FeaturesPageProps {
  darkMode: boolean;
}

const FeaturesPage: React.FC<FeaturesPageProps> = ({ darkMode }) => {
  const bgColorClass = darkMode ? "bg-dark" : "bg-light";
  const textColorClass = darkMode ? "text-white" : "text-dark";
  const cardBgColorClass = darkMode ? "bg-secondary" : "";

  return (
    <Container
      fluid
      className={`${bgColorClass} ${textColorClass}`}
      style={{ minHeight: "80vh" }}
    >
      <Row className="p-5">
        <Col>
          <h1 className="text-center">Fordele ved min task manager</h1>
        </Col>
      </Row>

      <Row xs={1} md={2} lg={3} className="g-4">
        <Col>
          <Card className={cardBgColorClass}>
            <Card.Body>
              <Card.Title>Opret Uendelige Task Managers</Card.Title>
              <Card.Text>
                Jeg har siddet og arbejdet super hårdt på en funktion, som gør
                det muligt at have uendelige tasks managers, så du kan have en
                til hvert projekt, eller en til hver person i din familie.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className={cardBgColorClass}>
            <Card.Body>
              <Card.Title>Drag & Drop</Card.Title>
              <Card.Text>
                Med brug af React DND, er der en super nem måde at flytte rundt
                på jeres opgaver.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className={cardBgColorClass}>
            <Card.Body>
              <Card.Title>Custom Designet</Card.Title>
              <Card.Text>
                Appen er specielt designet til præcis de funktioner jeg savner
                eller bruger ved Trello. - men 1000x gange bedre ;)
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FeaturesPage;
