import React, { useState, useEffect } from "react";
import { Container, Row, Col, ProgressBar } from "react-bootstrap";
import axios from "axios";

const HomePage: React.FC = () => {
  const [totalTasks, setTotalTasks] = useState<number>(0);
  const [completedTasks, setCompletedTasks] = useState<number>(0);

  const calculateProgress = () => {
    return totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  };

  useEffect(() => {
    const fetchTrelloData = async () => {
      const apiKey = "5ed87e4768bfe63a7fcd5c186ed1d5cc";
      const token =
        "ATTA590d47702d0cae90009d7378bfe8ebca22f61be989d74f9a25822d2e2931e72c5FB9211A";
      const boardId = "657476fe737b2df9e244c58d";

      try {
        const response = await axios.get(
          `https://api.trello.com/1/boards/${boardId}/cards?key=${apiKey}&token=${token}`
        );
        const cards = response.data;

        const doneTasks = cards.filter(
          (card: { idList: string }) =>
            card.idList === "657476fe737b2df9e244c594"
        );

        setTotalTasks(cards.length);
        setCompletedTasks(doneTasks.length);
      } catch (error) {
        console.error("Error fetching data from Trello:", error);
      }
    };

    fetchTrelloData();
  }, []);

  const progress = calculateProgress();

  return (
    <Container fluid className="p-4">
      <Row className="my-5 align-items-center">
        <Col className="text-center text-md-left">
          <h1 className="display-3">Velkommen til Noah Task Manager</h1>
          <p className="lead">
            En hjemmelavet wannabe Trello, til styring af diverse projekter,
            opgaver og meget mere.
          </p>
        </Col>
      </Row>
      <Row className="my-5 align-items-center">
        <Col className="text-center">
          <h3 className="display-6">Hvem er jeg?</h3>
          <p className="lead">
            Mit navn er Noah, jeg udvikler web apps og system programmer i HTML,
            CSS, JavaScript, TypeScript, React, Node.js, PHP, SQL, Python og C#.
            Min interesse for programmering startede i 2018, hvor jeg startede
            med at udvikle mindre Minecraft SK skripts, til mine venner og
            bekendte. - fandt hurtigt en gejst i at undersøge og blive bedre til
            at programmere større programmer.
          </p>
        </Col>
      </Row>
      <Row className="my-5 align-items-center">
        <Col className="text-center">
          <h3 className="display-6">Hvorfor laver jeg denne app?</h3>
          <p className="lead">
            Jeg har længe været stor bruger af Trello, men synes at jeg som
            programmør burde kunne lave min egen version af mine
            dagligdagsprogrammer. Så da jeg sad og kedede mig, valgte jeg at
            starte på dette projekt.
          </p>
        </Col>
      </Row>
      <Row className="my-5 align-items-center">
        <Col className="text-center">
          <h3 className="display-6">Hvordan laver jeg den?</h3>
          <p className="lead">
            Siden bliver lavet i React, med TypeScript, og Bootstrap. Alle
            ekstra siderne bliver kørt i JSON, så systemet kan holde til mange
            opgaver, og store projekter.
          </p>
        </Col>
      </Row>
      <Row className="my-5 align-items-center text-center">
        <Col>
          <h3 className="mb-4">Hvor langt er jeg:</h3>
          <p className="lead">
            Dette er en progress bar, som viser hvor langt jeg er i processen.
          </p>
          <ProgressBar
            animated
            now={progress}
            label={`${progress.toFixed(2)}%`}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
