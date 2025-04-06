import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import NewsList from "../components/NewsList";
import { fetchNews } from "../api/api";

export default function WallStreetPage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getWSJNews = async () => {
      const news = await fetchNews("Wall Street Journal");
      setArticles(news.slice(0, 12));
    };
    getWSJNews();
  }, []);

  return (
    <Container className="my-4">
      <h2>Wall Street Journal News</h2>
      <NewsList articles={articles} category="wsj" />
    </Container>
  );
}
