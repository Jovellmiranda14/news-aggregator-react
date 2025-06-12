import React, { useState, useEffect } from "react";
import car1 from "../assets/Car.jpg";
import car2 from "../assets/Car2.jpg";
import car3 from "../assets/Car3.jpg";

const images = [car1, car2, car3];

export default function Banner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="d-flex justify-content-center mb-4 position-relative overflow-hidden w-100"
      style={{
        aspectRatio: "16 / 9", // Maintain aspect ratio for responsiveness
        maxWidth: "1320px",
        maxHeight: "500px",
        margin: "0 auto",
      }}
    >
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Slide ${index}`}
          className="img-fluid position-absolute"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: current === index ? 1 : 0,
            transition: "opacity 1s ease-in-out",
          }}
        />
      ))}
    </div>
  );
}
