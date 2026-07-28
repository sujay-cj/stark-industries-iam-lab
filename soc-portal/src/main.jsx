import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import keycloak from './keycloak';
import { AuthProvider } from './context/AuthContext';

const renderApp = (isInitialized = false) => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <AuthProvider keycloakInstance={keycloak} isInitialized={isInitialized}>
        <App />
      </AuthProvider>
    </React.StrictMode>
  );
};

// Requirement 4: On application startup, automatically authenticate using login-required & PKCE S256
keycloak
  .init({
    onLoad: 'login-required',
    pkceMethod: 'S256',
  })
  .then(() => {
    renderApp(true);
  })
  .catch((error) => {
    console.warn("Keycloak initialization notice (unreachable or deferred):", error);
    renderApp(false);
  });
