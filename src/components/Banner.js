// Banner.jsx
import React from "react";
import bannerImage from "../assets/Car.jpg";

export default function Banner() {
  return (
    <div className="mb-4">
      <img
        src={bannerImage}
        alt="Banner"
        className="d-block"
        style={{ width: "1320px", height: "500px", objectFit: "cover" , marginLeft: "-12px" }}
      />
    </div>
  );
}
