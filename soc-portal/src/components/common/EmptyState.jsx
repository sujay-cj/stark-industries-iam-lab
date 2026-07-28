import React from 'react';
import { ShieldOff } from 'lucide-react';

export function EmptyState({ icon: Icon = ShieldOff, title = 'No Data Available', message = 'No security records or events match the current criteria.' }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center border border-dashed border-soc-border rounded-xl bg-soc-inset">
      <Icon size={36} className="text-slate-500 mb-3" />
      <h4 className="text-sm font-semibold text-slate-200">{title}</h4>
      <p className="text-xs text-soc-textMuted mt-1 max-w-sm">{message}</p>
    </div>
  );
}

export default EmptyState;
