import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import NewsList from "../components/NewsList";


export default function HomePage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getAppleNews = async () => {
      let res = await fetch("http://localhost:3000/api/api?q=default");
      res = await res.json();
      setArticles(res.articles.slice(0, 12));
    };
    getAppleNews();
  }, []);

  return (
    <Container className="my-4">
      <NewsList articles={articles} category ="home" />
    </Container>
  );
}
