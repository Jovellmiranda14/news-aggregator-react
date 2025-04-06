import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import NewsList from "../components/NewsList";
import { fetchNews } from "../api/api";

export default function HomePage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getAppleNews = async () => {
      const news = await fetchNews();
      setArticles(news.slice(0, 12));
    };
    getAppleNews();
  }, []);

  return (
    <Container className="my-4">
      <NewsList articles={articles} category ="home" />
    </Container>
  );
}
