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
      setLoading(true);
      try {
        const businessResponse = await fetch(`/api/news?category=business`);
        const techcrunchResponse = await fetch(`/api/news?category=techcrunch`);

        if (!businessResponse.ok || !techcrunchResponse.ok) {
          throw new Error("Failed to fetch latest news");
        }

        const businessData = await businessResponse.json();
        const techcrunchData = await techcrunchResponse.json();

        const combinedNews = [...businessData.articles, ...techcrunchData.articles];
        const shuffledNews = shuffleArray(combinedNews).slice(0, 10);
        setArticles(shuffledNews);
      } catch (error) {
        console.error("Error fetching latest news:", error);
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
    <Container className=" d-flex flex-column">
      <h3>Top Ten Topics</h3>
      <ListGroup className="gap-1 d-flex flex-column">
        {articles.map((article, index) => (
          <ListGroup.Item key={index} className="mb-2 gap-2">
            <Link
              to={`/article/${index}`}
              className="text-decoration-none text-dark"
              state={{ article }}
            >
              <h1 className="fs-5 mb-1 text-wrap two-line-truncate">
                {article.title.length > 50
                  ? article.title.substring(0, 45) + "..."
                  : article.title}
              </h1>
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}