import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  FloatingLabel,
} from "react-bootstrap";

const ContactPage: React.FC = () => {
  return (
    <Container className="my-5 py-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <h1 className="text-center mb-4">Kontakt Os</h1>
          <Form>
            <FloatingLabel
              controlId="floatingInput"
              label="Navn"
              className="mb-3"
            >
              <Form.Control type="input" placeholder="Johnny" />
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingInput"
              label="Email addresse"
              className="mb-3"
            >
              <Form.Control type="email" placeholder="navn@noahnielsen.dk" />
            </FloatingLabel>
            <FloatingLabel controlId="floatingTextarea2" label="Kommentar">
              <Form.Control
                as="textarea"
                placeholder="Skriv en kommentar her"
                style={{ minHeight: "150px" }}
              />
            </FloatingLabel>
            <div className="d-grid">
              <Button
                variant="primary"
                onClick={() => alert("VIRKER IKKE ENDNU")}
                className="mt-5"
              >
                Send Besked
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactPage;
