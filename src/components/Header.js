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
  const [allArticles, setAllArticles] = useState([]); // Store all articles
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch all articles once when the component mounts using the API proxy
  useEffect(() => {
    const fetchAllArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(); // Fetch via proxy
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAllArticles(data.articles);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setError("Failed to fetch articles. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllArticles();
  }, []);

  // Filter articles based on the input text (for matching titles or content)
  useEffect(() => {
    if (input.length > 2) {
      setLoading(true);
      setError(null); // Reset any previous errors
      const filteredSuggestions = allArticles.filter(
        (article) =>
          article.title.toLowerCase().includes(input.toLowerCase()) ||
          (article.content &&
            article.content.toLowerCase().includes(input.toLowerCase()))
      );
      setSuggestions(filteredSuggestions.slice(0, 5)); // Limit to 5 suggestions
      setLoading(false);
    } else {
      setSuggestions([]); // Clear suggestions if input is too short
    }
  }, [input, allArticles]); // Only run this when input or allArticles changes

  const handleSuggestionClick = (suggestion, index) => {
    setInput(suggestion.title);
    setSuggestions([]);
    // Navigate to the article page while passing article data in `state`
    navigate(`/${suggestion.category || "general"}/article/${index}`, {
      state: { article: suggestion },
    });
  };

  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="shadow">
      <Container fluid>
        {/* Navbar Brand */}
        <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center">
          <h4 className="m-0">News App</h4>
        </Navbar.Brand>

        {/* Toggle button for mobile view */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        {/* Navbar Collapse for Mobile View */}
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            {/* Navigation Links */}
            <Nav.Link as={NavLink} to="/" className="text-white">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/tesla" className="text-white">
              Tesla
            </Nav.Link>
            <Nav.Link as={NavLink} to="/apple" className="text-white">
              Apple
            </Nav.Link>
            <Nav.Link as={NavLink} to="/wallstreet" className="text-white">
              Wall Street Journal
            </Nav.Link>
          </Nav>

          {/* Search Bar */}
          <Form className="d-flex ms-lg-3 mt-2 mt-lg-0 position-relative">
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search news..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <Button variant="primary" disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : "Search"}
              </Button>
            </InputGroup>

            {/* Suggestions Dropdown */}
            {suggestions.length > 0 && input.length > 2 && (
              <div className="dropdown-menu show position-absolute w-100 max-height-200 overflow-auto bg-white border border-top-0 shadow-sm">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    className="dropdown-item d-flex align-items-center"
                    onClick={() => handleSuggestionClick(suggestion, index)}
                    style={{ cursor: "pointer" }}
                    aria-label={`Select ${suggestion.title}`}
                  >
                    {suggestion.title}
                  </button>
                ))}
              </div>
            )}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
