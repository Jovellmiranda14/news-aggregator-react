import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import NewsList from "../components/NewsList";
import { fetchNews } from "../api/api";

export default function ApplePage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getAppleNews = async () => {
      try {
        const news = await fetchNews("apple");
        setArticles(news.slice(0, 12)); // Limit to 16 articles without shuffling
      } catch (error) {
        console.error("Error fetching Apple news:", error);
      } finally {
        setLoading(false);
      }
    };
    getAppleNews();
  }, []);

  return (
    <Container className="my-4">
      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <NewsList articles={articles} category="Apple" />
      )}
    </Container>
  );
}
