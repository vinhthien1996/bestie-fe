import { jsx as _jsx } from "react/jsx-runtime";
import { createRoot } from "react-dom/client";
import ProductList from "../app/ProductList";
// Lấy email từ query string hoặc từ attribute của div
function getEmail() {
    // Ưu tiên lấy từ query string
    const params = new URLSearchParams(window.location.search);
    if (params.get("email"))
        return params.get("email");
    // Nếu không có, thử lấy từ attribute
    const el = document.getElementById("bestie-product-list");
    if (el && el.getAttribute("data-email"))
        return el.getAttribute("data-email");
    return undefined;
}
function renderEmbed() {
    const el = document.getElementById("bestie-product-list");
    if (!el)
        return;
    const email = getEmail();
    const root = createRoot(el);
    root.render(_jsx(ProductList, { email: email }));
}
// Đợi DOM ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderEmbed);
}
else {
    renderEmbed();
}
