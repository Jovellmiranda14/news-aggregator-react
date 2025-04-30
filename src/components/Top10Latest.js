import React, { useState, useEffect, useRef } from "react";
import { Container, ListGroup, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Top10Latest() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false); // Prevent multiple fetches

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const getLatestNews = async () => {
      try {
        const urls = [
          `${process.env.REACT_APP_API_URL}/api/api?q=techcrunch`,
          `${process.env.REACT_APP_API_URL}/api/api?q=business`,
        ];

        const responses = await Promise.all(urls.map((url) => fetch(url)));
        const data = await Promise.all(responses.map((res) => res.json()));

        const combinedArticles = [...data[0].articles, ...data[1].articles];
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
              to={`/article?url=${encodeURIComponent(article.url)}`}
              className="text-dark"
              style={{ textDecoration: "none" }}
              state={{ article }}
            >
              <h1
                className="mb-1"
                style={{
                  fontSize: "18px",
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                }}
              >
                {article.title}
              </h1>
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}
