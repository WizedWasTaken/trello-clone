import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const HomePage: React.FC = () => {
  return (
    <Container fluid className="justify-content-center p-5">
      {/* INTRO */}
      <Row className="mb-5">
        <Col>
          <h1 className="display-3">Welcome to Lotus RP</h1>
          <p className="lead">
            Explore a world of possibilities and adventures in our immersive
            role-playing community.
          </p>
        </Col>
      </Row>

      {/* SERVER INFO */}
      <Row className="mb-5">
        <Col>
          <h2 className="display-4">Server Information</h2>
          <Card>
            <Card.Body>
              <Card.Text>
                Lotus RP is a unique role-playing server where you can create
                your own story and interact with a vibrant community. Join us
                for exciting adventures, engaging roleplay, and much more.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* OWNERS */}
      <Row>
        <Col>
          <h2 className="display-4">Meet the Owners</h2>
        </Col>
      </Row>
      <Row className="mb-5">
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="owner1.jpg" alt="Owner 1" />
            <Card.Body>
              <Card.Title>John Doe</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                lacinia lectus nec nisi fringilla, id consectetur velit luctus.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src="owner2.jpg" alt="Owner 2" />
            <Card.Body>
              <Card.Title>Jane Smith</Card.Title>
              <Card.Text>
                Sed auctor ex eu accumsan. Vivamus sit amet arcu id libero
                lacinia viverra. Aenean facilisis vestibulum risus.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        {/* Add more owners as needed */}
      </Row>
    </Container>
  );
};

export default HomePage;
