import React from 'react';
import { ShieldCheck, Network, Database, Lock, Clock } from 'lucide-react';
import { Badge } from '../common/Badge';
import { useAuth } from '../../context/AuthContext';

export function CurrentSessionCard() {
  const { authenticated, user } = useAuth();

  const sessionFields = [
    { label: 'Authentication Method', value: 'OpenID Connect (OIDC)', icon: ShieldCheck, isHighlight: true },
    { label: 'Identity Provider', value: 'Keycloak', icon: Network, isHighlight: true },
    { label: 'Directory Service', value: 'OpenLDAP', icon: Database, isHighlight: true },
    { label: 'Authorization', value: 'RBAC', icon: Lock, isHighlight: true },
    { 
      label: 'Session Status', 
      value: authenticated ? 'Authenticated' : 'Waiting for Authentication', 
      isBadge: true, 
      badgeVariant: authenticated ? 'success' : 'warning' 
    },
    { label: 'Issued At', value: authenticated && user?.issuedAt ? user.issuedAt : '—', isMono: true },
    { label: 'Expires At', value: authenticated && user?.expiresAt ? user.expiresAt : '—', isMono: true },
  ];

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title">
            <Clock size={18} style={{ color: authenticated ? 'var(--status-success)' : 'var(--accent-blue-light)' }} />
            <span>Current Session</span>
          </div>
          <div className="card-subtitle">IAM Architecture & Protocol Session State</div>
        </div>
        <Badge variant={authenticated ? 'success' : 'warning'}>
          {authenticated ? 'Active Keycloak Session' : 'Waiting for Auth'}
        </Badge>
      </div>

      <div className="card-body">
        <div className="kv-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
          {sessionFields.map((field, idx) => {
            const Icon = field.icon;
            return (
              <div key={idx} className="kv-item" style={{
                backgroundColor: 'var(--bg-inset)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '10px 12px'
              }}>
                <span className="kv-label">{field.label}</span>
                {field.isBadge ? (
                  <div style={{ marginTop: '2px' }}>
                    <Badge variant={field.badgeVariant}>{field.value}</Badge>
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                    {Icon && <Icon size={13} style={{ color: 'var(--accent-blue)' }} />}
                    <span className={field.isMono ? 'kv-value-code' : 'kv-value'} style={{
                      color: field.value === '—' ? 'var(--text-muted)' : 'var(--text-primary)',
                      fontWeight: field.isHighlight ? '600' : '400',
                      fontSize: field.isMono ? '0.78rem' : undefined
                    }}>
                      {field.value}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
