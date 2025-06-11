import React, { useEffect, useState } from "react";
import { ListGroup, Spinner } from "react-bootstrap";
import fetchWeather from "../api/fetchWeather";

export default function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadWeather = async () => {
      const data = await fetchWeather();
      if (data) setWeatherData(data);
      setLoading(false);
    };

    loadWeather();
  }, []);

  if (loading) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  if (!weatherData) {
    return <div className="text-center my-4">No weather data available.</div>;
  }

  const { location, current } = weatherData;

  return (
    <div
      className="mt-1 px-2 mb-4"
      style={{
        marginRight: "-1.5rem",
        marginLeft: "-0.5rem",
      }}
    >
      <h3>Weather in {location.name}</h3>
      <ListGroup className="gap-1 d-flex flex-column">
        <ListGroup.Item
          className="mb-2 p-1"
          style={{
            border: "none",
            borderRadius: "0",
            boxShadow: "none",
            paddingLeft: 0,
            paddingRight: 0,
          }}
        >
          <div className="d-flex align-items-center">
            <img
              src={`https:${current.condition.icon}`}
              alt={current.condition.text}
              className="me-2"
              style={{ width: "50px", height: "50px" }}
            />
            <div>
              <p
                className="mb-1 text-decoration-underline fw-normal"
                style={{
                  fontSize: "17px",
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                }}
              >
                {current.condition.text} — {current.temp_c}°C
              </p>
              <p className="mb-0 text-muted" style={{ fontSize: "14px" }}>
                Feels like: {current.feelslike_c}°C | Humidity:{" "}
                {current.humidity}%
              </p>
            </div>
          </div>
        </ListGroup.Item>
        <ListGroup.Item
          className="p-1"
          style={{
            border: "none",
            borderRadius: "0",
            boxShadow: "none",
            paddingLeft: 0,
            paddingRight: 0,
          }}
        >
          <p
            className="mb-1 fw-normal"
            style={{ fontSize: "14px", color: "#555" }}
          >
            Wind: {current.wind_kph} kph {current.wind_dir} | Pressure:{" "}
            {current.pressure_mb} mb
          </p>
          <p
            className="mb-0 fw-normal"
            style={{ fontSize: "14px", color: "#555" }}
          >
            Visibility: {current.vis_km} km | UV Index: {current.uv}
          </p>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
