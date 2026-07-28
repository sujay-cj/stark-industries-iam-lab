import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import keycloak from '../keycloak';

const AuthContext = createContext(null);

export function AuthProvider({ children, keycloakInstance = keycloak, isInitialized: propInitialized = false }) {
  const [initialized, setInitialized] = useState(propInitialized);
  const [authenticated, setAuthenticated] = useState(Boolean(keycloakInstance.authenticated));
  const [token, setToken] = useState(keycloakInstance.token || null);

  useEffect(() => {
    if (keycloakInstance.authenticated !== undefined) {
      setAuthenticated(Boolean(keycloakInstance.authenticated));
      setInitialized(true);
    }

    keycloakInstance.onAuthSuccess = () => {
      setAuthenticated(true);
      setToken(keycloakInstance.token);
    };

    keycloakInstance.onAuthLogout = () => {
      setAuthenticated(false);
      setToken(null);
    };

    keycloakInstance.onTokenExpired = () => {
      keycloakInstance.updateToken(30).then((refreshed) => {
        if (refreshed) {
          setToken(keycloakInstance.token);
        }
      }).catch(() => {
        console.warn("Keycloak token refresh failed, logging out.");
        keycloakInstance.logout();
      });
    };
  }, [keycloakInstance]);

  // Login handler
  const login = useCallback(async (options = {}) => {
    try {
      await keycloakInstance.login(options);
    } catch (err) {
      console.error("Keycloak login error:", err);
    }
  }, [keycloakInstance]);

  // Logout handler
  const logout = useCallback(async (options = {}) => {
    try {
      await keycloakInstance.logout(options);
    } catch (err) {
      console.error("Keycloak logout error:", err);
    }
  }, [keycloakInstance]);

  // Read decoded JWT claims directly from both Access Token and ID Token
  const tokenParsed = keycloakInstance.tokenParsed || null;
  const idTokenParsed = keycloakInstance.idTokenParsed || null;
  const realmAccess = keycloakInstance.realmAccess || tokenParsed?.realm_access || idTokenParsed?.realm_access || null;

  // Combine and deduplicate groups from both token sources
  const combinedGroups = Array.from(new Set([
    ...(Array.isArray(tokenParsed?.groups) ? tokenParsed.groups : []),
    ...(Array.isArray(idTokenParsed?.groups) ? idTokenParsed.groups : [])
  ]));

  // Build user object directly from Keycloak JWT claims
  const user = (authenticated && (tokenParsed || idTokenParsed)) ? {
    id: tokenParsed?.sub || idTokenParsed?.sub || null,
    username: tokenParsed?.preferred_username || idTokenParsed?.preferred_username || null,
    email: tokenParsed?.email || idTokenParsed?.email || null,
    name: tokenParsed?.name 
      || idTokenParsed?.name
      || (tokenParsed?.given_name || tokenParsed?.family_name 
          ? `${tokenParsed?.given_name || ''} ${tokenParsed?.family_name || ''}`.trim() 
          : null) 
      || tokenParsed?.preferred_username 
      || idTokenParsed?.preferred_username
      || 'Authenticated User',
    groups: combinedGroups,
    realmRoles: realmAccess?.roles || [],
    realm: keycloakInstance.realm || 'stark-industries',
    sub: tokenParsed?.sub || idTokenParsed?.sub || null,
    sessionId: tokenParsed?.session_state || idTokenParsed?.session_state || keycloakInstance.sessionId || null,
  } : null;

  // Task 6 & 7 & 8: Reusable helper hasGroup(groupName) checking JWT groups claim
  const hasGroup = useCallback((groupName) => {
    if (!groupName) return false;

    const rawGroups = (user?.groups && user.groups.length > 0)
      ? user.groups
      : Array.from(new Set([
          ...(Array.isArray(keycloakInstance.tokenParsed?.groups) ? keycloakInstance.tokenParsed.groups : []),
          ...(Array.isArray(keycloakInstance.idTokenParsed?.groups) ? keycloakInstance.idTokenParsed.groups : [])
        ]));

    if (!Array.isArray(rawGroups) || rawGroups.length === 0) {
      return false;
    }

    const targetClean = String(groupName).trim().toLowerCase().replace(/^\/+|\/+$/g, '');

    return rawGroups.some(g => {
      if (!g) return false;
      const gStr = String(g).trim().toLowerCase().replace(/^\/+|\/+$/g, '');
      if (gStr === targetClean) return true;
      if (gStr.endsWith('/' + targetClean)) return true;
      const parts = gStr.split('/');
      return parts.includes(targetClean);
    });
  }, [user, keycloakInstance]);

  const value = {
    user,
    token: token || keycloakInstance.token || null,
    isAuthenticated: Boolean(authenticated),
    isInitialized: initialized,
    keycloak: keycloakInstance,
    login,
    logout,
    hasGroup
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
