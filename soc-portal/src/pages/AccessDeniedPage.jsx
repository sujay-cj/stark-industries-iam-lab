import React from 'react';
import { ShieldAlert, Lock, LogOut, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Badge from '../components/common/Badge';

export function AccessDeniedPage() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen w-full bg-soc-bg flex items-center justify-center p-4">
      <div className="bg-soc-card border border-red-500/30 rounded-2xl p-6 sm:p-8 max-w-xl w-full shadow-[0_0_30px_rgba(239,68,68,0.15)] space-y-6 animate-fade-in">
        {/* Header Banner */}
        <div className="flex items-center justify-between pb-4 border-b border-soc-border">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400">
              <ShieldAlert size={24} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100">Access Denied</h2>
              <p className="text-xs text-slate-400">HTTP 403 Forbidden - Authorization Failed</p>
            </div>
          </div>
          <Badge variant="critical">403 FORBIDDEN</Badge>
        </div>

        {/* Notice Info Box */}
        <div className="p-4 rounded-xl bg-soc-inset border border-soc-border space-y-3 text-xs">
          <div className="flex items-start gap-3">
            <Lock size={20} className="text-red-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-slate-200">Required Group Claim Missing</div>
              <p className="text-slate-400 mt-1 leading-relaxed">
                Your authenticated account <strong className="text-cyan-400 font-mono">{user?.email || user?.username || 'Keycloak Account'}</strong> lacks the required <code>soc-portal-users</code> group claim.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-soc-border space-y-2">
            <div className="flex justify-between items-center text-[11px]">
              <span className="text-slate-500 font-mono uppercase">Required JWT Group:</span>
              <span className="font-mono text-amber-400 font-bold">soc-portal-users</span>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 text-[10px] uppercase font-mono">Groups from authenticated JWT:</span>
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {user?.groups && user.groups.length > 0 ? (
                  user.groups.map((group, idx) => (
                    <Badge key={idx} variant="neutral">
                      {group}
                    </Badge>
                  ))
                ) : (
                  <span className="text-slate-500 italic">No groups assigned.</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Guidance */}
        <div className="text-xs text-slate-400 flex items-center gap-2">
          <AlertTriangle size={14} className="text-amber-400 shrink-0" />
          <span>Contact your Keycloak IAM Security Administrator to add <code>soc-portal-users</code> to your user account.</span>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={() => logout()}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/15 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white font-semibold text-xs transition"
          >
            <LogOut size={14} />
            <span>Logout Session</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccessDeniedPage;
