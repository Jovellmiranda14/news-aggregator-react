import React, { useState, useEffect } from "react";
import { Container, Image, Button } from "react-bootstrap";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import DOMPurify from "dompurify";
export default function Articlepage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const urlParam = searchParams.get("url");

  const [articleContentHtml, setArticleContentHtml] = useState("");
  const [readingTimeAndDate, setReadingTimeAndDate] = useState(null);
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
    const fetchAndParseContent = async () => {
      if (!urlParam) return;

      setLoading(true);
      setError(null);
      setArticleContentHtml("");
      setReadingTimeAndDate(null);

      try {
        const response = await fetch(
          `${
            process.env.REACT_APP_API_URL
          }/api/article?url=${encodeURIComponent(urlParam)}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const { content } = await response.json();

        if (content) {
          const cleanHtml = DOMPurify.sanitize(content, {
            USE_PROFILES: { html: true },
          });

          const parser = new DOMParser();
          const doc = parser.parseFromString(cleanHtml, "text/html");

          const readingTimeElement = doc.querySelector('p[data-version="v1"]');
          const dateElement = doc.querySelector('time[data-version="v1"]');

          let extractedTime = readingTimeElement?.textContent.trim() || "";
          let extractedDate = dateElement?.textContent.trim() || "";

          readingTimeElement?.remove();
          dateElement?.closest("p")?.remove();

          const timeAndDate = [extractedTime, extractedDate]
            .filter(Boolean)
            .join(" · ");

          setReadingTimeAndDate(timeAndDate || null);

          const articleContainer =
            doc.querySelector("#readability-page-1 .article") || doc.body;

          // ❌ Remove all images inside content
          articleContainer
            .querySelectorAll("img")
            .forEach((img) => img.remove());

          const finalContentHtml = articleContainer.innerHTML;

          setArticleContentHtml(finalContentHtml);
        } else {
          setArticleContentHtml("<p>Content could not be retrieved.</p>");
        }
      } catch (err) {
        console.error("Error fetching or parsing article content:", err);
        setError(
          "The content from the following link could not be loaded or parsed. This may be due to restrictions or an invalid URL."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAndParseContent();
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
          style={{ width: "100%", height: "auto" }}
        />
      )}

      <h1>{fallbackArticle.title}</h1>
      <div className="text-muted">
        <p className="mb-1">By: {fallbackArticle.author || "Unknown"}</p>
        <p className="mb-1">
          Published at:{" "}
          <span className="fw-bold text-muted">
            {formattedDate} {formattedTime}
          </span>
        </p>
        <p className="mb-0">Source: {fallbackArticle.source?.name}</p>
        {readingTimeAndDate && <p className="mt-2">{readingTimeAndDate}</p>}
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
            dangerouslySetInnerHTML={{ __html: articleContentHtml }}
          />
        )}
      </div>

      <Button variant="secondary" className="mt-3" onClick={() => navigate(-1)}>
        Go Back
      </Button>
    </Container>
  );
}
