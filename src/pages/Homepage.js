import React, { useEffect, useState } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import NewsList from "../components/NewsList";

export default function HomePage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDefaultNews = async () => {
      setLoading(true); // Start loading
      try {
        const urls = [
          `${process.env.REACT_APP_API_URL}/api/api?q=apple`,
          `${process.env.REACT_APP_API_URL}/api/api?q=tesla`,
          `${process.env.REACT_APP_API_URL}/api/api?q=wsj`,
        ];

        // Fetch all URLs in parallel
        const responses = await Promise.all(urls.map((url) => fetch(url)));
        const allData = await Promise.all(responses.map((res) => res.json()));

        // Use only the first API response (e.g., Apple news)
        setArticles(allData[0].articles.slice(0, 12)); // Limit to 12 articles
      } catch (err) {
        console.error("Error fetching default news:", err);
      } finally {
        setLoading(false); // End loading
      }
    };

    getDefaultNews(); // Fetch default news on component mount
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
          <NewsList articles={articles} category="/" />
        )}
      </Row>
    </Container>
  );
}