import React from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Top10Latest from "./Top10Latest";

export default function NewsList({ articles, category }) {
  const placeholderImage = "https://placehold.co/600x400?text=No+Image+Available";
  const limitedArticles = (articles || []).filter(Boolean).slice(0, 16); // 🛡️ filter out broken entries

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
                    src={article?.urlToImage || placeholderImage}
                    className="img-fluid"
                    style={{ height: "150px", objectFit: "cover" }}
                  />
                  <Card.Body className="p-2">
                    <Card.Title className="fs-5 text-truncate">
                      {article?.title || "No Title"}
                    </Card.Title>
                    <Card.Text className="text-muted" style={{ fontSize: "16px" }}>
                      <small>{article?.source?.name || "Unknown Source"}</small>
                    </Card.Text>
                    <Link
                      to={`/article?url=${encodeURIComponent(article.url)}`}
                      state={{ article }} // optional: keeps fallback data like title/image
                    >
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

        {/* Top10Latest Sidebar */}
        <Col md={3}>
          <Top10Latest />
        </Col>
      </Row>
    </Container>
  );
}
