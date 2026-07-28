/**
 * Context Service - JARVIS Structured Knowledge Base
 * Focused, optimized knowledge base for fast Google Gemini model responses.
 */

const KNOWLEDGE_BASE = `
STARK INDUSTRIES IAM PLATFORM - KNOWLEDGE BASE

PROJECT ARCHITECTURE:
- Frontend: React SOC Portal (localhost:3001) & Stark Employee Portal (localhost:3000)
- Backend: Express.js REST API Gateway (localhost:5000)
- Identity Provider: Keycloak 26.3 (localhost:8080, Realm: stark-industries, Client: soc-portal)
- Identity Directory: OpenLDAP 1.5.0 (ldap://localhost:389, Base DN: dc=stark,dc=lab, OU: ou=People,dc=stark,dc=lab)
- Database: PostgreSQL 17 (localhost:5432)
- SIEM Platform: Splunk Enterprise 9.4 REST API (https://localhost:8089)
- SIEM Index: index=keycloak (sourcetype=keycloak:events)

KNOWN USERS:
- peter (Analyst / Employee - Groups: employee-portal-users, soc-portal-users)
- tony (Executive Admin)
- sujay (Security Engineer)

AUTHENTICATION FLOW:
User Browser -> React SOC (3001) -> Keycloak OIDC (8080) -> OpenLDAP (389) -> Bearer JWT -> Express Backend (5000).

LOGGING PIPELINE:
Keycloak container stdout -> keycloakLogForwarder.js -> Splunk REST Receiver -> index=keycloak -> Dashboard & JARVIS.

FIELDS IN INDEX=KEYCLOAK:
_time, username, clientId, realmName, ipAddress, error, grant_type, host.

KEYCLOAK EVENT TYPES:
LOGIN, LOGIN_ERROR, LOGOUT, REGISTER, CODE_TO_TOKEN, REFRESH_TOKEN.

CONDUCT DIRECTIVES:
- Assist human SOC analysts; never fabricate synthetic log records, passwords, or secrets.
- Be calm, analytical, and objective.
`.trim();

export const contextService = {
  getPersistentContext: () => KNOWLEDGE_BASE,
  getSection: () => KNOWLEDGE_BASE
};

export default contextService;
