import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Spinner } from "react-bootstrap";
import NewsList from "../components/NewsList";

export default function SearchPage() {
  const location = useLocation();
  const suggestions = location.state?.suggestions || [];
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

   useEffect(() => {
      const getDefaultNews = async () => {
        setLoading(true);
        try {
          const queries = suggestions.length > 0 ? suggestions : ["apple", "tesla", "wsj"]; 
          const urls = queries.map(
            (query) => `${process.env.REACT_APP_API_URL}/api/api?q=${encodeURIComponent(query)}`
          );
  
          // Fetch all URLs in parallel
          const responses = await Promise.all(urls.map((url) => fetch(url)));
          const allData = await Promise.all(
            responses.map((res) => {
              if (!res.ok) {
                throw new Error(`Failed to fetch: ${res.statusText}`);
              }
              return res.json();
            })
          );
  
          // Combine articles from all responses
          const combinedArticles = allData.flatMap((data) => data.articles || []);
  
          setArticles(combinedArticles.slice(0, 12));
        } catch (err) {
          console.error("Error fetching news:", err);
        } finally {
          setLoading(false); 
        }
      };
  
      getDefaultNews();
    }, []); // Will always re-fetch if I inserted suggestions 
  return (
    <Container className="my-4">
      <Row>
        {loading ? (
          <div className="text-center my-4">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : articles.length > 0 ? (
          <NewsList articles={articles} category="search" />
        ) : (
          <div className="text-center my-4">
            <p>No search results available. Please try searching again.</p>
          </div>
        )}
      </Row>
    </Container>
  );
}
