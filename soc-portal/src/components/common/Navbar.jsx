import React, { useState } from 'react';
import { Search, Bell, User, ChevronDown, LogOut, ExternalLink, Shield } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Badge from './Badge';

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="h-14 bg-soc-surface border-b border-soc-border px-4 flex items-center justify-between sticky top-0 z-40">
      {/* Search Input Bar */}
      <form onSubmit={handleSearchSubmit} className="relative w-80 max-w-md">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search SPL queries, IPs, hashes, or alert IDs..."
          className="w-full bg-soc-inset border border-soc-border rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-soc-accent transition"
        />
      </form>

      {/* Middle Connection Status */}
      <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-soc-inset border border-soc-border text-xs">
        <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
        <span className="text-slate-400">Keycloak OIDC Session:</span>
        <span className="text-cyan-400 font-semibold font-mono">{user?.realm || 'stark-industries'}</span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Notifications Icon Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg border border-soc-border text-slate-400 hover:text-slate-200 hover:bg-soc-surfaceHover transition relative"
            title="Notifications"
          >
            <Bell size={17} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-soc-card border border-soc-borderLight rounded-xl shadow-2xl p-4 z-50 animate-fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-soc-border">
                <span className="text-xs font-semibold text-slate-100">Security Alerts</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">2 CRITICAL</span>
              </div>
              <div className="mt-3 space-y-2 text-xs">
                <div className="p-2 rounded bg-soc-inset border border-soc-border">
                  <div className="font-semibold text-red-400">OIDC Brute Force Attempt</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Src IP: 185.220.101.5 targeting Keycloak OIDC</div>
                </div>
                <div className="p-2 rounded bg-soc-inset border border-soc-border">
                  <div className="font-semibold text-orange-400">Group Privilege Modification</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Attempted modify operation on OIDC group claim</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Requirement 7: Profile Dropdown showing Real Name, Username, Email, Groups */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 px-2.5 py-1 rounded-lg border border-soc-border bg-soc-inset text-slate-200 hover:border-soc-borderLight transition"
          >
            <div className="w-6 h-6 rounded bg-soc-accent text-slate-950 font-bold text-xs flex items-center justify-center">
              {(user?.name?.[0] || user?.username?.[0] || 'U').toUpperCase()}
            </div>
            <div className="text-left hidden sm:block">
              <div className="text-xs font-semibold leading-none">{user?.name || 'Authenticated User'}</div>
              <div className="text-[10px] text-slate-400 mt-0.5 leading-none font-mono">{user?.username || 'user'}</div>
            </div>
            <ChevronDown size={14} className="text-slate-400" />
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-2 w-72 bg-soc-card border border-soc-borderLight rounded-xl shadow-2xl p-4 z-50 animate-fade-in space-y-3">
              <div className="pb-3 border-b border-soc-border space-y-1">
                <div className="text-xs font-bold text-slate-100">{user?.name || 'Authenticated User'}</div>
                <div className="text-[11px] text-cyan-400 font-mono">User: {user?.username || '—'}</div>
                <div className="text-[11px] text-slate-400 font-mono">{user?.email || '—'}</div>
              </div>

              {/* Requirement 7: Groups from the JWT */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  Groups from authenticated JWT:
                </span>
                <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto">
                  {user?.groups && user.groups.length > 0 ? (
                    user.groups.map((group, idx) => (
                      <Badge key={idx} variant="info" className="text-[10px] py-0">
                        {group}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-xs text-slate-500 italic">No groups assigned.</span>
                  )}
                </div>
              </div>

              <div className="pt-2 border-t border-soc-border space-y-1">
                <Link
                  to="/profile"
                  onClick={() => setShowProfile(false)}
                  className="flex items-center justify-between px-2 py-1.5 rounded text-xs text-slate-300 hover:bg-soc-surfaceHover hover:text-slate-100 transition"
                >
                  <span>View Full Claims Profile</span>
                  <ExternalLink size={12} />
                </Link>

                <button
                  onClick={() => {
                    setShowProfile(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs text-red-400 hover:bg-red-500/10 transition font-semibold"
                >
                  <LogOut size={14} />
                  <span>Logout Keycloak Session</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
