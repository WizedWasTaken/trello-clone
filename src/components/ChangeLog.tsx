import { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Accordion } from "react-bootstrap";

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
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;

    fetch(`${apiUrl}/api/changelog.php`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Raw API response:", data); // Log the raw response
        if (Array.isArray(data)) {
          const updatedData = data.map((entry: ChangeLogEntry) => ({
            ...entry,
          }));
          setChangeLogData(updatedData);
        } else {
          console.error("Changelog data is not an array:", data);
        }
      })
      .catch((error) => console.error("Error fetching changelog:", error));
  }, []);

  if (!changeLogData.length) {
    return <div>Loader changelog.</div>;
  }

  return (
    <Container fluid className="text-center">
      <Row className="mt-5">
        <Col md={{ span: 10 }}>
          <div
            id="changelog-container"
            className="changelog-box"
            ref={containerRef}
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
                      {entry.date_added && (
                        <p>
                          <strong>Dato Tilføjet:</strong> {entry.date_added}
                        </p>
                      )}
                      <p>{entry.description}</p>
                      {entry.changes &&
                        Array.isArray(entry.changes) &&
                        entry.changes.length > 0 && (
                          <div>
                            <strong>Changes:</strong>
                            <ul>
                              {entry.changes.map((change, changeIndex) => (
                                <li key={changeIndex}>{change}</li>
                              ))}
                            </ul>
                          </div>
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
