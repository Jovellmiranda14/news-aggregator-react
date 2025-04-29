import React, { useEffect, useState } from "react";
import { Container, Spinner, Row } from "react-bootstrap";
import NewsList from "../components/NewsList";

export default function WallStreetPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getWSJNews = async () => {
      try {
        let res = await fetch(`${process.env.REACT_APP_API_URL}/api/api?q=wsj`);
        res = await res.json();
        setArticles(res.articles.slice(0, 12)); 
      } catch (error) {
        console.error("❌ Error fetching Wall Street Journal news:", error);
      } finally {
        setLoading(false); 
      }
    };
    getWSJNews();
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
          <NewsList articles={articles} category="Wall Street Journal" />
        )}
      </Row>
    </Container>
  );
}
