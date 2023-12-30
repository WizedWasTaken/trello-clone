import { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Accordion } from "react-bootstrap";
import "../assets/scss/scrollbar.css";

interface nyhederEntry {
  id: number;
  title: string;
  description: string;
  changes: string[];
  image_url?: string;
  date_added: string;
}

const Nyheder = () => {
  const [nyhederData, setNyhederData] = useState<nyhederEntry[]>([]);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;

    fetch(`${apiUrl}/api/nyheder.php`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const updatedData = data.map((entry: nyhederEntry) => ({
            ...entry,
            changes: Array.isArray(entry.changes) ? entry.changes : [],
          }));
          setNyhederData(updatedData);

          if (updatedData.length > 0) {
            setActiveAccordion("0");
          }
        } else {
          console.error("nyheder er ikke en array:", data);
        }
      })
      .catch((error) => console.error("nyheder FEJL:", error));
  }, []);

  const handleAccordionToggle = (eventKey: string | null) => {
    setActiveAccordion(activeAccordion === eventKey ? null : eventKey);
    const expandedItem = document.getElementById(`nyheder-panel-${eventKey}`);
    if (expandedItem) {
      expandedItem.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (!nyhederData.length) {
    return <div>Loading nyheder...</div>;
  }

  return (
    <Container fluid className="text-center">
      <Row className="mt-5">
        <Col md={{ span: 10 }}>
          <div
            id="nyheder-container"
            className="nyheder-box"
            ref={containerRef}
            style={{ maxHeight: "650px", overflowY: "auto" }}
          >
            <Accordion
              activeKey={activeAccordion}
              // @ts-expect-error Det virker korrekt på test, hold øje med dette.
              onSelect={handleAccordionToggle}
            >
              {nyhederData.map((entry: nyhederEntry, index) => (
                <Accordion.Item
                  key={entry.id}
                  eventKey={index.toString()}
                  id={`nyheder-panel-${index}`}
                >
                  <Accordion.Header>
                    <span style={{ cursor: "pointer" }}>{entry.title}</span>
                  </Accordion.Header>
                  <Accordion.Body>
                    <div>
                      <p>{entry.description}</p>
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

export default Nyheder;
