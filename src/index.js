import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./Style/index.css";
import reportWebVitals from "./reportWebVitals";
import HeaderBar from "./Containers/HeaderBar";
import AdvancedSearch from "./Components/AdvancedSearch";
import App from "./Containers/App";
import NotFound from "./Containers/NotFound";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <HeaderBar />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/advanced-search" element={<AdvancedSearch />} />
      <Route path ="*" element={<NotFound />} />
    </Routes>
  </Router>
);

reportWebVitals();
