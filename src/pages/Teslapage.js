import React, { useEffect, useState } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import NewsList from "../components/NewsList";

export default function TeslaPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTeslaNews = async () => {
      try {
        let res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/api?q=tesla`
        );
        res = await res.json();
        setArticles(res.articles.slice(0, 12));
      } catch (error) {
        console.error("Error fetching Tesla news:", error);
      } finally {
        setLoading(false);
      }
    };

    getTeslaNews();
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
          <NewsList articles={articles} category="tesla" />
        )}
      </Row>
    </Container>
  );
}
