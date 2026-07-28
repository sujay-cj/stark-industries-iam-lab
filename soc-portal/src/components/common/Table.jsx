import React from 'react';

export function Table({ headers, children, className = '' }) {
  return (
    <div className={`w-full overflow-x-auto border border-soc-border rounded-lg ${className}`}>
      <table className="w-full text-left text-xs border-collapse">
        <thead className="bg-soc-cardHeader text-slate-400 font-semibold uppercase tracking-wider border-b border-soc-border">
          <tr>
            {headers.map((header, idx) => (
              <th key={idx} className="px-4 py-3 text-xs">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-soc-border bg-soc-card text-slate-200">
          {children}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
