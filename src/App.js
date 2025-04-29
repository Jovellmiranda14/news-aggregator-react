import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import TeslaPage from "./pages/Teslapage";
import ApplePage from "./pages/Applepage";
import WallStreetPage from "./pages/WallStreetpage";
import HomePage from "./pages/Homepage";
import Articlepage from "./pages/Articlepage";
import SearchPage from "./pages/Searchpage";

export default function App() {
  return (
    <Router>
      <div className="app-container container " style={{ maxWidth: "1352px" }}>
        <Header title="News App" />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tesla" element={<TeslaPage />} />
          <Route path="/apple" element={<ApplePage />} />
          <Route path="/wallstreet" element={<WallStreetPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/:category/article/:id" element={<Articlepage />} />
          <Route path="/article/:id" element={<Articlepage />} />
        </Routes>
        <Footer footer="footer" />
      </div>
    </Router>
  );
}