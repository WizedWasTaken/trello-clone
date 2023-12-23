import { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Accordion } from "react-bootstrap";

interface ChangeLogEntry {
  id: number;
  title: string;
  description: string;
  changes: string[];
  image_url?: string;
}

const ChangeLog = () => {
  const [changeLogData, setChangeLogData] = useState<ChangeLogEntry[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;

    fetch(`${apiUrl}/api/changelog.php`)
      .then((response) => response.json())
      .then((data) => {
        const updatedData = data.map((entry: ChangeLogEntry) => ({
          ...entry,
        }));
        setChangeLogData(updatedData);
      })
      .catch((error) => console.error("Fejl med at finde changelog:", error));
  }, []);

  if (!changeLogData.length) {
    return <div>Loader changelog.</div>;
  }

  return (
    <Container fluid className="text-center">
      <Row className="mt-5">
        <Col md={{ span: 8, offset: 3 }}>
          <div
            id="changelog-container"
            className="changelog-box"
            ref={containerRef}
            style={{
              maxHeight: containerRef.current
                ? `${containerRef.current.clientHeight}px`
                : "80vh",
              overflowY: "auto",
              scrollbarWidth: "thin",
              scrollbarColor: "lightgray transparent",
            }}
          >
            <Accordion>
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
                      <p>{entry.description}</p>
                      {entry.changes && (
                        <p>
                          <strong>Changes:</strong>{" "}
                          {entry.changes
                            ? entry.changes.join(", ")
                            : "Kunne ikke finde ændringer."}
                        </p>
                      )}
                      {entry.image_url && (
                        <img
                          src={entry.image_url}
                          alt="BILLEDE KUNNE IKKE FINDES"
                          style={{ maxWidth: "100%" }}
                        />
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
