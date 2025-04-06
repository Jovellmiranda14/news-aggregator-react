import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, InputGroup, Image } from "react-bootstrap";
import { fetchNews } from "../api/api";

export default function SearchBar({ setsearchTerm }) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (input.length > 2) {
        setLoading(true);
        try {
          const articles = await fetchNews(input);
          setSuggestions(articles.slice(0, 5)); // Limit to 5 suggestions
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setSuggestions([]); // Clear suggestions if input is too short
      }
    };

    fetchSuggestions();
  }, [input]);

  const handleSuggestionClick = (suggestion, index) => {
    setInput(suggestion.title);
    setSuggestions([]);
  
    // Navigate to the article page while passing article data in `state`
    navigate(`/${suggestion.category || "general"}/article/${index}`, {
      state: { article: suggestion }
    });
  };

  return (
    <Form className="mb-4 mt-4 position-relative">
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Search news..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button variant="primary" disabled={loading}>
          {loading ? "Loading..." : "Search"}
        </Button>
      </InputGroup>

      {/* Display suggestions if any */}
      {suggestions.length > 0 && input.length > 2 && (
        <div className="dropdown-menu show position-absolute w-100 max-height-200 overflow-auto bg-white border border-top-0 shadow-sm">
          {suggestions.map((suggestion, index) => {
            console.log(
              suggestion.title,
              suggestion.urlToImage,
              suggestion.id || `article-${index}`
            );

            return (
              <button
                key={index}
                className="dropdown-item d-flex align-items-center"
                onClick={() => handleSuggestionClick(suggestion, index)}
                style={{ cursor: "pointer" }}
              >
                {suggestion.urlToImage && (
                  <Image
                    src={suggestion.urlToImage}
                    alt={suggestion.title}
                    thumbnail
                    className="me-2"
                    style={{ width: "50px", height: "50px" }}
                  />
                )}
                {suggestion.title}
              </button>
            );
          })}
        </div>
      )}
    </Form>
  );
}
