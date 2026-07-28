import React from 'react';
import { FileText, BookOpen, ShieldCheck, Database, Key, Layers, ExternalLink } from 'lucide-react';
import { Badge } from '../components/common/Badge';

export function DocsPage() {
  const docs = [
    {
      title: 'OpenLDAP Directory Architecture & Schema',
      category: 'Identity Directory',
      summary: 'Specifications for LDAP OU structuring (Engineering, Admins) and user schema binding.',
      icon: Database
    },
    {
      title: 'Keycloak OIDC Federation & Realm Configuration',
      category: 'Identity Provider',
      summary: 'Integration guide for setup of client credentials, redirect URIs, and JWT mapper claims.',
      icon: Key
    },
    {
      title: 'OAuth 2.0 & Token Refresh Lifecycle',
      category: 'Authentication',
      summary: 'Standards for ID Token verification, Access Token scopes, and session invalidation.',
      icon: ShieldCheck
    },
    {
      title: 'PostgreSQL Keycloak State Database',
      category: 'Infrastructure',
      summary: 'Containerized database configuration, automated backup policies, and connection pooling.',
      icon: Layers
    }
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Internal Documentation</h1>
        <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
          Stark Industries enterprise IAM architecture guides, protocol specifications, and security policies.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '16px' }}>
        {docs.map((doc, i) => {
          const Icon = doc.icon;
          return (
            <div key={i} className="card">
              <div className="card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon size={18} style={{ color: 'var(--accent-blue-light)' }} />
                  <span className="card-title">{doc.title}</span>
                </div>
                <Badge variant="blue">{doc.category}</Badge>
              </div>
              <div className="card-body">
                <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>{doc.summary}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
