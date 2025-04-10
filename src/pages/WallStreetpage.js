import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import NewsList from "../components/NewsList";


export default function WallStreetPage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getWSJNews = async () => {
      let res = await fetch("http://localhost:3000/api/api?q=wsj");
      res = await res.json();
      setArticles(res.articles.slice(0, 12));
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
