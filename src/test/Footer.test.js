import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; 
import Footer from "../components/Footer"; // Adjust the path if your Footer component is in a different location

describe("Footer", () => {
  test("renders the copyright text correctly", () => {
    // Render the Footer component
    render(<Footer />);
    expect(screen.getByText(/© All Rights Reserved/i)).toBeInTheDocument();

    // You could also test for the role if you want to be more specific about the heading
    expect(screen.getByRole("heading", { level: 4, name: /© All Rights Reserved/i })).toBeInTheDocument();
  });

});
