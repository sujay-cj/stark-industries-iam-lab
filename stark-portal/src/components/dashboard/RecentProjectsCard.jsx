import React from 'react';
import { FolderGit2, ShieldCheck, Box, Activity, ExternalLink } from 'lucide-react';
import { Badge } from '../common/Badge';

export function RecentProjectsCard() {
  const projects = [
    {
      title: 'Security Operations Dashboard',
      description: 'Enterprise SIEM & OIDC telemetry aggregator for real-time security monitoring.',
      icon: ShieldCheck,
      badge: 'Active',
      variant: 'success',
      repo: 'stark-sec/sec-ops-ui',
      access: 'RBAC: Admin'
    },
    {
      title: 'Container Security Platform',
      description: 'Kubernetes cluster authentication & image signature scanning engine.',
      icon: Box,
      badge: 'In Development',
      variant: 'blue',
      repo: 'stark-sec/container-guard',
      access: 'RBAC: Admin'
    },
    {
      title: 'Threat Intelligence Platform',
      description: 'Zero-trust threat analytics feed integrated with LDAP authorization policies.',
      icon: Activity,
      badge: 'Active',
      variant: 'success',
      repo: 'stark-sec/threat-intel',
      access: 'RBAC: Admin'
    }
  ];

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title">
            <FolderGit2 size={18} style={{ color: 'var(--accent-blue-light)' }} />
            <span>Recent Projects</span>
          </div>
          <div className="card-subtitle">Repositories & Systems Managed by GitHub Admin Group</div>
        </div>
        <Badge variant="neutral">3 Active Repos</Badge>
      </div>

      <div className="card-body">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {projects.map((proj, idx) => {
            const Icon = proj.icon;
            return (
              <div key={idx} style={{
                backgroundColor: 'var(--bg-inset)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                transition: 'border-color 0.15s ease'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    padding: '10px',
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--accent-blue-light)'
                  }}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontWeight: '600', fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                        {proj.title}
                      </span>
                      <Badge variant={proj.variant}>{proj.badge}</Badge>
                    </div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {proj.description}
                    </p>
                    <div style={{ display: 'flex', gap: '12px', marginTop: '6px', fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                      <span>{proj.repo}</span>
                      <span style={{ color: 'var(--border-medium)' }}>•</span>
                      <span style={{ color: 'var(--status-info)' }}>{proj.access}</span>
                    </div>
                  </div>
                </div>

                <button style={{
                  background: 'transparent',
                  border: '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '6px',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer'
                }} title="Open project repository">
                  <ExternalLink size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
