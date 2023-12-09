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
        <Row className="my-5 align-items-center text-center">
          <Col>
            <h3 className="mb-4">Hvor langt er jeg:</h3>
            <ProgressBar
              animated
              now={progress}
              label={`${progress.toFixed(2)}%`}
            />
          </Col>
        </Row>
      </Row>
    </Container>
  );
};

export default HomePage;
