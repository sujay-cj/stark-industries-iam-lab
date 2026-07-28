import React from 'react';
import { FolderGit2, ShieldCheck, Box, Activity, ExternalLink, Plus } from 'lucide-react';
import { Badge } from '../components/common/Badge';

export function ProjectsPage() {
  const allProjects = [
    {
      name: 'Security Operations Dashboard',
      key: 'SEC-OPS',
      status: 'Active',
      variant: 'success',
      team: 'Security Engineering',
      lead: 'Tony Stark',
      desc: 'Real-time SIEM aggregation dashboard integrated with Keycloak OIDC authentication & audit logging.'
    },
    {
      name: 'Container Security Platform',
      key: 'K8S-GUARD',
      status: 'In Progress',
      variant: 'blue',
      team: 'Infrastructure',
      lead: 'Bruce Banner',
      desc: 'Zero-trust Kubernetes authentication sidecar for OpenLDAP policy enforcement.'
    },
    {
      name: 'Threat Intelligence Platform',
      key: 'THREAT-INTEL',
      status: 'Active',
      variant: 'success',
      team: 'SecOps',
      lead: 'Natasha Romanoff',
      desc: 'Enterprise threat telemetry engine synchronized with LDAP user role definitions.'
    },
    {
      name: 'Arc Reactor IAM Gatekeeper',
      key: 'ARC-GATE',
      status: 'Planning',
      variant: 'warning',
      team: 'Core Architecture',
      lead: 'Tony Stark',
      desc: 'OAuth 2.0 reverse proxy sidecar designed for high-concurrency enterprise applications.'
    }
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Enterprise Projects</h1>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
            Active initiatives and repositories under Engineering & Security governance.
          </p>
        </div>
        <button className="btn btn-primary">
          <Plus size={16} /> New Project Initiative
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '16px' }}>
        {allProjects.map((p, i) => (
          <div key={i} className="card" style={{ height: '100%' }}>
            <div className="card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FolderGit2 size={18} style={{ color: 'var(--accent-blue-light)' }} />
                <span className="card-title">{p.name}</span>
              </div>
              <Badge variant={p.variant}>{p.status}</Badge>
            </div>
            <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>{p.desc}</p>
              <div className="kv-grid">
                <div className="kv-item">
                  <span className="kv-label">Project Key</span>
                  <span className="kv-value-code">{p.key}</span>
                </div>
                <div className="kv-item">
                  <span className="kv-label">Lead</span>
                  <span className="kv-value">{p.lead}</span>
                </div>
                <div className="kv-item">
                  <span className="kv-label">Team</span>
                  <span className="kv-value">{p.team}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
