import React, { useState, useEffect } from "react";
import { Container, Image, Button } from "react-bootstrap";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import DOMPurify from "dompurify";
export default function Articlepage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const urlParam = searchParams.get("url");

  const [fullContent, setFullContent] = useState("Loading content...");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fallbackArticle = location.state?.article || {
    title: "Untitled Article",
    publishedAt: new Date().toISOString(),
    urlToImage: null,
    author: "Unknown",
    source: { name: "Unknown" },
  };

  useEffect(() => {
    const fetchFullContent = async () => {
      if (!urlParam) return;

      setLoading(true);
      try {
        // Fetch the full article content using the URL parameter
        const response = await fetch(
          `${
            process.env.REACT_APP_API_URL
          }/api/article?url=${encodeURIComponent(urlParam)}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const { content } = data;

        if (content) {
          // Clean the content for better readability
          const cleanContent = content
            .replace(/\n+/g, "\n")
            .replace(/^\s+|\s+$/g, "")
            .replace(/(\n\s*\n)+/g, "\n\n");

          setFullContent(cleanContent);
        } else {
          setFullContent("Content could not be retrieved.");
        }
      } catch (err) {
        console.error("Error fetching full article content:", err);
        setError(
          `The content from the following link could not be loaded. This may be due to restrictions or an invalid URL.`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFullContent();
  }, [urlParam]);

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
  const sanitizedContent = DOMPurify.sanitize(fullContent);

  const { formattedDate, formattedTime } = formatDate(
    fallbackArticle.publishedAt
  );

  return (
    <Container className="my-4">
      {fallbackArticle.urlToImage && (
        <Image
          src={fallbackArticle.urlToImage}
          alt={fallbackArticle.title}
          className="mb-3"
          fluid
          style={{ width: "100%", height: "auto" }} // Full width, maintain aspect ratio
        />
      )}
      <h1>{fallbackArticle.title}</h1>
      <div className="text-muted">
        <p className="mb-1">By: {fallbackArticle.author || "Unknown"}</p>
        <p className="mb-1">
          Published at:
          <span className="fw-bold text-muted">
            {formattedDate} {formattedTime}
          </span>
        </p>
        <p className="mb-0">Source: {fallbackArticle.source?.name}</p>
      </div>

      <div className="mt-4">
        {loading ? (
          <p>Loading full content...</p>
        ) : error ? (
          <div>
            <p>{error}</p>
            <a href={urlParam} target="_blank" rel="noopener noreferrer">
              Click here to view the article directly.
            </a>
          </div>
        ) : (
          <div
            className="container-lg mt-3"
            style={{ marginLeft: "-15px" }}
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />
        )}
      </div>

      <Button variant="secondary" className="mt-3" onClick={() => navigate(-1)}>
        Go Back
      </Button>
    </Container>
  );
}
