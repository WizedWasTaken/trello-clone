import { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Accordion, ListGroup } from "react-bootstrap";
import "../assets/scss/scrollbar.css";

interface ChangeLogEntry {
  id: number;
  title: string;
  description: string;
  changes: string[];
  image_url?: string;
  date_added: string;
}

const ChangeLog = () => {
  const [changeLogData, setChangeLogData] = useState<ChangeLogEntry[]>([]);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;

    fetch(`${apiUrl}/api/changelog.php`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Raw API response:", data);
        if (Array.isArray(data)) {
          const updatedData = data.map((entry: ChangeLogEntry) => ({
            ...entry,
            changes: Array.isArray(entry.changes) ? entry.changes : [],
          }));
          setChangeLogData(updatedData);
        } else {
          console.error("Changelog data is not an array:", data);
        }
      })
      .catch((error) => console.error("Error fetching changelog:", error));
  }, []);

  const handleAccordionToggle = (eventKey: string | null) => {
    setActiveAccordion(activeAccordion === eventKey ? null : eventKey);
    const expandedItem = document.getElementById(`changelog-panel-${eventKey}`);
    if (expandedItem) {
      expandedItem.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (!changeLogData.length) {
    return <div>Loading changelog...</div>;
  }

  return (
    <Container fluid className="text-center">
      <Row className="mt-5">
        <Col md={{ span: 10 }}>
          <div
            id="changelog-container"
            className="changelog-box"
            ref={containerRef}
            style={{ maxHeight: "650px", overflowY: "auto" }}
          >
            <Accordion
              activeKey={activeAccordion}
              // @ts-expect-error Det virker korrekt på test, hold øje med dette.
              onSelect={handleAccordionToggle}
            >
              {changeLogData.map((entry: ChangeLogEntry, index) => (
                <Accordion.Item
                  key={entry.id}
                  eventKey={index.toString()}
                  id={`changelog-panel-${index}`}
                >
                  <Accordion.Header>
                    <span style={{ cursor: "pointer" }}>{entry.title}</span>
                  </Accordion.Header>
                  <Accordion.Body>
                    <div>
                      <strong>Beskrivelse:</strong>
                      <p>{entry.description}</p>
                      {entry.changes.length > 0 && (
                        <div className="mt-2">
                          <strong>Ændringer:</strong>
                          <ListGroup variant="flush">
                            {entry.changes.map((change, changeIndex) => (
                              <ListGroup.Item key={changeIndex}>
                                {change}
                              </ListGroup.Item>
                            ))}
                          </ListGroup>
                        </div>
                      )}
                      {entry.image_url && (
                        <img
                          src={entry.image_url}
                          alt=""
                          style={{ maxWidth: "100%" }}
                        />
                      )}
                      {entry.date_added && (
                        <p className="mt-2">
                          <strong>Dato Tilføjet:</strong> {entry.date_added}
                        </p>
                      )}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ChangeLog;
