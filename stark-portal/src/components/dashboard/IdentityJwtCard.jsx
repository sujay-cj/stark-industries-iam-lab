import React, { useState } from 'react';
import { KeyRound, Check, Copy, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Badge } from '../common/Badge';
import { useAuth } from '../../context/AuthContext';

export function IdentityJwtCard() {
  const { authenticated, user, idTokenParsed, keycloak } = useAuth();
  const [viewMode, setViewMode] = useState('fields'); // 'fields' | 'json'
  const [copied, setCopied] = useState(false);

  const handleCopyJson = () => {
    if (idTokenParsed) {
      navigator.clipboard.writeText(JSON.stringify(idTokenParsed, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const fields = [
    { label: 'Username', value: authenticated && user ? user.username : '—' },
    { label: 'First Name', value: authenticated && user ? user.firstName : '—' },
    { label: 'Last Name', value: authenticated && user ? user.lastName : '—' },
    { label: 'Email', value: authenticated && user ? user.email : '—' },
    { label: 'Realm', value: authenticated && user ? user.realm : '—' },
    { label: 'Session ID', value: authenticated && user ? user.sessionId : '—' },
    { label: 'Token Expiration', value: authenticated && user ? user.expiresAt : '—' },
  ];

  return (
    <div className="card" style={{
      border: authenticated ? '1px solid var(--status-success)' : '1px solid var(--border-accent)',
      boxShadow: '0 4px 20px rgba(59, 130, 246, 0.08)'
    }}>
      {/* Card Header */}
      <div className="card-header" style={{ backgroundColor: authenticated ? 'rgba(16, 185, 129, 0.06)' : 'rgba(59, 130, 246, 0.06)' }}>
        <div>
          <div className="card-title">
            <KeyRound size={18} style={{ color: authenticated ? 'var(--status-success)' : 'var(--accent-blue-light)' }} />
            <span>Identity Information</span>
          </div>
          <div className="card-subtitle" style={{ color: authenticated ? 'var(--status-success)' : 'var(--accent-blue-light)', fontWeight: '500' }}>
            {authenticated ? 'Decoded Claims from Keycloak ID Token' : '(To Be Populated From Keycloak ID Token)'}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            display: 'flex',
            backgroundColor: 'var(--bg-inset)',
            border: '1px solid var(--border-medium)',
            borderRadius: 'var(--radius-sm)',
            padding: '2px'
          }}>
            <button
              onClick={() => setViewMode('fields')}
              style={{
                padding: '3px 8px',
                fontSize: '11px',
                fontWeight: '600',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                backgroundColor: viewMode === 'fields' ? 'var(--accent-blue)' : 'transparent',
                color: viewMode === 'fields' ? '#fff' : 'var(--text-muted)'
              }}
            >
              Structured Fields
            </button>
            <button
              onClick={() => setViewMode('json')}
              style={{
                padding: '3px 8px',
                fontSize: '11px',
                fontWeight: '600',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                backgroundColor: viewMode === 'json' ? 'var(--accent-blue)' : 'transparent',
                color: viewMode === 'json' ? '#fff' : 'var(--text-muted)'
              }}
            >
              Token Inspector
            </button>
          </div>
          <Badge variant={authenticated ? 'success' : 'warning'}>
            {authenticated ? 'ID Token Active' : 'Awaiting Keycloak OIDC'}
          </Badge>
        </div>
      </div>

      {/* Notice Banner */}
      <div style={{
        backgroundColor: 'var(--bg-inset)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '10px 20px',
        fontSize: '0.78rem',
        color: 'var(--text-muted)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        {authenticated ? (
          <>
            <CheckCircle2 size={14} style={{ color: 'var(--status-success)', flexShrink: 0 }} />
            <span style={{ color: 'var(--text-primary)' }}>
              Active OIDC Token authenticated via Keycloak client <code>{keycloak.clientId || 'stark-portal'}</code>.
            </span>
          </>
        ) : (
          <>
            <AlertCircle size={14} style={{ color: 'var(--status-warning)', flexShrink: 0 }} />
            <span>
              Waiting for Keycloak ID Token... No active OIDC token session established.
            </span>
          </>
        )}
      </div>

      {/* Card Body */}
      <div className="card-body">
        {viewMode === 'fields' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="kv-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))' }}>
              {fields.map((f, i) => (
                <div key={i} className="kv-item" style={{
                  backgroundColor: 'var(--bg-inset)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '10px 12px'
                }}>
                  <span className="kv-label">{f.label}</span>
                  <span className="kv-value" style={{ 
                    color: (f.value && f.value !== '—') ? 'var(--text-primary)' : 'var(--text-muted)', 
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.84rem'
                  }}>
                    {f.value || '—'}
                  </span>
                </div>
              ))}
            </div>

            {/* Groups and Roles */}
            {authenticated && user && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginTop: '4px' }}>
                <div className="kv-item" style={{ backgroundColor: 'var(--bg-inset)', padding: '12px', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}>
                  <span className="kv-label" style={{ marginBottom: '6px' }}>Groups (OIDC Claim: groups)</span>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {user.groups.length > 0 ? user.groups.map((group, idx) => (
                      <span key={idx} className="badge badge-blue" style={{ fontFamily: 'var(--font-mono)' }}>{group}</span>
                    )) : <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem', fontStyle: 'italic' }}>No groups assigned.</span>}
                  </div>
                </div>

                <div className="kv-item" style={{ backgroundColor: 'var(--bg-inset)', padding: '12px', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}>
                  <span className="kv-label" style={{ marginBottom: '6px' }}>Roles (Keycloak Realm Roles)</span>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {user.roles.length > 0 ? user.roles.map((role, idx) => (
                      <span key={idx} className="badge badge-success">{role}</span>
                    )) : <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>None</span>}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div style={{ position: 'relative' }}>
            {authenticated && idTokenParsed && (
              <button
                onClick={handleCopyJson}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  padding: '4px 8px',
                  fontSize: '11px',
                  backgroundColor: 'var(--bg-card)',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  zIndex: 10
                }}
              >
                {copied ? <Check size={12} style={{ color: 'var(--status-success)' }} /> : <Copy size={12} />}
                {copied ? 'Copied' : 'Copy JSON'}
              </button>
            )}
            <pre className="code-block" style={{ margin: 0 }}>
              {idTokenParsed 
                ? JSON.stringify(idTokenParsed, null, 2) 
                : "// Waiting for Keycloak ID Token...\n// Raw JWT payload will render here upon authentication."}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
