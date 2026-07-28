import React from 'react';
import { Shield, Lock, ArrowRight, KeyRound, AlertTriangle } from 'lucide-react';
import starkLogo from '../../assets/stark-logo.svg';
import { EnterpriseAuthPanel } from '../common/EnterpriseAuthPanel';

export function LandingHero({ onSsoLogin, onNavigateDashboard }) {
  const handleLoginClick = () => {
    // Explicit Requirement 6: Execute ONLY console.log("SSO login will be integrated here.");
    console.log("SSO login will be integrated here.");
    if (onSsoLogin) {
      onSsoLogin();
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 'calc(100vh - var(--navbar-height) - 50px)',
      width: '100%',
      position: 'relative',
      padding: '40px 20px',
      overflow: 'hidden'
    }}>
      {/* Subtle Background Geometric Illustration */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px',
        height: '800px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(11, 15, 23, 0) 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Grid pattern overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.6
      }} />

      <div className="animate-fade-in" style={{
        maxWidth: '900px',
        textAlign: 'center',
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px'
      }}>
        {/* Brand Tagline */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-medium)',
          borderRadius: '30px',
          padding: '6px 16px',
          boxShadow: 'var(--shadow-md)'
        }}>
          <img src={starkLogo} alt="Stark Industries" style={{ width: '22px', height: '22px' }} />
          <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--accent-blue-light)', letterSpacing: '0.05em' }}>
            STARK INDUSTRIES IAM PLATFORM • ENTERPRISE PORTAL
          </span>
        </div>

        {/* Hero Title */}
        <h1 style={{
          fontSize: '2.8rem',
          fontWeight: '800',
          letterSpacing: '-0.02em',
          color: 'var(--text-primary)',
          lineHeight: '1.15'
        }}>
          Stark Industries <br />
          <span style={{
            background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #1d4ed8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Enterprise Employee Portal
          </span>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: '1.05rem',
          color: 'var(--text-secondary)',
          maxWidth: '640px',
          lineHeight: '1.6'
        }}>
          Internal enterprise portal waiting to be connected to Keycloak Identity Provider and OpenLDAP directory.
        </p>

        {/* Primary SSO Action Button Box */}
        <div style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-accent)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px 32px',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
          width: '100%',
          maxWidth: '460px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
            <Lock size={14} style={{ color: 'var(--status-warning)' }} />
            <span>Target: Keycloak OIDC & OpenLDAP Federation</span>
          </div>

          {/* Exact Single Login Button */}
          <button
            onClick={handleLoginClick}
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '14px 24px',
              fontSize: '1rem',
              fontWeight: '600',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
          >
            <KeyRound size={18} />
            Login with Stark SSO
          </button>

          <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
            Executes console.log(&quot;SSO login will be integrated here.&quot;)
          </span>
        </div>

        {/* Developer Preview Mode Explanation Banner */}
        <div style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-md)',
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          width: '100%',
          maxWidth: '680px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', textAlign: 'left' }}>
            <AlertTriangle size={18} style={{ color: 'var(--status-warning)', flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                Developer Preview Mode
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                This mode exists only until Keycloak authentication is integrated.
              </div>
            </div>
          </div>
          <button
            onClick={onNavigateDashboard}
            className="btn btn-outline"
            style={{
              padding: '6px 14px',
              fontSize: '0.8rem',
              borderColor: 'var(--border-medium)',
              color: 'var(--accent-blue-light)'
            }}
          >
            View Dashboard Preview <ArrowRight size={14} />
          </button>
        </div>

        {/* Requirement 7: Enterprise Authentication Panel */}
        <div style={{ width: '100%', maxWidth: '800px', marginTop: '16px', textAlign: 'left' }}>
          <EnterpriseAuthPanel />
        </div>
      </div>
    </div>
  );
}
