import React from 'react';
import { Shield, Server, Cpu, KeyRound, Database, Lock } from 'lucide-react';
import { Badge } from './Badge';

export function EnterpriseAuthPanel() {
  const specs = [
    { label: 'Identity Provider', value: 'Keycloak', icon: Server },
    { label: 'Directory Service', value: 'OpenLDAP', icon: Cpu },
    { label: 'Authentication Protocol', value: 'OpenID Connect (OIDC)', icon: KeyRound },
    { label: 'Directory Protocol', value: 'LDAP', icon: Database },
    { label: 'Authorization Model', value: 'Role-Based Access Control (RBAC)', icon: Lock },
  ];

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title">
            <Shield size={18} style={{ color: 'var(--accent-blue-light)' }} />
            <span>Enterprise Authentication Architecture</span>
          </div>
          <div className="card-subtitle">Static IAM Specification & Federation Protocol</div>
        </div>
        <Badge variant="blue">Architecture Spec</Badge>
      </div>

      <div className="card-body">
        <div className="kv-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))' }}>
          {specs.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="kv-item" style={{
                backgroundColor: 'var(--bg-inset)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '12px'
              }}>
                <span className="kv-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                  <Icon size={13} style={{ color: 'var(--accent-blue-light)' }} />
                  {item.label}
                </span>
                <span className="kv-value" style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
                  {item.value}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
