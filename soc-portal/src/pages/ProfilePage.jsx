import React from 'react';
import { User, Mail, ShieldCheck, Key, Lock, CheckCircle2 } from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import { useAuth } from '../context/AuthContext';

export function ProfilePage() {
  const { user, isAuthenticated } = useAuth();

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-xl font-bold text-slate-100">Authenticated User Profile</h1>
        <p className="text-xs text-soc-textMuted mt-0.5">
          User identity, claim properties, and role entitlements decoded from Keycloak OIDC JWT.
        </p>
      </div>

      <Card title="Security Analyst Identity & JWT Claims" icon={User}>
        <div className="space-y-6">
          {/* User Banner Header */}
          <div className="p-4 rounded-xl bg-soc-inset border border-soc-border flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-soc-accent text-slate-950 font-bold text-xl flex items-center justify-center shadow-lg">
              {getInitials(user?.name || user?.username)}
            </div>
            <div className="flex-1">
              <h2 className="text-base font-bold text-slate-100">{user?.name || 'Authenticated User'}</h2>
              <p className="text-xs text-slate-400 mt-0.5">{user?.title || 'Security Analyst'}</p>
              <div className="text-[11px] font-mono text-cyan-400 mt-1">Sub: {user?.sub || 'Keycloak OIDC Subject'}</div>
            </div>
            <Badge variant={isAuthenticated ? 'success' : 'warning'}>
              {user?.sessionStatus || 'Authenticated Session'}
            </Badge>
          </div>

          {/* User Claims Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded bg-soc-inset border border-soc-border space-y-1">
              <span className="text-[10px] text-slate-500 font-mono uppercase">Username</span>
              <div className="font-mono text-slate-100 font-semibold">{user?.username || '—'}</div>
            </div>

            <div className="p-3 rounded bg-soc-inset border border-soc-border space-y-1">
              <span className="text-[10px] text-slate-500 font-mono uppercase">Email</span>
              <div className="font-mono text-cyan-400 font-semibold">{user?.email || '—'}</div>
            </div>

            <div className="p-3 rounded bg-soc-inset border border-soc-border space-y-1">
              <span className="text-[10px] text-slate-500 font-mono uppercase">Keycloak Realm</span>
              <div className="font-mono text-slate-200 font-semibold">{user?.realm || 'stark-industries'}</div>
            </div>

            <div className="p-3 rounded bg-soc-inset border border-soc-border space-y-1">
              <span className="text-[10px] text-slate-500 font-mono uppercase">Employee ID</span>
              <div className="font-mono text-slate-200 font-semibold">{user?.employeeId || 'EMP-0001'}</div>
            </div>
          </div>

          {/* Requirement 4: Groups from authenticated JWT */}
          <div className="p-4 rounded-xl bg-soc-inset border border-soc-border space-y-2">
            <span className="text-xs font-semibold text-slate-300 block">
              Groups from authenticated JWT (OIDC Claim: groups):
            </span>
            <div className="flex flex-wrap gap-2 pt-1">
              {user?.groups && user.groups.length > 0 ? (
                user.groups.map((group, idx) => (
                  <Badge key={idx} variant="info">
                    {group}
                  </Badge>
                ))
              ) : (
                <span className="text-xs text-slate-500 italic">No groups assigned.</span>
              )}
            </div>
          </div>

          {/* Keycloak Realm Roles */}
          <div className="p-4 rounded-xl bg-soc-inset border border-soc-border space-y-2">
            <span className="text-xs font-semibold text-slate-300 block">
              Keycloak Realm Roles (realm_access.roles Claim):
            </span>
            <div className="flex flex-wrap gap-2 pt-1">
              {user?.realmRoles && user.realmRoles.length > 0 ? (
                user.realmRoles.map((role, idx) => (
                  <Badge key={idx} variant="success">
                    {role}
                  </Badge>
                ))
              ) : (
                <span className="text-xs text-slate-500 italic">No roles assigned.</span>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ProfilePage;
