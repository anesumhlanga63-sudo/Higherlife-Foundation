import React from "react";
import ReactDOM from "react-dom/client";
import { storage } from "./storage.js";
import App from "./App.jsx";

// The app code (App.jsx) calls window.storage.get/set/delete/list, exactly
// like it did inside Claude. This line is what makes that work standalone.
window.storage = storage;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
