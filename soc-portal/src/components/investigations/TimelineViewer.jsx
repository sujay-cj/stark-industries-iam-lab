import React from 'react';
import { Clock, ShieldAlert, User, CheckCircle2, ChevronRight } from 'lucide-react';
import Badge from '../common/Badge';

export function TimelineViewer({ investigations }) {
  if (!investigations || investigations.length === 0) return null;

  return (
    <div className="space-y-6">
      {investigations.map((inc) => (
        <div key={inc.id} className="bg-soc-card border border-soc-border rounded-xl p-5 shadow-lg space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-soc-border">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-500/15 border border-red-500/30 text-red-400">
                <ShieldAlert size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-cyan-400">{inc.id}</span>
                  <Badge variant={inc.severity.toLowerCase()}>{inc.severity}</Badge>
                  <Badge variant="info">{inc.status}</Badge>
                </div>
                <h3 className="text-sm font-semibold text-slate-100 mt-1">{inc.title}</h3>
              </div>
            </div>

            <div className="text-right text-xs">
              <div className="flex items-center gap-1.5 text-slate-300">
                <User size={13} className="text-slate-400" />
                <span>Assignee: <strong>{inc.assignee}</strong></span>
              </div>
              <div className="text-[11px] text-slate-500 font-mono mt-0.5">{inc.startedAt}</div>
            </div>
          </div>

          {/* Timeline Nodes */}
          <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-soc-border">
            {inc.timeline.map((item, idx) => (
              <div key={idx} className="relative flex items-start gap-3 text-xs">
                <div className="absolute -left-6 top-0.5 w-3 h-3 rounded-full bg-cyan-500 border-2 border-soc-card shadow-[0_0_8px_rgba(6,182,212,0.8)]"></div>
                <div className="flex-1 p-3 rounded-lg bg-soc-inset border border-soc-border space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-200">{item.event}</span>
                    <span className="font-mono text-cyan-400">{item.time}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">Source: {item.source}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default TimelineViewer;
