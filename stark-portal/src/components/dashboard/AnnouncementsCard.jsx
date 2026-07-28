import React from 'react';
import { Megaphone, Wrench, ShieldAlert, GraduationCap, ChevronRight } from 'lucide-react';
import { Badge } from '../common/Badge';

export function AnnouncementsCard() {
  const announcements = [
    {
      title: 'Upcoming Maintenance',
      date: 'July 30, 2026',
      summary: 'Scheduled Keycloak realm maintenance window & PostgreSQL migration to v17.',
      icon: Wrench,
      badge: 'Scheduled',
      variant: 'warning'
    },
    {
      title: 'Password Policy Reminder',
      date: 'July 25, 2026',
      summary: 'OpenLDAP user entries must enforce 16+ character passphrase standards with MFA.',
      icon: ShieldAlert,
      badge: 'Policy Update',
      variant: 'info'
    },
    {
      title: 'Security Awareness Training',
      date: 'July 20, 2026',
      summary: 'Mandatory annual enterprise IAM and OIDC token handling compliance module.',
      icon: GraduationCap,
      badge: 'Mandatory',
      variant: 'blue'
    }
  ];

  return (
    <div className="card">
      <div className="card-header">
        <div>
          <div className="card-title">
            <Megaphone size={18} style={{ color: 'var(--status-warning)' }} />
            <span>Announcements</span>
          </div>
          <div className="card-subtitle">Corporate IAM Advisories & Security Bulletins</div>
        </div>
        <Badge variant="warning">3 Unread</Badge>
      </div>

      <div className="card-body">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {announcements.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} style={{
                backgroundColor: 'var(--bg-inset)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{
                    padding: '8px',
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--status-warning)'
                  }}>
                    <Icon size={16} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: '600', fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                        {item.title}
                      </span>
                      <Badge variant={item.variant}>{item.badge}</Badge>
                    </div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {item.summary}
                    </p>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                      Posted: {item.date}
                    </span>
                  </div>
                </div>

                <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
