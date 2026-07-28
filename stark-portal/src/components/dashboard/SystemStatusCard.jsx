import React from 'react';
import { Server, Clock, Cpu, ShieldCheck, Database, CheckCircle2 } from 'lucide-react';
import { Badge } from '../common/Badge';
import { useAuth } from '../../context/AuthContext';

export function SystemStatusCard() {
  const { authenticated } = useAuth();

  const statusItems = [
    { 
      label: 'Identity Provider', 
      target: 'Keycloak', 
      icon: Server, 
      status: authenticated ? 'Connected & Active' : 'Waiting for Integration', 
      detail: 'OIDC Client Target (Port 8080)' 
    },
    { 
      label: 'Directory Service', 
      target: 'OpenLDAP', 
      icon: Cpu, 
      status: authenticated ? 'Federated & Active' : 'Not Yet Connected', 
      detail: 'LDAP Federation Target (stark.lab)' 
    },
    { 
      label: 'Federation', 
      target: 'LDAP Federation', 
      icon: ShieldCheck, 
      status: authenticated ? 'Claims Synced' : 'Waiting for Integration', 
      detail: 'Directory Sync Target' 
    },
    { 
      label: 'Database', 
      target: 'PostgreSQL', 
      icon: Database, 
      status: authenticated ? 'Realm Active' : 'Not Yet Connected', 
      detail: 'Keycloak State DB Target' 
    },
  ];

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title">
            <Server size={18} style={{ color: authenticated ? 'var(--status-success)' : 'var(--accent-blue-light)' }} />
            <span>System Status</span>
          </div>
          <div className="card-subtitle">IAM Infrastructure Topology Status</div>
        </div>
        <Badge variant={authenticated ? 'success' : 'warning'} icon={authenticated ? CheckCircle2 : Clock}>
          {authenticated ? 'Services Online & Authenticated' : 'Waiting for Integration'}
        </Badge>
      </div>

      <div className="card-body">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '14px' }}>
          {statusItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} style={{
                backgroundColor: 'var(--bg-inset)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '14px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
              }}>
                <div style={{
                  padding: '8px',
                  backgroundColor: authenticated ? 'var(--status-success-bg)' : 'var(--status-warning-bg)',
                  borderRadius: 'var(--radius-sm)',
                  color: authenticated ? 'var(--status-success)' : 'var(--status-warning)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {authenticated ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    {item.label}
                  </span>
                  <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                    {item.target}
                  </span>
                  <span style={{ 
                    fontSize: '0.76rem', 
                    color: authenticated ? 'var(--status-success)' : 'var(--status-warning)', 
                    fontWeight: '500' 
                  }}>
                    {item.status}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {item.detail}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
