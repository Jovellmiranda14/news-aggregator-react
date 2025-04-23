import React from "react";
import { Container } from "react-bootstrap";
export default function Footer({ footer }) {
  return (
    <Container
      fluid
      className="bg-dark text-white py-4 mt-8 shadow-md position-relative"
      style={{ bottom: 0, width: "1352px" }}
    >
      <Container className="text-center">
        <h4 className="text-lg font-semibold">&copy; All Rights Reserved</h4>
      </Container>
    </Container>
  );
}
