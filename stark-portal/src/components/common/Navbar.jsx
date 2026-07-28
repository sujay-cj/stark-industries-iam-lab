import React, { useState } from 'react';
import { Bell, ShieldCheck, User, ChevronDown, Monitor, Code2, AlertTriangle, LogOut, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import starkLogo from '../../assets/stark-logo.svg';

export function Navbar({ isDashboard, isDevPreview, onToggleDevPreview }) {
  const { authenticated, user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = async () => {
    setShowProfileMenu(false);
    await logout();
  };

  return (
    <header style={{
      height: 'var(--navbar-height)',
      backgroundColor: 'var(--bg-surface)',
      borderBottom: '1px solid var(--border-subtle)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 24px',
      zIndex: 40,
      position: 'relative'
    }}>
      {/* Left Branding */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <img 
          src={starkLogo} 
          alt="Stark Industries Logo" 
          style={{ height: '32px', width: '32px' }} 
        />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ 
            fontSize: '1rem', 
            fontWeight: '700', 
            color: 'var(--text-primary)',
            letterSpacing: '0.04em',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            STARK INDUSTRIES
            <span style={{
              fontSize: '10px',
              fontWeight: '600',
              padding: '1px 6px',
              backgroundColor: 'var(--accent-blue-glow)',
              color: 'var(--accent-blue-light)',
              border: '1px solid var(--border-accent)',
              borderRadius: '3px'
            }}>
              ENTERPRISE PORTAL
            </span>
          </span>
        </div>
      </div>

      {/* Middle System Indicator & Developer Preview Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Real Keycloak Connection Status Indicator */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'var(--bg-inset)',
          padding: '5px 12px',
          borderRadius: '20px',
          border: '1px solid var(--border-subtle)',
          fontSize: '0.78rem'
        }}>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: authenticated ? 'var(--status-success)' : 'var(--status-warning)',
            boxShadow: authenticated ? '0 0 6px var(--status-success)' : '0 0 6px var(--status-warning)'
          }}></span>
          <span style={{ color: 'var(--text-muted)' }}>IAM Session:</span>
          <span style={{ color: authenticated ? 'var(--status-success)' : 'var(--status-warning)', fontWeight: '600' }}>
            {authenticated ? 'Keycloak Authenticated (OIDC)' : 'Waiting for Integration'}
          </span>
        </div>

        {/* Developer Preview Control Block */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          border: '1px solid var(--border-medium)',
          borderRadius: 'var(--radius-md)',
          padding: '3px 6px',
          gap: '8px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--text-muted)' }}>
            <AlertTriangle size={12} style={{ color: 'var(--status-warning)' }} />
            <span style={{ fontWeight: '600', color: 'var(--text-secondary)' }}>Developer Preview</span>
          </div>

          <div style={{
            display: 'flex',
            gap: '2px',
            backgroundColor: 'var(--bg-inset)',
            padding: '2px',
            borderRadius: 'var(--radius-sm)'
          }}>
            <button
              onClick={() => onToggleDevPreview(false)}
              title="View Public Landing Page"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '3px 8px',
                fontSize: '11px',
                fontWeight: '500',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: (!isDashboard && !authenticated) ? 'var(--accent-blue)' : 'transparent',
                color: (!isDashboard && !authenticated) ? '#ffffff' : 'var(--text-muted)'
              }}
            >
              <Monitor size={12} />
              Landing Page
            </button>
            <button
              onClick={() => onToggleDevPreview(true)}
              title="View Dashboard Preview mode"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                padding: '3px 8px',
                fontSize: '11px',
                fontWeight: '500',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: (isDashboard || authenticated) ? 'var(--accent-blue)' : 'transparent',
                color: (isDashboard || authenticated) ? '#ffffff' : 'var(--text-muted)'
              }}
            >
              <Code2 size={12} />
              Dashboard Preview
            </button>
          </div>
        </div>
      </div>

      {/* Right User & Actions Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Notifications Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            style={{
              background: 'transparent',
              border: '1px solid var(--border-subtle)',
              padding: '7px',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Notifications"
          >
            <Bell size={18} />
          </button>

          {showNotifications && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: 'calc(100% + 8px)',
              width: '300px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-lg)',
              padding: '12px',
              zIndex: 100
            }}>
              <div style={{ 
                fontWeight: '600', 
                marginBottom: '8px', 
                fontSize: '0.85rem',
                borderBottom: '1px solid var(--border-subtle)',
                paddingBottom: '6px'
              }}>
                IAM Session Advisories
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {authenticated 
                  ? `Authenticated session active for user ${user?.username || 'Keycloak User'}.` 
                  : 'Waiting for Keycloak SSO integration to enable real-time user notification feeds.'}
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown & Logout Control */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'var(--bg-inset)',
              border: '1px solid var(--border-subtle)',
              padding: '5px 10px',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              color: 'var(--text-primary)'
            }}
          >
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: authenticated ? 'var(--accent-blue)' : 'var(--bg-surface-hover)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              fontSize: '11px',
              color: '#ffffff'
            }}>
              {authenticated && user ? (user.fullName?.[0] || user.username?.[0] || 'U').toUpperCase() : <User size={14} />}
            </div>
            <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: '600', lineHeight: 1.1 }}>
                {authenticated && user ? user.fullName : 'Guest Session'}
              </span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                {authenticated ? (user?.roles?.[0] || 'OIDC User') : 'Unauthenticated'}
              </span>
            </div>
            <ChevronDown size={14} style={{ color: 'var(--text-muted)', marginLeft: '4px' }} />
          </button>

          {showProfileMenu && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: 'calc(100% + 8px)',
              width: '260px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-medium)',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-lg)',
              padding: '12px',
              zIndex: 100
            }}>
              {authenticated && user ? (
                <>
                  <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '8px', marginBottom: '8px' }}>
                    <div style={{ fontWeight: '600', fontSize: '0.88rem' }}>{user.fullName}</div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--accent-blue-light)', fontFamily: 'var(--font-mono)' }}>
                      {user.email || user.username}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      Realm: {user.realm}
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 12px',
                      backgroundColor: 'rgba(239, 68, 68, 0.12)',
                      color: '#f87171',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      fontSize: '0.82rem',
                      fontWeight: '600'
                    }}
                  >
                    <LogOut size={14} />
                    Logout from Stark SSO
                  </button>
                </>
              ) : (
                <>
                  <div style={{ fontWeight: '600', fontSize: '0.85rem' }}>Session Status</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--status-warning)', marginTop: '4px' }}>
                    Waiting for Keycloak SSO Login
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                    Click &quot;Login with Stark SSO&quot; to authenticate via OIDC.
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
