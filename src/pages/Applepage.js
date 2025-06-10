import React, { useEffect, useState } from "react";
import { Container, Spinner, Row } from "react-bootstrap";
import NewsList from "../components/NewsList";

export default function ApplePage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAppleNews = async () => {
      try {
        let res = await fetch(
          `${process.env.REACT_APP_API_URL}/api/api?q=apple`
        );
        res = await res.json();
        setArticles(res.articles.slice(0, 12));
      } catch (error) {
        console.error("❌ Error fetching Apple news:", error);
      } finally {
        setLoading(false);
      }
    };
    getAppleNews();
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
