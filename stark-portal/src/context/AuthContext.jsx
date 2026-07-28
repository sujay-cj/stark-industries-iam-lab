import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import keycloak from '../keycloak';

const AuthContext = createContext(null);

export function AuthProvider({ children, keycloakInstance = keycloak, isInitialized: propInitialized = false }) {
  const [initialized, setInitialized] = useState(propInitialized);
  const [authenticated, setAuthenticated] = useState(Boolean(keycloakInstance.authenticated));
  const [tokenState, setTokenState] = useState(keycloakInstance.token || null);
  
  // Developer preview mode override for offline/local UI testing when unauthenticated
  const [devPreviewActive, setDevPreviewActive] = useState(false);

  useEffect(() => {
    // Sync initial state if keycloak instance was initialized prior to component mount
    if (keycloakInstance.authenticated !== undefined) {
      setAuthenticated(Boolean(keycloakInstance.authenticated));
      setInitialized(true);
    }

    // Keycloak lifecycle event callbacks
    keycloakInstance.onAuthSuccess = () => {
      setAuthenticated(true);
      setTokenState(keycloakInstance.token);
    };

    keycloakInstance.onAuthLogout = () => {
      setAuthenticated(false);
      setTokenState(null);
    };

    keycloakInstance.onTokenExpired = () => {
      keycloakInstance.updateToken(30).then((refreshed) => {
        if (refreshed) {
          setTokenState(keycloakInstance.token);
        }
      }).catch(() => {
        console.warn("Keycloak token refresh failed, logging out.");
        keycloakInstance.logout();
      });
    };
  }, [keycloakInstance]);

  // Login handler invoking Keycloak adapter
  const login = useCallback(async (options = {}) => {
    console.log("SSO login triggered via Keycloak adapter.");
    try {
      await keycloakInstance.login(options);
    } catch (err) {
      console.error("Keycloak login error:", err);
      console.log("SSO login will be integrated here.");
    }
  }, [keycloakInstance]);

  // Logout handler invoking Keycloak adapter
  const logout = useCallback(async (options = {}) => {
    console.log("SSO logout triggered via Keycloak adapter.");
    try {
      await keycloakInstance.logout(options);
    } catch (err) {
      console.error("Keycloak logout error:", err);
    }
  }, [keycloakInstance]);

  // Extract parsed identity claims directly from Keycloak OIDC ID Token
  const idTokenParsed = keycloakInstance.idTokenParsed || null;
  const realmAccess = keycloakInstance.realmAccess || null;
  const resourceAccess = keycloakInstance.resourceAccess || null;

  // Single Source of Truth for authenticated user claims derived from Keycloak ID token
  const user = (authenticated && idTokenParsed) ? {
    id: idTokenParsed.sub || null,
    username: idTokenParsed.preferred_username || null,
    firstName: idTokenParsed.given_name || null,
    lastName: idTokenParsed.family_name || null,
    // Display name: Uses OIDC 'name' claim as primary source. Falls back to given_name + family_name concatenation only if 'name' is missing.
    fullName: idTokenParsed.name 
      || (idTokenParsed.given_name || idTokenParsed.family_name 
          ? `${idTokenParsed.given_name || ''} ${idTokenParsed.family_name || ''}`.trim() 
          : null) 
      || idTokenParsed.preferred_username 
      || 'Authenticated Employee',
    email: idTokenParsed.email || null,
    emailVerified: idTokenParsed.email_verified || false,
    realm: keycloakInstance.realm || 'stark-industries',
    groups: idTokenParsed.groups || [],
    roles: realmAccess?.roles || [],
    sessionId: idTokenParsed.session_state || keycloakInstance.sessionId || null,
    issuedAt: idTokenParsed.iat ? new Date(idTokenParsed.iat * 1000).toLocaleString() : null,
    expiresAt: idTokenParsed.exp ? new Date(idTokenParsed.exp * 1000).toLocaleString() : null,
  } : null;

  // Helper function to check role assignments
  const hasRole = useCallback((roleName) => {
    return keycloakInstance.hasRealmRole(roleName) || keycloakInstance.hasResourceRole(roleName);
  }, [keycloakInstance]);

  // Helper function to check group membership from OIDC token claims (custom "stark-groups" scope)
  const hasGroup = useCallback((groupName) => {
    if (!idTokenParsed || !idTokenParsed.groups || !Array.isArray(idTokenParsed.groups)) return false;
    const target = groupName.toLowerCase().replace(/^\//, '');
    return idTokenParsed.groups.some(g => {
      if (typeof g !== 'string') return false;
      const normalized = g.toLowerCase().replace(/^\//, '');
      return normalized === target || normalized.endsWith('/' + target);
    });
  }, [idTokenParsed]);

  // Helper method to refresh access tokens before making backend API requests
  const updateToken = useCallback(async (minValidity = 30) => {
    try {
      const refreshed = await keycloakInstance.updateToken(minValidity);
      if (refreshed) {
        setTokenState(keycloakInstance.token);
      }
      return keycloakInstance.token;
    } catch (error) {
      console.error("Failed to refresh Keycloak token:", error);
      throw error;
    }
  }, [keycloakInstance]);

  const value = {
    initialized,
    authenticated: Boolean(authenticated),
    user,
    token: tokenState,
    idToken: keycloakInstance.idToken || null,
    idTokenParsed,
    realmAccess,
    resourceAccess,
    keycloak: keycloakInstance,
    login,
    logout,
    hasRole,
    hasGroup,
    updateToken,
    devPreviewActive,
    setDevPreviewActive
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
