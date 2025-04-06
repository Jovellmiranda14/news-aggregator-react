import React from "react";
import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function Header() {
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-decoration-none text-white fw-bold border-bottom border-2 border-light"
      : "text-decoration-none text-white";

  return (
    <Container
      fluid
      style={{
        height: "80px",
        backgroundColor: "#2D3945",
        fontFamily: "Arial, sans-serif",
      }}
      className="d-flex align-items-center justify-content-between p-3 shadow"
    >
      <div className="d-flex align-items-center gap-4">
        <NavLink to="/" className={navLinkClass}>
          <h4 className="m-2">Home</h4>
        </NavLink>
        <NavLink to="/tesla" className={navLinkClass}>
          <h4 className="m-2">Tesla</h4>
        </NavLink>
        <NavLink to="/apple" className={navLinkClass}>
          <h4 className="m-2">Apple</h4>
        </NavLink>
        <NavLink to="/wallstreet" className={navLinkClass}>
          <h4 className="m-2">Wall Street Journal</h4>
        </NavLink>
      </div>
      <SearchBar />
    </Container>
  );
}
