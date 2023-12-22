import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  ListGroup,
  Button,
  Form,
  Col,
  Dropdown,
  Modal,
} from "react-bootstrap";

interface Rule {
  id: number;
  title: string;
  description: string;
  category: string;
}

const RulePage: React.FC = () => {
  const [rules, setRules] = useState<Rule[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;

    fetch(`${apiUrl}/api/fetchDatabase.php`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setRules(data);
        }
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  const displayNextRule = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < rules.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const displayLastRule = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const handleItemClick = (id: number) => {
    const selectedRuleIndex = rules.findIndex((rule) => rule.id === id);
    setCurrentIndex(selectedRuleIndex);
    setShowModal(true);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;

    if (newSearchTerm === "") {
      setSearchTerm(newSearchTerm);
      setSelectedCategory(null);
    } else {
      setSearchTerm(newSearchTerm);
    }
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const currentRule = rules[currentIndex];

  const filteredRules = rules.filter(
    (rule) =>
      (!selectedCategory || rule.category === selectedCategory) &&
      (rule.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rule.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const uniqueCategories = [...new Set(rules.map((rule) => rule.category))];
  const allCategories = [null, ...uniqueCategories];

  return (
    <Container className="my-5 py-4">
      <Row className="mt-3 justify-content-center mb-5">
        <Form.Control
          type="text"
          placeholder="Søg efter regel"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Row>
      <Row className="justify-content-center">
        <Dropdown onSelect={(category) => handleCategoryChange(category)}>
          <Dropdown.Toggle id="dropdown-categories">
            {selectedCategory ? `Kategori: ${selectedCategory}` : "Alle Regler"}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {allCategories.map((category, index) => (
              <Dropdown.Item
                key={index}
                eventKey={category === null ? undefined : category}
              >
                {category ? category : "Alle Regler"}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Row>
      <Row className="justify-content-center mt-3">
        <ListGroup>
          {filteredRules.map((rule, index) => (
            <React.Fragment key={rule.id}>
              {(index === 0 ||
                rule.category !== filteredRules[index - 1].category) && (
                <ListGroup.Item
                  key={`separator-${rule.category}`}
                  variant="secondary"
                  className="fw-bold text-uppercase text-center"
                >
                  {rule.category}
                </ListGroup.Item>
              )}
              <ListGroup.Item
                key={`rule-${rule.id}`}
                active={rule.id === rules[currentIndex].id}
                variant={index % 2 === 0 ? "light" : "dark"}
                onClick={() => handleItemClick(rule.id)}
                style={{ cursor: "pointer" }}
              >
                {`${index + 1}. ${rule.title}`}
              </ListGroup.Item>
            </React.Fragment>
          ))}
        </ListGroup>
      </Row>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{currentRule?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{currentRule?.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Luk
          </Button>
          {currentIndex > 0 && (
            <Button onClick={displayLastRule}>Forrige Regel</Button>
          )}
          {currentIndex < filteredRules.length - 1 && (
            <Button onClick={displayNextRule}>Næste Regel</Button>
          )}
        </Modal.Footer>
      </Modal>
      <Row className="mt-3 justify-content-center">
        <Col className="text-center">
          {currentIndex > 0 && (
            <Button onClick={displayLastRule}>Forrige Regel</Button>
          )}
        </Col>
        <Col className="text-center">
          {currentIndex < filteredRules.length - 1 && (
            <Button onClick={displayNextRule}>Næste Regel</Button>
          )}
        </Col>
      </Row>
      {/* {filteredRules.length === 0}{" "}
      {
        <Row className="mt-3 justify-content-center">
          <Col className="text-center">
            <h4>Ingen regler fundet</h4>
            <p className="lead">Kontakt eventuelt en udvikler.</p>
          </Col>
        </Row>
      } */}
    </Container>
  );
};

export default RulePage;
