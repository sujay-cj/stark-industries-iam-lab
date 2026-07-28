import jwt from 'jsonwebtoken';

/**
 * Authentication Middleware: requireAuth()
 * Validates presence of Authorization: Bearer <JWT> header.
 * Decodes Keycloak OIDC claims (preferred_username, email, groups, realm_access.roles)
 * and attaches user object to req.user.
 */
export const requireAuth = () => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Missing or invalid Authorization Bearer header',
        statusCode: 401
      });
    }

    const token = authHeader.split(' ')[1];

    try {
      // Decode JWT payload without signature verification (production-style structure for Keycloak JWT)
      const decoded = jwt.decode(token);

      if (!decoded) {
        return res.status(401).json({
          error: 'Unauthorized',
          message: 'Malformed or unparseable Bearer token',
          statusCode: 401
        });
      }

      // Extract realm roles and group claims
      const roles = decoded.realm_access?.roles || decoded.roles || [];
      const groups = Array.isArray(decoded.groups) ? decoded.groups : [];

      req.user = {
        id: decoded.sub || null,
        username: decoded.preferred_username || decoded.sub || 'authenticated_user',
        email: decoded.email || null,
        name: decoded.name || decoded.preferred_username || 'Authenticated User',
        groups: groups,
        roles: roles,
        token: token,
        claims: decoded
      };

      next();
    } catch (err) {
      console.error("[AuthMiddleware Error]", err.message);
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Failed to process authentication token: ' + err.message,
        statusCode: 401
      });
    }
  };
};

/**
 * Authorization Middleware: requireRole(requiredRole)
 * Ensures authenticated user possesses the specified Keycloak realm role.
 */
export const requireRole = (requiredRole) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized', message: 'User context missing', statusCode: 401 });
    }

    const userRoles = req.user.roles || [];
    const hasRole = userRoles.includes(requiredRole);

    if (!hasRole) {
      return res.status(403).json({
        error: 'Forbidden',
        message: `Role entitlement missing: '${requiredRole}' required`,
        statusCode: 403
      });
    }

    next();
  };
};

/**
 * Authorization Middleware: requireGroup(requiredGroup)
 * Ensures authenticated user belongs to the specified Keycloak JWT group (e.g., 'soc-portal-users').
 */
export const requireGroup = (requiredGroup) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized', message: 'User context missing', statusCode: 401 });
    }

    const userGroups = req.user.groups || [];
    const targetClean = String(requiredGroup).trim().toLowerCase().replace(/^\/+|\/+$/g, '');

    const isMember = userGroups.some(g => {
      if (!g) return false;
      const gStr = String(g).trim().toLowerCase().replace(/^\/+|\/+$/g, '');
      return gStr === targetClean || gStr.endsWith('/' + targetClean) || gStr.split('/').includes(targetClean);
    });

    if (!isMember) {
      return res.status(403).json({
        error: 'Forbidden',
        message: `Group membership missing: '${requiredGroup}' required in JWT claims`,
        requiredGroup: requiredGroup,
        userGroups: userGroups,
        statusCode: 403
      });
    }

    next();
  };
};

export default {
  requireAuth,
  requireRole,
  requireGroup
};
