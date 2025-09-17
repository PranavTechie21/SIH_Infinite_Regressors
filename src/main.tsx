  
  import React from 'react';
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import Login from "./pages/Login.tsx";
  import { LanguageProvider } from './LanguageContext';
  import "./index.css";
  
  const root = createRoot(document.getElementById("root")!);
  
  function render() {
    const hash = window.location.hash.replace('#', '') || '/';
    root.render(
      <React.StrictMode>
        <LanguageProvider>
          {hash === '/login' ? <Login /> : <App />}
        </LanguageProvider>
      </React.StrictMode>
    );
  }
  
  window.addEventListener('hashchange', render);
  render();
  