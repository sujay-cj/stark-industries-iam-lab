import React from 'react';
import { motion } from 'framer-motion';

export function AlertsOverTimeChart({ data }) {
  if (!data || data.length === 0) return null;

  // Max value calculation for scaling
  const maxVal = Math.max(...data.map(d => d.critical + d.high + d.medium + d.low));
  const height = 180;
  const width = 500;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
        <span className="font-semibold text-slate-300">24-Hour Trend Analysis</span>
        <div className="flex items-center gap-3 font-mono text-[11px]">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> Critical</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500"></span> High</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Medium</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Low</span>
        </div>
      </div>

      <div className="h-48 flex items-end gap-2 pt-4 border-b border-l border-soc-border px-2">
        {data.map((item, idx) => {
          const total = item.critical + item.high + item.medium + item.low;
          const hPercent = (total / maxVal) * 100;
          return (
            <div key={idx} className="flex-1 flex flex-col items-center gap-1 group h-full justify-end">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${hPercent}%` }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="w-full bg-soc-inset rounded-t overflow-hidden flex flex-col justify-end border border-soc-border hover:border-cyan-500 transition relative"
              >
                {/* Stacked bar visualization */}
                <div style={{ height: `${(item.critical / total) * 100}%` }} className="bg-red-500/80"></div>
                <div style={{ height: `${(item.high / total) * 100}%` }} className="bg-orange-500/80"></div>
                <div style={{ height: `${(item.medium / total) * 100}%` }} className="bg-amber-500/80"></div>
                <div style={{ height: `${(item.low / total) * 100}%` }} className="bg-emerald-500/80"></div>

                {/* Hover Tooltip */}
                <div className="opacity-0 group-hover:opacity-100 transition absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-soc-card border border-soc-borderLight p-2 rounded text-[10px] font-mono text-slate-200 whitespace-nowrap z-20 shadow-xl pointer-events-none">
                  <div>{item.time} Total: {total}</div>
                  <div className="text-red-400">Crit: {item.critical}</div>
                  <div className="text-orange-400">High: {item.high}</div>
                </div>
              </motion.div>
              <span className="text-[10px] font-mono text-slate-400">{item.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AlertsOverTimeChart;
