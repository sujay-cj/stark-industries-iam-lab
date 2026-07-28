// Centralized Mock Data Store for Stark Industries Enterprise SOC Portal

export const mockUserData = {
  username: "soc-analyst",
  name: "SOC Security Analyst",
  email: "analyst@stark.lab",
  sub: "f83a91c4-921e-4b2a-89bc-1d2039478ef9",
  realm: "stark-industries",
  groups: [
    "/soc-portal-users",
    "/employee-portal-users",
    "/secops-leads"
  ],
  realmRoles: [
    "soc-analyst-tier3",
    "iam-administrator",
    "default-roles-stark",
    "offline_access"
  ],
  department: "Security Operations Center",
  title: "Senior SOC Analyst",
  employeeId: "SOC-001",
  sessionStatus: "Authenticated via Keycloak OIDC",
  lastLogin: "2026-07-28 22:45:10 UTC"
};

export const mockDashboardMetrics = {
  eventsToday: "1,482,910",
  criticalAlerts: 14,
  highAlerts: 42,
  mediumAlerts: 128,
  lowAlerts: 310,
  activeInvestigations: 5,
  monitoredHosts: 1240,
  threatScore: 84
};

export const mockAlertsOverTime = [
  { time: "00:00", critical: 2, high: 5, medium: 12, low: 25 },
  { time: "04:00", critical: 1, high: 3, medium: 8, low: 18 },
  { time: "08:00", critical: 5, high: 12, medium: 34, low: 65 },
  { time: "12:00", critical: 3, high: 14, medium: 42, low: 88 },
  { time: "16:00", critical: 2, high: 6, medium: 22, low: 74 },
  { time: "20:00", critical: 1, high: 2, medium: 10, low: 40 }
];

export const mockEventDistribution = [
  { category: "Authentication & OIDC", count: 485920, percentage: 32.8, color: "#06b6d4" },
  { category: "Firewall & Network", count: 412000, percentage: 27.8, color: "#3b82f6" },
  { category: "EDR & Endpoint", count: 325400, percentage: 21.9, color: "#f59e0b" },
  { category: "Cloud & Container K8s", count: 259590, percentage: 17.5, color: "#10b981" }
];

export const mockMitreAttackTechniques = [
  { id: "T1059", name: "Command and Scripting Interpreter", count: 142, severity: "Critical" },
  { id: "T1078", name: "Valid Accounts Manipulation (LDAP)", count: 98, severity: "High" },
  { id: "T1003", name: "OS Credential Dumping (LSASS)", count: 76, severity: "Critical" },
  { id: "T1021", name: "Remote Services (RDP / SSH)", count: 64, severity: "High" },
  { id: "T1071", name: "Application Layer Protocol (C2)", count: 48, severity: "Medium" }
];

export const mockTopIps = {
  sources: [
    { ip: "185.220.101.5", count: 1420, country: "Tor Exit Node", risk: "Critical" },
    { ip: "192.168.1.104", count: 890, country: "Internal Engineering", risk: "Low" },
    { ip: "45.33.32.156", count: 640, count: "Scanners", risk: "High" },
    { ip: "10.0.4.12", count: 520, country: "Internal Dev Domain", risk: "Medium" }
  ],
  destinations: [
    { ip: "10.0.1.5", service: "Keycloak Auth Server (8080)", count: 42100 },
    { ip: "10.0.1.10", service: "OpenLDAP Directory (389)", count: 38400 },
    { ip: "10.0.2.20", service: "PostgreSQL Database (5432)", count: 29800 },
    { ip: "10.0.3.50", service: "Kubernetes Control Plane", count: 18900 }
  ]
};

export const mockAlerts = [
  {
    id: "ALT-9041",
    time: "2026-07-28 22:42:15",
    severity: "Critical",
    source: "185.220.101.5",
    destination: "10.0.1.5 (Keycloak)",
    rule: "OIDC Brute-Force Authentication Attempt",
    status: "Investigating",
    technique: "T1110 - Brute Force",
    description: "Repeated invalid token authentication requests originating from known Tor exit node attempting to brute force LDAP user cn=tstark."
  },
  {
    id: "ALT-9040",
    time: "2026-07-28 22:38:00",
    severity: "Critical",
    source: "10.0.4.88",
    destination: "10.0.1.10 (OpenLDAP)",
    rule: "Unauthorized LDAP Group Privilege Elevation",
    status: "New",
    technique: "T1078 - Valid Accounts",
    description: "Attempted modify DN request on group cn=github-admins without valid OAuth2 admin scope token."
  },
  {
    id: "ALT-9039",
    time: "2026-07-28 22:15:30",
    severity: "High",
    source: "45.33.32.156",
    destination: "10.0.3.50 (Kubernetes)",
    rule: "K8s Container Image Signature Mismatch",
    status: "New",
    technique: "T1204 - Malicious Execution",
    description: "Deployment attempt of unsigned docker container image keycloak-test-runner in staging namespace."
  },
  {
    id: "ALT-9038",
    time: "2026-07-28 21:50:12",
    severity: "High",
    source: "10.0.4.12",
    destination: "185.199.108.153 (External)",
    rule: "Suspicious Outbound SSH Data Transfer",
    status: "Resolved",
    technique: "T1048 - Exfiltration Over Alternative Protocol",
    description: "Outbound transfer exceeding 2.5 GB over non-standard port 2222 from host stark-dev-ws-04."
  },
  {
    id: "ALT-9037",
    time: "2026-07-28 21:10:00",
    severity: "Medium",
    source: "192.168.1.104",
    destination: "10.0.1.5 (Keycloak)",
    rule: "Expired Refresh Token Usage Pattern",
    status: "Resolved",
    technique: "T1550 - Use Alternate Authentication Material",
    description: "Application client stark-portal attempted to exchange expired refresh token 14 consecutive times."
  },
  {
    id: "ALT-9036",
    time: "2026-07-28 20:30:45",
    severity: "Low",
    source: "10.0.2.14",
    destination: "10.0.2.20 (Postgres)",
    rule: "DB Schema Verification Query",
    status: "False Positive",
    technique: "T1082 - System Information Discovery",
    description: "Routine database healthcheck ping execution from Keycloak container."
  }
];

export const mockSearchResults = {
  query: 'index=soc_logs severity=CRITICAL | stats count by src_ip, rule',
  timeRange: 'Last 24 Hours',
  totalCount: 156,
  executionTimeMs: 42,
  results: [
    { _time: "2026-07-28 22:42:15", src_ip: "185.220.101.5", dest_ip: "10.0.1.5", rule: "OIDC Brute-Force Attempt", action: "BLOCKED", count: 1420 },
    { _time: "2026-07-28 22:38:00", src_ip: "10.0.4.88", dest_ip: "10.0.1.10", rule: "LDAP Group Privilege Elevation", action: "DENIED", count: 98 },
    { _time: "2026-07-28 22:15:30", src_ip: "45.33.32.156", dest_ip: "10.0.3.50", rule: "K8s Signature Mismatch", action: "FLAGGED", count: 45 },
    { _time: "2026-07-28 21:50:12", src_ip: "10.0.4.12", dest_ip: "185.199.108.153", rule: "Exfiltration Anomaly", action: "LOGGED", count: 21 }
  ]
};

export const mockAssets = [
  { id: "AST-01", hostname: "stark-dc-01.stark.lab", os: "Linux (Debian 12 / OpenLDAP)", ip: "10.0.1.10", lastSeen: "2 mins ago", status: "Online", riskScore: 88, group: "Directory Domain" },
  { id: "AST-02", hostname: "stark-iam-kc-01.stark.lab", os: "Linux (Alpine / Keycloak 26.3)", ip: "10.0.1.5", lastSeen: "Just now", status: "Online", riskScore: 74, group: "Identity Provider" },
  { id: "AST-03", hostname: "stark-db-pg-01.stark.lab", os: "Linux (Ubuntu / Postgres 17)", ip: "10.0.2.20", lastSeen: "1 min ago", status: "Online", riskScore: 32, group: "Database Infrastructure" },
  { id: "AST-04", hostname: "stark-k8s-node-01.stark.lab", os: "Linux (Flatcar Container Linux)", ip: "10.0.3.50", lastSeen: "4 mins ago", status: "Warning", riskScore: 65, group: "Kubernetes Cluster" },
  { id: "AST-05", hostname: "stark-sec-workstation-04", os: "Windows 11 Enterprise", ip: "10.0.4.12", lastSeen: "12 mins ago", status: "Offline", riskScore: 92, group: "User Endpoints" }
];

export const mockThreatIntel = {
  iocFeedCount: 14280,
  maliciousIps: [
    { ip: "185.220.101.5", threatType: "Tor Exit / Brute Force", confidence: "99%", reportedBy: "CrowdStrike Feed", date: "2026-07-28" },
    { ip: "45.33.32.156", threatType: "Scanner / Recon", confidence: "92%", reportedBy: "AlienVault OTX", date: "2026-07-27" },
    { ip: "194.26.29.112", threatType: "C2 Botnet Node", confidence: "98%", reportedBy: "Mandiant Intel", date: "2026-07-26" }
  ],
  domains: [
    { domain: "phish-stark-auth.com", category: "Credential Harvesting", risk: "Critical", firstSeen: "2026-07-25" },
    { domain: "keycloak-update-verify.net", category: "Typosquatting", risk: "High", firstSeen: "2026-07-24" }
  ],
  urls: [
    { url: "http://phish-stark-auth.com/realms/stark/login", target: "Keycloak SSO Portal", status: "Blocked" },
    { url: "http://194.26.29.112/payload.bin", target: "Malware Drop", status: "Active Block" }
  ],
  hashes: [
    { hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", name: "Mimikatz_v2.2.zip", severity: "Critical" },
    { hash: "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8", name: "Trojan.CobaltStrike.stg", severity: "Critical" }
  ]
};

export const mockInvestigations = [
  {
    id: "INC-8902",
    title: "Unauthorized Admin Elevation via OpenLDAP Modifications",
    assignee: "SOC Security Lead",
    status: "In Progress",
    severity: "Critical",
    startedAt: "2026-07-28 22:38:00 UTC",
    timeline: [
      { time: "22:38:00", event: "Modify DN operation received on cn=github-admins", source: "OpenLDAP Audit Log" },
      { time: "22:39:12", event: "Keycloak OIDC claim sync flagged unexpected group addition", source: "Keycloak Event Bridge" },
      { time: "22:42:00", event: "SOC Analyst assigned incident INC-8902", source: "SOC Portal Workflows" },
      { time: "22:45:30", event: "Enforced temporary LDAP account lock on source DN", source: "Automated SOC Playbook" }
    ]
  },
  {
    id: "INC-8901",
    title: "OIDC Authorization Code Interception Warning",
    assignee: "Bruce Banner",
    status: "Investigating",
    severity: "High",
    startedAt: "2026-07-28 21:15:00 UTC",
    timeline: [
      { time: "21:15:00", event: "PKCE Code Verifier mismatch detected for client stark-portal", source: "Keycloak OIDC Adapter" },
      { time: "21:18:22", event: "Client IP 185.220.101.5 added to perimeter firewall blocklist", source: "SOC Firewall Auto-Rule" }
    ]
  }
];

export const mockReports = [
  {
    id: "REP-2026-07",
    title: "Monthly Executive SOC & Security Operations Summary",
    category: "Executive Summary",
    period: "July 2026",
    status: "Generated",
    author: "SOC Automated Report Engine",
    description: "High-level metrics covering 1.4M events, 14 critical alerts, Keycloak SSO availability, and LDAP federation health."
  },
  {
    id: "REP-2026-06",
    title: "Keycloak OIDC & LDAP Identity Audit Report",
    category: "Identity & Access Audit",
    period: "Q3 2026 Compliance",
    status: "Generated",
    author: "Identity Assurance Team",
    description: "Detailed compliance breakdown of user group assignments, role mappings, and PKCE authorization code enforcement."
  },
  {
    id: "REP-2026-05",
    title: "Incident Response & MITRE ATT&CK Playbook Analysis",
    category: "Threat Analytics",
    period: "July 2026",
    status: "Archived",
    author: "Security Team Lead",
    description: "Retrospective analysis of top attack techniques (T1059, T1078) and containment metrics."
  }
];
