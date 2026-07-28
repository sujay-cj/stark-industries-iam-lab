import React from 'react';
import { GitBranch, Lock, Shield, Star, GitCommit } from 'lucide-react';
import { Badge } from '../components/common/Badge';

export function RepositoriesPage() {
  const repos = [
    { name: 'stark-industries-iam-platform', visibility: 'Internal', lang: 'Docker / React / LDAP', stars: 128, updated: '2 hours ago' },
    { name: 'stark-sec/sec-ops-ui', visibility: 'Private', lang: 'JavaScript / Vite', stars: 45, updated: '1 day ago' },
    { name: 'stark-sec/container-guard', visibility: 'Private', lang: 'Go / K8s', stars: 89, updated: '3 days ago' },
    { name: 'stark-sec/threat-intel', visibility: 'Internal', lang: 'Python / FastAPI', stars: 67, updated: '5 days ago' }
  ];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1400px', margin: '0 auto' }}>
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Repositories</h1>
        <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
          Enterprise code repositories governed by GitHub Administrator permissions.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {repos.map((repo, idx) => (
          <div key={idx} className="card">
            <div className="card-body" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <GitBranch size={20} style={{ color: 'var(--accent-blue-light)' }} />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--text-primary)' }}>{repo.name}</span>
                    <Badge variant="neutral">{repo.visibility}</Badge>
                  </div>
                  <div style={{ display: 'flex', gap: '16px', marginTop: '6px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    <span>Language: {repo.lang}</span>
                    <span>Updated {repo.updated}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '0.84rem' }}>
                <Star size={14} />
                <span>{repo.stars}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
