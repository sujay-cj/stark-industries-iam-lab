import React from 'react';
import { History, ShieldAlert, Info } from 'lucide-react';
import { Badge } from '../common/Badge';

export function RecentActivityCard() {
  const eventPlaceholders = [
    {
      title: 'Authentication Events',
      text: 'Authentication events will appear here after Keycloak integration.',
      tag: 'OIDC Logging'
    },
    {
      title: 'Directory Synchronization Events',
      text: 'Directory synchronization events will appear here.',
      tag: 'OpenLDAP Sync'
    },
    {
      title: 'User Login & Session Activity',
      text: 'Login activity will be displayed after authentication is implemented.',
      tag: 'Session Audit'
    }
  ];

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title">
            <History size={18} style={{ color: 'var(--accent-blue-light)' }} />
            <span>Recent Security Events</span>
          </div>
          <div className="card-subtitle">System Audit Log Placeholders</div>
        </div>
        <Badge variant="warning">Event Integration Pending</Badge>
      </div>

      <div className="card-body">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {eventPlaceholders.map((item, idx) => (
            <div key={idx} style={{
              backgroundColor: 'var(--bg-inset)',
              border: '1px dashed var(--border-medium)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Info size={16} style={{ color: 'var(--status-warning)', flexShrink: 0 }} />
                <div>
                  <span style={{ fontSize: '0.86rem', fontWeight: '600', color: 'var(--text-primary)', display: 'block' }}>
                    {item.title}
                  </span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                    {item.text}
                  </span>
                </div>
              </div>
              <Badge variant="neutral">{item.tag}</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
