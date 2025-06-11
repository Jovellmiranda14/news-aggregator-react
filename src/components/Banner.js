// Banner.jsx
import React from "react";
import bannerImage from "../assets/Car.jpg";

export default function Banner() {
  return (
    <div className="d-flex justify-content-center mb-4">
      <img
        src={bannerImage}
        alt="Banner"
        className="img-fluid"
        style={{
          maxWidth: "1320px", // Your desired max-width
          width: "100%", // Ensures the image fills its container up to the max-width
          objectFit: "cover",
          maxHeight: "500px", // Optional: to maintain a consistent height on larger screens
        }}
      />
    </div>
  );
}
