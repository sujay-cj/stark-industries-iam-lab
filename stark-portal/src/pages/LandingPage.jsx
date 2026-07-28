import React from 'react';
import { LandingHero } from '../components/landing/LandingHero';
import { Footer } from '../components/common/Footer';

export function LandingPage({ onSsoLogin, onNavigateDashboard }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      width: '100%',
      backgroundColor: 'var(--bg-dark)'
    }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <LandingHero onSsoLogin={onSsoLogin} onNavigateDashboard={onNavigateDashboard} />
      </div>
      <Footer />
    </div>
  );
}
