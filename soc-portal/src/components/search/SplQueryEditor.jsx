import React, { useState } from 'react';
import { Play, Clock, Database, Sparkles } from 'lucide-react';
import Table from '../common/Table';
import Badge from '../common/Badge';

export function SplQueryEditor({ onExecuteQuery, initialQuery = '', searchResults = null, isLoading = false }) {
  const [query, setQuery] = useState(initialQuery || 'index=* | stats count by index');
  const [timeRange, setTimeRange] = useState('Last 24 Hours');

  const handleRunSearch = (e) => {
    e.preventDefault();
    if (onExecuteQuery) {
      onExecuteQuery(query, timeRange);
    }
  };

  const sampleQueries = [
    'index=* | stats count by index',
    'index=_internal | stats count by sourcetype, host',
    'index=_audit | stats count by user, action',
    'index=_internal log_level=ERROR | head 10'
  ];

  // Dynamically extract table headers from Splunk REST results
  const getDynamicHeaders = () => {
    if (!searchResults || !searchResults.results || searchResults.results.length === 0) {
      return ['_time', 'raw'];
    }
    if (searchResults.fields && searchResults.fields.length > 0) {
      return searchResults.fields
        .map(f => typeof f === 'object' ? f.name : f)
        .filter(f => !f.startsWith('_raw'));
    }
    return Object.keys(searchResults.results[0]).filter(k => k !== '_raw');
  };

  const dynamicHeaders = getDynamicHeaders();

  return (
    <div className="space-y-4">
      {/* Editor Box */}
      <div className="bg-soc-card border border-soc-border rounded-xl p-4 shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database size={16} className="text-soc-accent" />
            <span className="text-xs font-semibold text-slate-200">SPL Search Editor (Splunk Query Engine)</span>
          </div>
          {/* Time Range Selector */}
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-slate-400" />
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-soc-inset border border-soc-border rounded px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-soc-accent"
            >
              <option>Last 15 Minutes</option>
              <option>Last 1 Hour</option>
              <option>Last 24 Hours</option>
              <option>Last 7 Days</option>
            </select>
          </div>
        </div>

        {/* Multiline Textarea Editor */}
        <textarea
          rows={4}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter SPL query (e.g. index=* | stats count by index)..."
          className="w-full bg-soc-inset border border-soc-border rounded-lg p-3 font-mono text-xs text-cyan-300 placeholder-slate-500 focus:outline-none focus:border-soc-accent transition resize-y"
        />

        {/* Preset Query Chips & Action */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2 overflow-x-auto text-[11px]">
            <span className="text-slate-400 flex items-center gap-1 shrink-0"><Sparkles size={12} /> Samples:</span>
            {sampleQueries.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => setQuery(sample)}
                className="px-2 py-0.5 rounded bg-soc-inset border border-soc-border hover:border-slate-500 text-slate-300 truncate max-w-[240px] transition"
                title={sample}
              >
                {sample}
              </button>
            ))}
          </div>

          <button
            onClick={handleRunSearch}
            disabled={isLoading}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-soc-accent hover:bg-cyan-600 text-slate-950 font-bold text-xs shadow-lg transition"
          >
            <Play size={14} className="fill-current" />
            <span>{isLoading ? 'Executing SPL...' : 'Run Search'}</span>
          </button>
        </div>
      </div>

      {/* Results Section */}
      {searchResults && (
        <div className="bg-soc-card border border-soc-border rounded-xl p-4 shadow-lg space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-soc-border">
            <div>
              <span className="font-semibold text-slate-200">Search Results</span>
              <span className="ml-2 font-mono text-[11px]">({searchResults.totalCount} events found in {searchResults.executionTimeMs || 42}ms)</span>
              {searchResults.sid && (
                <span className="ml-3 font-mono text-[10px] text-cyan-400">SID: {searchResults.sid}</span>
              )}
            </div>
            <Badge variant="info">{searchResults.timeRange}</Badge>
          </div>

          {searchResults.results && searchResults.results.length > 0 ? (
            <Table headers={dynamicHeaders}>
              {searchResults.results.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-soc-surfaceHover transition">
                  {dynamicHeaders.map((col, cIdx) => (
                    <td key={cIdx} className="px-4 py-2.5 font-mono text-xs text-slate-200">
                      {row[col] !== undefined ? String(row[col]) : '—'}
                    </td>
                  ))}
                </tr>
              ))}
            </Table>
          ) : (
            <div className="p-6 text-center text-xs text-slate-400 border border-dashed border-soc-border rounded-lg bg-soc-inset">
              No matching records returned for SPL query <code>{searchResults.query}</code> in {searchResults.timeRange}.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SplQueryEditor;
