import React from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Top10Latest from "./Top10Latest";
import Banner from "./Banner"; // ✅ Import the Banner
import Weather from "./Weather"; // ✅ Import the Weather component

export default function NewsList({ articles, category }) {
  const placeholderImage =
    "https://placehold.co/600x400?text=No+Image+Available";
  const limitedArticles = (articles || []).filter(Boolean).slice(0, 16);

  return (
    <>
      <Banner /> {/* ✅ Render the banner above the article grid */}
      <div
        className="container-fluid mt-4 px-2"
        style={{ marginLeft: "-10px" }}
      >
        <Row className="mb-3">
          <Col md={9}>
            <Row>
              {limitedArticles.map((article, index) => (
                <Col key={index} md={4} className="mb-3">
                  <Card
                    className="h-100 shadow-sm p-3"
                    style={{ border: "1px solid #D4D7DF" }}
                  >
                    <Card.Img
                      variant="top"
                      src={article?.urlToImage || placeholderImage}
                      className="img-fluid"
                      style={{
                        height: "150px",
                        objectFit: "cover",
                        border: "1px solid rgb(154, 156, 165)",
                      }}
                    />
                    <Card.Body className="p-2">
                      <Card.Title className="fs-5 text-truncate">
                        {article?.title || "No Title"}
                      </Card.Title>
                      <Card.Text
                        className="text-muted"
                        style={{ fontSize: "16px" }}
                      >
                        <small>
                          {article?.source?.name || "Unknown Source"}
                        </small>
                      </Card.Text>
                      <Link
                        to={`/article?url=${encodeURIComponent(article.url)}`}
                        state={{ article }}
                      >
                        <Button
                          variant="primary"
                          size="md"
                          className="rounded"
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
            <Weather />
            <Top10Latest />
          </Col>
        </Row>
      </div>
    </>
  );
}
