import React from 'react';
import { Settings, Shield, Key, Network, Server, Monitor } from 'lucide-react';
import { Badge } from '../components/common/Badge';

export function SettingsPage() {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Portal & IAM Settings</h1>
        <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
          System integration endpoints, Keycloak OIDC client configurations, and Developer Preview parameters.
        </p>
      </div>

      <div className="card">
        <div className="card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Key size={18} style={{ color: 'var(--accent-blue-light)' }} />
            <span className="card-title">Keycloak OIDC Integration Targets</span>
          </div>
          <Badge variant="warning">Configuration Only</Badge>
        </div>
        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="kv-grid">
            <div className="kv-item">
              <span className="kv-label">Keycloak Server URL</span>
              <span className="kv-value-code">http://localhost:8080</span>
            </div>
            <div className="kv-item">
              <span className="kv-label">Realm Name</span>
              <span className="kv-value-code">stark</span>
            </div>
            <div className="kv-item">
              <span className="kv-label">Client ID</span>
              <span className="kv-value-code">stark-portal-client</span>
            </div>
            <div className="kv-item">
              <span className="kv-label">Flow Standard</span>
              <span className="kv-value">Authorization Code + PKCE</span>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Network size={18} style={{ color: 'var(--status-success)' }} />
            <span className="card-title">OpenLDAP Directory Endpoints</span>
          </div>
          <Badge variant="success">Active Federation</Badge>
        </div>
        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="kv-grid">
            <div className="kv-item">
              <span className="kv-label">LDAP Domain</span>
              <span className="kv-value-code">stark.lab</span>
            </div>
            <div className="kv-item">
              <span className="kv-label">Organisation</span>
              <span className="kv-value">Stark Industries</span>
            </div>
            <div className="kv-item">
              <span className="kv-label">LDAP Port</span>
              <span className="kv-value-code">389 (Plain / STARTTLS)</span>
            </div>
            <div className="kv-item">
              <span className="kv-label">LDAPS Port</span>
              <span className="kv-value-code">636 (SSL)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
