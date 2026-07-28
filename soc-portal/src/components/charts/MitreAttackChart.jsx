import React from 'react';
import { motion } from 'framer-motion';

export function MitreAttackChart({ data }) {
  if (!data || data.length === 0) return null;

  const maxCount = Math.max(...data.map(d => d.count));

  return (
    <div className="space-y-2.5">
      {data.map((item, idx) => {
        const percent = (item.count / maxCount) * 100;
        return (
          <div key={idx} className="p-2 rounded-lg bg-soc-inset border border-soc-border space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono text-cyan-400 font-semibold">{item.id}</span>
                <span className="text-slate-200 truncate max-w-[220px]">{item.name}</span>
              </div>
              <span className="font-mono text-slate-400 text-[11px]">{item.count} detections</span>
            </div>
            <div className="h-1.5 w-full bg-soc-card rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percent}%` }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`h-full rounded-full ${
                  item.severity === 'Critical' ? 'bg-red-500' : 'bg-orange-500'
                }`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MitreAttackChart;
