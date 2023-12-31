import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  OverlayTrigger,
  Tooltip,
  Form,
  FloatingLabel,
} from "react-bootstrap";

interface Field {
  id: number;
  title: string;
  textbox: boolean;
}

interface Application {
  name: string;
  closed: boolean;
  color?: string;
  fields: Field[];
}

const getApplicationsFromDatabase = (): Promise<Application[]> => {
  const apiUrl = import.meta.env.VITE_API_URL;

  return fetch(`${apiUrl}/api/application.php`)
    .then((response) => response.json())
    .catch((error) => {
      console.error("Kunne ikke finde application.php:", error);
      throw error;
    });
};

const generateFields = (application: Application): JSX.Element[] => {
  const fields: JSX.Element[] = [];

  application.fields.forEach((field) => {
    const key = `field${field.id}`;
    fields.push(
      <Form.Group key={key} className="mb-3">
        <FloatingLabel controlId={key} label={field.title}>
          {field.textbox ? (
            <Form.Control
              as="textarea"
              placeholder={`Indtast ${field.title}`}
              style={{ height: "100px" }}
            />
          ) : (
            <Form.Control type="input" placeholder={`Indtast ${field.title}`} />
          )}
        </FloatingLabel>
      </Form.Group>
    );
  });

  return fields;
};

const ApplicationComponent: React.FC<{ application: Application }> = ({
  application,
}) => {
  if (!application.name) {
    return (
      <Container fluid>
        <div className="text-center">
          <h1>Tryk på en ansøgnings knap, for at se ansøgnings formularen.</h1>
        </div>
      </Container>
    );
  }
  return (
    <Container className="d-flex justify-content-center align-items-center">
      <div className="text-center w-50">
        <h2 className="my-4">{application.name}</h2>
        {generateFields(application).length === 0 ? (
          <div className="text-center">
            <p>Kunne ikke finde nogle felter.</p>
            <p>Kontakt en udvikler.</p>
          </div>
        ) : (
          generateFields(application)
        )}
      </div>
    </Container>
  );
};

const ApplicationPage: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApp, setSelectedApp] = useState<Application | null>({
    name: "",
    closed: false,
    fields: [],
  });

  useEffect(() => {
    getApplicationsFromDatabase()
      .then((data) => {
        const defaultApp: Application = { name: "", closed: false, fields: [] };
        setApplications([defaultApp, ...data]);
        setSelectedApp(defaultApp);
      })
      .catch((error) => console.error("Kunne ikke finde ansøgninger:", error));
  }, []);

  const renderSelectedApp = () => {
    return <ApplicationComponent application={selectedApp!} />;
  };

  const handleAppClick = (application: Application) => {
    setSelectedApp(application);
  };

  return (
    <Container
      fluid
      className="my-5 py-4 d-flex justify-content-center align-items-center flex-column"
    >
      <div className="my-3">
        {applications.map((app, index) =>
          app.closed ? (
            <OverlayTrigger
              key={index}
              placement="bottom"
              overlay={
                <Tooltip>
                  {app.closed
                    ? `${app.name} er lukket for nu. Vi åbner snart igen.`
                    : ""}
                </Tooltip>
              }
            >
              <span>
                <Button
                  className="mx-2"
                  disabled={app.closed}
                  size="lg"
                  variant="outline-dark"
                  style={{ backgroundColor: app.color, color: "white" }}
                  onClick={() => handleAppClick(app)}
                >
                  {app.name}
                </Button>
              </span>
            </OverlayTrigger>
          ) : (
            app.name.length > 1 && (
              <Button
                key={index}
                variant="outline-dark"
                className="mx-2"
                size="lg"
                style={{ backgroundColor: app.color, color: "white" }}
                onClick={() => handleAppClick(app)}
              >
                {`${app.name}`}
              </Button>
            )
          )
        )}
      </div>
      {renderSelectedApp()}
    </Container>
  );
};

export default ApplicationPage;
