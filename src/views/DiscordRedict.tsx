// DiscordRedirect.tsx
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";

const DiscordRedirect: React.FC = () => {
  useEffect(() => {
    window.location.replace("https://discord.com/invite/lotusrp");
  }, []);

  return (
    <Container fluid className="my-5 py-4 justify-content-center">
      <h3 className="text-center">Tilslutter dig vores discord...</h3>
      <p className="lead text-center">
        Kontakt en udvikler hvis dette tager længere end forventet.
      </p>
    </Container>
  );
};

export default DiscordRedirect;
