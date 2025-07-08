import React from "react";
import { createRoot } from "react-dom/client";
import ProductList from "../app/ProductList";

function renderEmbed() {
  const el = document.getElementById("bestie-product-list");
  if (!el) return;
  const root = createRoot(el);
  root.render(<ProductList />);
}

// Đợi DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderEmbed);
} else {
  renderEmbed();
} 