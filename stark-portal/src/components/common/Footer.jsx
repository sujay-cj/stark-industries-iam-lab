import React from 'react';
import { Lock, Shield } from 'lucide-react';

export function Footer() {
  return (
    <footer style={{
      backgroundColor: 'var(--bg-surface)',
      borderTop: '1px solid var(--border-subtle)',
      padding: '14px 24px',
      fontSize: '0.78rem',
      color: 'var(--text-muted)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Lock size={13} style={{ color: 'var(--status-warning)' }} />
        <span style={{ fontWeight: '600', letterSpacing: '0.04em', color: 'var(--text-secondary)' }}>
          INTERNAL USE ONLY
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span>Stark Industries Enterprise Employee Portal</span>
        <span style={{ color: 'var(--border-medium)' }}>|</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Shield size={12} style={{ color: 'var(--accent-blue)' }} />
          <span>IAM Lab Architecture</span>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span>Stark Industries</span>
        <span style={{
          backgroundColor: 'var(--bg-inset)',
          padding: '2px 6px',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-subtle)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          color: 'var(--accent-blue-light)'
        }}>
          Version 1.0
        </span>
      </div>
    </footer>
  );
}
