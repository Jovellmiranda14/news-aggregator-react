import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Spinner } from "react-bootstrap";
import NewsList from "../components/NewsList";

export default function HomePage() {
  const [articles, setArticles] = useState([]);
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const passedSuggestions = location.state?.suggestions;

  // Function to shuffle an array
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    const getDefaultNews = async () => {
      setLoading(true); // Start loading
      try {
        const urls = [
          `${process.env.REACT_APP_API_URL}/api/api?q=apple`,
          `${process.env.REACT_APP_API_URL}/api/api?q=tesla`,
          `${process.env.REACT_APP_API_URL}/api/api?q=wsj`,
        ];

        // Fetch all URLs in parallel
        const responses = await Promise.all(urls.map((url) => fetch(url)));
        const data = await Promise.all(responses.map((res) => res.json()));

        // Combine and shuffle articles from all responses
        const combinedArticles = shuffleArray([
          ...data[0].articles,
          ...data[1].articles,
          ...data[2].articles,
        ]);

        // Limit to 12 articles
        setArticles(combinedArticles.slice(0, 12));
      } catch (err) {
        console.error("Error fetching default news:", err);
      } finally {
        setLoading(false); // End loading
      }
    };

    // If suggestions were passed from the search bar, use them
    if (passedSuggestions && passedSuggestions.length > 0) {
      setArticles(passedSuggestions);
      setLoading(false); // End loading if suggestions are used
    } else {
      getDefaultNews();
    }
  }, [passedSuggestions]);

  return (
    <Container className="my-4">
      <Row>
        {loading ? (
          <div className="text-center my-4">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <NewsList articles={articles} category="Everything" />
        )}
      </Row>
    </Container>
  );
}