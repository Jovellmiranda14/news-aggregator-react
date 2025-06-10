import React, { useState, useEffect, useRef } from "react";
import { Container, ListGroup, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Top10Latest() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false); // Prevent multiple fetches

  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const getLatestNews = async () => {
      try {
        const urls = [
          `${process.env.REACT_APP_API_URL}/api/api?q=techcrunch`,
          `${process.env.REACT_APP_API_URL}/api/api?q=business`,
        ];

        const responses = await Promise.all(urls.map((url) => fetch(url)));
        const data = await Promise.all(responses.map((res) => res.json()));

        const combinedArticles = [...data[0].articles, ...data[1].articles];
        const shuffledNews = shuffleArray(combinedArticles).slice(0, 10);

        setArticles(shuffledNews);
      } catch (error) {
        console.error("❌ Error fetching latest news:", error);
      } finally {
        setLoading(false);
      }
    };

    getLatestNews();
  }, []);

  if (loading) {
    return (
      <div className="text-center my-4 px-0" style={{ paddingLeft: "1rem" }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div
      className="mt-1 px-0"
      style={{ marginRight: "-1.5rem", marginLeft: "-0.5rem" }}
    >
      <h3>Top Ten Topics</h3>
      <ListGroup className="gap-1 d-flex flex-column">
        {articles.map((article, index) => (
          <ListGroup.Item
            key={index}
            className="mb-2 p-2"
            style={{
              border: "none",
              borderRadius: "0", // optional: removes rounding if unwanted
              boxShadow: "none", // optional: removes any shadow
              paddingLeft: 0, // optional: if you want full-width alignment
              paddingRight: 0,
            }}
          >
            <Link
              to={`/article?url=${encodeURIComponent(article.url)}`}
              className="text-dark text-decoration-none"
              state={{ article }}
            >
              <p
                className="mb-1 text-decoration-underline fw-normal text-justify"
                style={{
                  fontSize: "17px",
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                }}
              >
                {article.title}
              </p>
            </Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
