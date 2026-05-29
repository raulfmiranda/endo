import React from "react";
import ReactDOM from "react-dom/client";

// importa o pico.css (tema padrão, claro/escuro automático)
// import "@picocss/pico/css/pico.min.css";
import "./styles.css";

import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);