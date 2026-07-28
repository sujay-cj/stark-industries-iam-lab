import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShieldAlert, 
  Search, 
  Sparkles,
  Server, 
  Globe, 
  Briefcase, 
  FileText, 
  Settings, 
  User, 
  ChevronLeft, 
  ChevronRight,
  Shield
} from 'lucide-react';

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/alerts', label: 'Alerts', icon: ShieldAlert },
    { path: '/search', label: 'Search (SPL)', icon: Search },
    { path: '/copilot', label: 'JARVIS Copilot', icon: Sparkles },
    { path: '/assets', label: 'Assets', icon: Server },
    { path: '/threat-intel', label: 'Threat Intelligence', icon: Globe },
    { path: '/investigations', label: 'Investigations', icon: Briefcase },
    { path: '/reports', label: 'Reports', icon: FileText },
    { path: '/settings', label: 'Settings', icon: Settings },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <aside className={`bg-soc-surface border-r border-soc-border flex flex-col justify-between transition-all duration-200 z-30 select-none ${collapsed ? 'w-16' : 'w-60'}`}>
      {/* Top Branding */}
      <div>
        <div className="h-14 px-4 flex items-center justify-between border-b border-soc-border">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center shrink-0">
              <Shield size={18} className="text-cyan-400" />
            </div>
            {!collapsed && (
              <div className="flex flex-col whitespace-nowrap">
                <span className="text-sm font-bold text-slate-100 tracking-wider">STARK SOC</span>
                <span className="text-[10px] text-cyan-400 font-mono">SENTINEL PORTAL</span>
              </div>
            )}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded bg-soc-inset border border-soc-border text-slate-400 hover:text-slate-200 transition"
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition font-medium ${
                    isActive
                      ? 'bg-soc-surfaceHover text-cyan-400 border-l-2 border-cyan-400 font-semibold'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-soc-inset'
                  } ${collapsed ? 'justify-center px-0' : ''}`
                }
                title={collapsed ? item.label : undefined}
              >
                <Icon size={18} className="shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer Info */}
      {!collapsed && (
        <div className="p-3 m-2 rounded-lg bg-soc-inset border border-soc-border text-[11px] text-slate-400 space-y-1">
          <div className="flex items-center justify-between font-semibold text-slate-300">
            <span>Stark SOC Engine</span>
            <span className="font-mono text-[10px] text-cyan-400">v3.0</span>
          </div>
          <p className="text-[10px] text-slate-500">JARVIS Intelligence & Splunk active.</p>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
