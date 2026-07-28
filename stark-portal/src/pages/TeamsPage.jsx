import React from 'react';
import { Users, Shield, UserCheck, KeyRound } from 'lucide-react';
import { Badge } from '../components/common/Badge';

export function TeamsPage() {
  const teams = [
    { name: 'Engineering', ou: 'ou=Engineering,dc=stark,dc=lab', count: '14 Members', lead: 'Tony Stark', group: 'cn=engineering' },
    { name: 'GitHub Admins', ou: 'ou=Engineering,dc=stark,dc=lab', count: '3 Admins', lead: 'Tony Stark', group: 'cn=github-admins' },
    { name: 'Security Operations', ou: 'ou=Security,dc=stark,dc=lab', count: '8 Analysts', lead: 'Natasha Romanoff', group: 'cn=secops' },
    { name: 'Infrastructure Architecture', ou: 'ou=Infra,dc=stark,dc=lab', count: '6 Engineers', lead: 'Bruce Banner', group: 'cn=infra-arch' }
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Teams & Directory Groups</h1>
        <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
          OpenLDAP organizational units and Keycloak role mapping groups.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '16px' }}>
        {teams.map((t, idx) => (
          <div key={idx} className="card">
            <div className="card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Users size={18} style={{ color: 'var(--accent-blue-light)' }} />
                <span className="card-title">{t.name}</span>
              </div>
              <Badge variant="blue">{t.count}</Badge>
            </div>
            <div className="card-body">
              <div className="kv-grid">
                <div className="kv-item" style={{ gridColumn: '1 / -1' }}>
                  <span className="kv-label">LDAP Group DN</span>
                  <span className="kv-value-code">{t.ou}</span>
                </div>
                <div className="kv-item">
                  <span className="kv-label">Team Lead</span>
                  <span className="kv-value">{t.lead}</span>
                </div>
                <div className="kv-item">
                  <span className="kv-label">Role Mapping</span>
                  <span className="kv-value-code">{t.group}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
