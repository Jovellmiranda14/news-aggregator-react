import React, { useEffect, useState } from "react";
import { Container, Spinner, Row } from "react-bootstrap";
import NewsList from "../components/NewsList";
import fetchArticles from "../api/fetchArticles";
export default function ApplePage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      const data = await fetchArticles("apple", 12);
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
          <NewsList articles={articles} category="Apple" />
        )}
      </Row>
    </Container>
  );
}
