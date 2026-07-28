import React from 'react';
import { UserCheck, Building2, ShieldAlert, Mail, Contact, Users } from 'lucide-react';
import { Badge } from '../common/Badge';
import { useAuth } from '../../context/AuthContext';

export function UserProfileCard() {
  const { authenticated, user } = useAuth();

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  const displayName = (authenticated && user) ? user.fullName : 'Tony Stark';
  const displayEmail = (authenticated && user) ? (user.email || `${user.username}@stark.lab`) : 'tony.stark@stark.lab';
  const displayRole = (authenticated && user) ? (user.roles[0] || 'Authenticated User') : 'GitHub Administrator';
  const displayDept = (authenticated && user) ? (user.groups[0] || 'Engineering') : 'Engineering';
  const displayId = (authenticated && user) ? (user.id || user.username || 'EMP-0001') : 'EMP-0001';

  return (
    <div className="card" style={{ height: '100%' }}>
      <div className="card-header">
        <div>
          <div className="card-title">
            <UserCheck size={18} style={{ color: 'var(--accent-blue-light)' }} />
            <span>{authenticated ? 'Authenticated User Profile' : 'Target User Profile'}</span>
          </div>
          <div className="card-subtitle">Directory Identity & Entitlements</div>
        </div>
        <Badge variant={authenticated ? 'success' : 'warning'}>
          {authenticated ? 'OIDC Verified' : 'Waiting for Auth'}
        </Badge>
      </div>

      <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* User Hero Banner */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          padding: '16px',
          backgroundColor: 'var(--bg-inset)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-subtle)'
        }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: authenticated ? 'var(--accent-blue)' : 'var(--bg-surface-hover)',
            border: '1px solid var(--border-medium)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '700',
            fontSize: '18px',
            color: '#ffffff'
          }}>
            {getInitials(displayName)}
          </div>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontSize: '1.05rem', color: 'var(--text-primary)' }}>{displayName}</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {authenticated ? `Subject ID: ${user?.id || 'Keycloak Account'}` : 'Target Directory Account (OpenLDAP / Keycloak)'}
            </p>
          </div>
          <Badge variant={authenticated ? 'success' : 'warning'}>
            {authenticated ? 'Active Session' : 'Unauthenticated'}
          </Badge>
        </div>

        {/* KV Details Grid */}
        <div className="kv-grid">
          <div className="kv-item">
            <span className="kv-label">Department</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} className="kv-value">
              <Building2 size={14} style={{ color: 'var(--accent-blue)' }} />
              <span>{displayDept}</span>
            </div>
          </div>

          <div className="kv-item">
            <span className="kv-label">Role</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} className="kv-value">
              <ShieldAlert size={14} style={{ color: 'var(--status-warning)' }} />
              <span>{displayRole}</span>
            </div>
          </div>

          <div className="kv-item">
            <span className="kv-label">Employee ID / User</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Contact size={14} style={{ color: 'var(--text-muted)' }} />
              <span className="kv-value-code">{displayId}</span>
            </div>
          </div>

          <div className="kv-item">
            <span className="kv-label">Email</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Mail size={14} style={{ color: 'var(--accent-blue-light)' }} />
              <span className="kv-value-code">{displayEmail}</span>
            </div>
          </div>
        </div>

        {/* Requirement 4, 5, 6: Assigned LDAP Groups (stark-groups Claim) Section */}
        <div style={{
          backgroundColor: 'var(--bg-inset)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <span className="kv-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Users size={14} style={{ color: 'var(--accent-blue-light)' }} />
            <span>Assigned LDAP Groups (stark-groups Claim):</span>
          </span>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '2px' }}>
            {authenticated && user?.groups && user.groups.length > 0 ? (
              user.groups.map((group, idx) => (
                <span key={idx} className="badge badge-blue" style={{ fontFamily: 'var(--font-mono)' }}>
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
    </div>
  );
}
