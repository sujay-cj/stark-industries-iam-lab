import { mockUserData } from '../data/mockData';

// Placeholder Auth Service returning Promise.resolve(data)
// Designed for seamless drop-in replacement with real Keycloak REST / OIDC API calls
export const authService = {
  // Fetch current authenticated user claims
  getCurrentUser: () => {
    return Promise.resolve(mockUserData);
  },

  // Check if user possesses specific group claim from JWT
  hasGroup: (groupName) => {
    if (!mockUserData.groups || !Array.isArray(mockUserData.groups)) {
      return Promise.resolve(false);
    }
    const target = groupName.toLowerCase().replace(/^\//, '');
    const isMember = mockUserData.groups.some(g => {
      const normalized = g.toLowerCase().replace(/^\//, '');
      return normalized === target || normalized.endsWith('/' + target);
    });
    return Promise.resolve(isMember);
  },

  // Check if user possesses specific realm role
  hasRole: (roleName) => {
    if (!mockUserData.realmRoles || !Array.isArray(mockUserData.realmRoles)) {
      return Promise.resolve(false);
    }
    return Promise.resolve(mockUserData.realmRoles.includes(roleName));
  },

  // Placeholder login method
  login: (options = {}) => {
    console.log("[AuthService] Login invoked (Keycloak SSO integration target)", options);
    return Promise.resolve({ success: true, user: mockUserData });
  },

  // Placeholder logout method
  logout: () => {
    console.log("[AuthService] Logout invoked (Keycloak SSO session termination target)");
    return Promise.resolve({ success: true });
  }
};

export default authService;
