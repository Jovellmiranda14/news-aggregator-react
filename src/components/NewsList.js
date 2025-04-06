import React from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Top10Latest from "./Top10Latest"; // Import the Top10Latest component

export default function NewsList({ articles, category }) {
  const placeholderImage = "https://via.placeholder.com/150x100?text=No+Image";
  const limitedArticles = articles.slice(0, 16);

  return (
    <Container className="mt-4">
      <Row className="mb-3">
        {/* Main Content Area for Articles */}
        <Col md={9}>
          <Row>
            {limitedArticles.map((article, index) => (
              <Col key={index} md={4} className="mb-3">
                <Card className="h-100 border-black shadow-sm">
                  <Card.Img
                    variant="top"
                    src={article.urlToImage || placeholderImage}
                    alt={article.title || "No Image Available"}
                    className="img-fluid"
                    style={{ height: "150px", objectFit: "cover" }}
                  />
                  <Card.Body className="p-2">
                    <Card.Title
                      className="text-truncate"
                      style={{ fontSize: "20px" }}
                    >
                      {article.title.length > 50
                        ? article.title.slice(0, 50) + "..."
                        : article.title}
                    </Card.Title>
                    <Card.Text
                      className="text-muted"
                      style={{ fontSize: "16px" }}
                    >
                      <small>{article.source?.name}</small>
                    </Card.Text>
                    <Link to={`/${category}/article/${index}`} state={{ article }}>
                      <Button
                        variant="primary"
                        size="sm"
                        style={{ backgroundColor: "#D4D7DF", color: "black" }}
                      >
                        Read more
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>

        <Col md={3}>
          <Top10Latest />
        </Col>
      </Row>
    </Container>
  );
}
