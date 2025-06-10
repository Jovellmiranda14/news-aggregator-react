import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  Button,
  InputGroup,
  Spinner,
  Navbar,
  Nav,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

export default function Header() {
  const [input, setInput] = useState("");
  const [allArticles, setAllArticles] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch articles dynamically based on user input
  const fetchArticles = async (query = "") => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/api?q=${encodeURIComponent(
          query
        )}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAllArticles(data.articles);
    } catch (err) {
      console.error("Error fetching articles:", err);
      setError("Failed to fetch articles. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Trigger fetch when input changes and is long enough
  useEffect(() => {
    if (input.length > 3) {
      fetchArticles(input); // Fetch based on user input
    } else {
      setSuggestions([]);
    }
  }, [input]);

  // Filter suggestions based on input
  useEffect(() => {
    const filteredSuggestions = allArticles.filter(
      (article) =>
        article.title?.toLowerCase().includes(input.toLowerCase()) ||
        (article.content &&
          article.content.toLowerCase().includes(input.toLowerCase()))
    );
    setSuggestions(filteredSuggestions.slice(0, 15));
  }, [allArticles, input]);

  const handleAction = (e, suggestion = null, index = null) => {
    e.preventDefault();

    if (suggestion) {
      // Handle suggestion click
      setInput("");
      navigate(`/${"search"}/article/${encodeURIComponent(suggestion.url)}`, {
        state: { article: suggestion },
      });
    } else if (input.trim().length > 3) {
      // Handle search
      setInput("");
      navigate("/Search", {
        state: { suggestions: [input] }, // Pass the search query as suggestions
      });
    }
  };

  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="shadow">
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center">
          <h4 className="m-0">News App</h4>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto mb-2 mb-lg-0">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/sports">
              Sports
            </Nav.Link>
              <Nav.Link as={NavLink} to="/economics">
              Economics
            </Nav.Link>
            <Nav.Link as={NavLink} to="/tesla">
              Tesla
            </Nav.Link>
            <Nav.Link as={NavLink} to="/apple">
              Apple
            </Nav.Link>
            <Nav.Link as={NavLink} to="/wallstreet">
              WSJ
            </Nav.Link>
          </Nav>

          <Form
            onSubmit={(e) => handleAction(e)}
            className="d-flex ms-lg-3 mt-2 mt-lg-0 position-relative"
            style={{ maxWidth: "400px", width: "100%" }}
          >
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search news..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Button
                variant="primary"
                type="submit"
                disabled={loading || input.trim().length === 0}
              >
                {loading ? <Spinner animation="border" size="sm" /> : "Search"}
              </Button>
            </InputGroup>

            {input.trim().length > 0 && (
              <div
                className="dropdown-menu show position-absolute w-100 bg-white border border-top-0 shadow"
                style={{ top: "100%", zIndex: 1000 }}
              >
                {suggestions.length > 0 ? (
                  suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="dropdown-item text-start text-truncate"
                      onClick={(e) => handleAction(e, suggestion, index)}
                      title={suggestion.title}
                    >
                      {suggestion.title}
                    </button>
                  ))
                ) : (
                  <div className="dropdown-item text-center">
                    No suggestions found.
                  </div>
                )}
              </div>
            )}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
