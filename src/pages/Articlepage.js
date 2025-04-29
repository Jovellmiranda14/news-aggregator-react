import React from "react";
import { Container, Image, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

export default function Articlepage() {
  const location = useLocation();
  const navigate = useNavigate();
  const article = location.state?.article; // Retrieve the passed article

  if (!article) {
    return (
      <Container className="my-4 text-center">
        <h2>Article not found.</h2>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </Container>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      formattedDate: date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      formattedTime: date.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const { formattedDate, formattedTime } = formatDate(article.publishedAt);

  return (
    <Container className="my-4">
      {article.urlToImage && (
        <Image
          src={article.urlToImage}
          alt={article.title}
          className="mb-3"
          fluid
        />
      )}
      <h1>{article.title}</h1>
      <p>By: {article.author || "Unknown"}</p>
      <p>
        Published at: {formattedDate} {formattedTime}
      </p>
      <p>Source: {article.source?.name}</p>
      <div>{article.content}</div>
    </Container>
  );
}
