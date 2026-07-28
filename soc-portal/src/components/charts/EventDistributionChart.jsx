import React from 'react';
import { motion } from 'framer-motion';

export function EventDistributionChart({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="space-y-3">
      {data.map((item, idx) => (
        <div key={idx} className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="font-medium text-slate-200">{item.category}</span>
            <div className="flex items-center gap-2 font-mono text-[11px]">
              <span className="text-slate-400">{item.count.toLocaleString()}</span>
              <span className="text-cyan-400 font-semibold">{item.percentage}%</span>
            </div>
          </div>
          <div className="h-2 w-full bg-soc-inset rounded-full overflow-hidden border border-soc-border">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${item.percentage}%` }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              style={{ backgroundColor: item.color }}
              className="h-full rounded-full"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default EventDistributionChart;
