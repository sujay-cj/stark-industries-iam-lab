import React from 'react';

export function TopIpsChart({ data }) {
  if (!data) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Top Source IPs */}
      <div className="space-y-2">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Top Source IPs (Inbound Threats)</h4>
        <div className="space-y-1.5">
          {data.sources.map((item, idx) => (
            <div key={idx} className="p-2 rounded bg-soc-inset border border-soc-border flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono text-slate-100 font-semibold">{item.ip}</span>
                <span className="text-[10px] text-slate-400">({item.country})</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <span className="text-slate-300">{item.count}</span>
                <span className={`px-1.5 py-0.2 text-[9px] rounded font-semibold ${
                  item.risk === 'Critical' ? 'bg-red-500/20 text-red-400' :
                  item.risk === 'High' ? 'bg-orange-500/20 text-orange-400' : 'bg-slate-700 text-slate-300'
                }`}>{item.risk}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Destination Services */}
      <div className="space-y-2">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Top Destination Targets</h4>
        <div className="space-y-1.5">
          {data.destinations.map((item, idx) => (
            <div key={idx} className="p-2 rounded bg-soc-inset border border-soc-border flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono text-cyan-400 font-semibold">{item.ip}</span>
                <span className="text-[11px] text-slate-300 truncate max-w-[140px]">{item.service}</span>
              </div>
              <span className="font-mono text-slate-400 text-[11px]">{item.count.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TopIpsChart;
