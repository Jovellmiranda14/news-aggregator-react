import React, { useEffect, useState } from "react";
import { Container, Spinner, Row } from "react-bootstrap";
import NewsList from "../components/NewsList";
import fetchArticles from "../utils/fetchArticles";
export default function ApplePage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      const articles = await fetchArticles("sports", 12);
      setArticles(articles);
      setLoading(false);
    };

    loadNews();
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
          <NewsList articles={articles} category="sports" />
        )}
      </Row>
    </Container>
  );
}
