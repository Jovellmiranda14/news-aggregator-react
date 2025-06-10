import React, { useEffect, useState } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import NewsList from "../components/NewsList";
import fetchArticles from "../utils/fetchArticles";

export default function TeslaPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      const data = await fetchArticles("economics", 12);
      setArticles(data);
      setLoading(false);
    };

    loadArticles();
  }, []);

  return (
    <Container className="my-4">
      <Row>
        {loading ? (
          <div className="text-center my-4">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <NewsList articles={articles} category="Economics" />
        )}
      </Row>
    </Container>
  );
}
