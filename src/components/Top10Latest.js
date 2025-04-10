import React, { useState, useEffect } from "react";
import { Container, ListGroup, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Top10Latest() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    const getLatestNews = async () => {
      try {
        const urls = [
          "http://localhost:3000/api/api?q=techcrunch",
          "http://localhost:3000/api/api?q=business"
        ];

        // Fetch both in parallel
        const responses = await Promise.all(urls.map((url) => fetch(url)));
        const jsonData = await Promise.all(responses.map((res) => res.json()));

        // Combine articles from both responses
        const combinedArticles = [...jsonData[0].articles, ...jsonData[1].articles];

        // Shuffle and take top 10
        const shuffledNews = shuffleArray(combinedArticles).slice(0, 10);

        setArticles(shuffledNews);
      } catch (error) {
        console.error("❌ Error fetching latest news:", error);
      } finally {
        setLoading(false);
      }
    };

    getLatestNews();
  }, []);

  if (loading) {
    return (
      <Container className="text-center my-4">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <h4>Top Ten Topics</h4>
      <ListGroup className="gap-1 d-flex flex-column">
        {articles.map((article, index) => (
          <ListGroup.Item key={index} className="border mb-2 gap-2">
            <Link
              to={`/article/${index}`}
              className="text-decoration-none text-dark"
            >
              <h1 className="mb-1 text-truncate" style={{ fontSize: "20px" }}>
                {article.title}
              </h1>
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}
