import React from 'react';

export function Card({ title, subtitle, icon: Icon, action, children, className = '' }) {
  return (
    <div className={`bg-soc-card border border-soc-border rounded-xl shadow-lg overflow-hidden flex flex-col ${className}`}>
      {(title || action) && (
        <div className="px-5 py-4 bg-soc-cardHeader border-b border-soc-border flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {Icon && <Icon size={18} className="text-soc-accent" />}
            <div>
              <h3 className="text-sm font-semibold text-slate-100 tracking-tight">{title}</h3>
              {subtitle && <p className="text-xs text-soc-textMuted mt-0.5">{subtitle}</p>}
            </div>
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-5 flex-1">{children}</div>
    </div>
  );
}

export default Card;
