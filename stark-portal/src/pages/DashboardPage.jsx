import React from 'react';
import { UserProfileCard } from '../components/dashboard/UserProfileCard';
import { IdentityJwtCard } from '../components/dashboard/IdentityJwtCard';
import { CurrentSessionCard } from '../components/dashboard/CurrentSessionCard';
import { SystemStatusCard } from '../components/dashboard/SystemStatusCard';
import { RecentProjectsCard } from '../components/dashboard/RecentProjectsCard';
import { AnnouncementsCard } from '../components/dashboard/AnnouncementsCard';
import { RecentActivityCard } from '../components/dashboard/RecentActivityCard';
import { EnterpriseAuthPanel } from '../components/common/EnterpriseAuthPanel';
import { AlertTriangle } from 'lucide-react';

export function DashboardPage() {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Top Title & Developer Preview Warning Note */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)' }}>
            Enterprise Dashboard Preview
          </h1>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Unauthenticated placeholder view waiting for Keycloak ID Token & OIDC authentication integration.
          </p>
        </div>

        {/* Explicit Requirement 5: Developer Preview Note */}
        <div style={{
          backgroundColor: 'var(--bg-inset)',
          border: '1px solid var(--border-subtle)',
          padding: '8px 14px',
          borderRadius: 'var(--radius-md)',
          fontSize: '0.78rem',
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <AlertTriangle size={14} style={{ color: 'var(--status-warning)' }} />
          <span>
            <strong style={{ color: 'var(--text-secondary)' }}>Developer Preview:</strong> This mode exists only until Keycloak authentication is integrated.
          </span>
        </div>
      </div>

      {/* Requirement 7: Enterprise Authentication Architecture Panel */}
      <EnterpriseAuthPanel />

      {/* Primary Grid Layout */}
      {/* Row 1: Profile & Current Session */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '20px' }}>
        <UserProfileCard />
        <CurrentSessionCard />
      </div>

      {/* Row 2: Identity Information (Waiting for Keycloak ID Token) */}
      <IdentityJwtCard />

      {/* Row 3: Infrastructure System Status (Waiting for Integration) */}
      <SystemStatusCard />

      {/* Row 4: Recent Projects & Announcements */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '20px' }}>
        <RecentProjectsCard />
        <AnnouncementsCard />
      </div>

      {/* Row 5: Recent Security Events */}
      <RecentActivityCard />
    </div>
  );
}
