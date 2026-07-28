import React from 'react';
import { ShieldAlert, Lock, LogOut, UserCheck, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Badge } from './Badge';

export function AccessDenied() {
  const { user, logout, hasGroup } = useAuth();

  const userGroups = user?.groups || [];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - var(--navbar-height) - 80px)',
      padding: '40px 20px',
      textAlign: 'center'
    }}>
      <div className="card animate-fade-in" style={{
        maxWidth: '600px',
        width: '100%',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        boxShadow: '0 8px 30px rgba(239, 68, 68, 0.15)'
      }}>
        {/* Card Header */}
        <div className="card-header" style={{ backgroundColor: 'rgba(239, 68, 68, 0.08)' }}>
          <div className="card-title" style={{ color: '#f87171' }}>
            <ShieldAlert size={20} />
            <span>Access Denied - Authorization Error</span>
          </div>
          <Badge variant="warning">HTTP 403 Forbidden</Badge>
        </div>

        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
          {/* Main Notice */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '14px',
            backgroundColor: 'var(--bg-inset)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '16px'
          }}>
            <Lock size={24} style={{ color: '#f87171', flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h3 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
                Insufficient Group Privileges
              </h3>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                Your account <strong style={{ color: 'var(--accent-blue-light)' }}>{user?.email || user?.username || 'Keycloak User'}</strong> is authenticated via Keycloak, but lacks the required LDAP group membership to access the Stark Industries Employee Portal.
              </p>
            </div>
          </div>

          {/* Authorization Requirements Box */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            backgroundColor: 'var(--bg-card-header)',
            borderRadius: 'var(--radius-md)',
            padding: '14px',
            border: '1px solid var(--border-subtle)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="kv-label">Required Authorization Group:</span>
              <span className="badge badge-warning" style={{ fontFamily: 'var(--font-mono)' }}>
                employee-portal-users
              </span>
            </div>

            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '10px' }}>
              <span className="kv-label" style={{ marginBottom: '6px', display: 'block' }}>
                Your Assigned OIDC Groups (stark-groups Claim):
              </span>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {userGroups.length > 0 ? (
                  userGroups.map((group, idx) => (
                    <span key={idx} className="badge badge-neutral" style={{ fontFamily: 'var(--font-mono)' }}>
                      {group}
                    </span>
                  ))
                ) : (
                  <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    No groups assigned.
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Troubleshooting Advice */}
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
            <AlertTriangle size={13} style={{ color: 'var(--status-warning)', display: 'inline', marginRight: '5px' }} />
            If you require access, please contact your LDAP Directory Administrator to assign your user object to the <code>employee-portal-users</code> group or <code>cn=employee-portal-users</code> OU.
          </div>

          {/* Logout Action */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
            <button
              onClick={() => logout()}
              className="btn btn-secondary"
              style={{
                borderColor: 'rgba(239, 68, 68, 0.4)',
                color: '#f87171',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <LogOut size={16} />
              Logout & Switch User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
