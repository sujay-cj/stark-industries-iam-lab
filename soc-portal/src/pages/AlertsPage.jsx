import React, { useState, useEffect } from 'react';
import { ShieldAlert, Search, Filter, ChevronDown, ChevronUp, Eye, CheckCircle2 } from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Table from '../components/common/Table';
import Spinner from '../components/common/Spinner';
import splunkService from '../services/splunkService';
import { useAuth } from '../context/AuthContext';

export function AlertsPage() {
  const { token } = useAuth();
  const [alerts, setAlerts] = useState([]);
  const [severityFilter, setSeverityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    splunkService.getAlerts({ severity: severityFilter, status: statusFilter, search: searchTerm }, token)
      .then(data => {
        setAlerts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("[AlertsPage Error]", err);
        setLoading(false);
      });
  }, [severityFilter, statusFilter, searchTerm, token]);

  const toggleRow = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-100">Security Alerts Management</h1>
        <p className="text-xs text-soc-textMuted mt-0.5">
          SIEM detection rules, threat incidents, and severity classifications.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-soc-card border border-soc-border rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-72">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search rules, IP, ID..."
            className="w-full bg-soc-inset border border-soc-border rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-soc-accent"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Filter size={14} />
            <span>Severity:</span>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="bg-soc-inset border border-soc-border rounded px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-soc-accent"
            >
              <option>All</option>
              <option>Critical</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-soc-inset border border-soc-border rounded px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-soc-accent"
            >
              <option>All</option>
              <option>New</option>
              <option>Investigating</option>
              <option>Resolved</option>
              <option>False Positive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Alerts Table with Row Expansion */}
      {loading ? (
        <Spinner size={32} className="py-12" />
      ) : (
        <Card title={`Filtered Alerts (${alerts.length})`}>
          <Table headers={['', 'ID', 'Time', 'Severity', 'Rule', 'Source', 'Destination', 'Status']}>
            {alerts.map((alert) => (
              <React.Fragment key={alert.id}>
                <tr
                  onClick={() => toggleRow(alert.id)}
                  className="hover:bg-soc-surfaceHover transition cursor-pointer text-xs"
                >
                  <td className="px-3 py-3 text-slate-400">
                    {expandedId === alert.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </td>
                  <td className="px-4 py-3 font-mono font-bold text-cyan-400">{alert.id}</td>
                  <td className="px-4 py-3 font-mono text-slate-400">{alert.time}</td>
                  <td className="px-4 py-3">
                    <Badge variant={alert.severity?.toLowerCase()}>{alert.severity}</Badge>
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-100">{alert.rule}</td>
                  <td className="px-4 py-3 font-mono text-slate-200">{alert.source}</td>
                  <td className="px-4 py-3 font-mono text-slate-300">{alert.destination}</td>
                  <td className="px-4 py-3">
                    <Badge variant={alert.status === 'Resolved' ? 'success' : alert.status === 'Investigating' ? 'warning' : 'info'}>
                      {alert.status}
                    </Badge>
                  </td>
                </tr>

                {/* Expanded Row Detail Drawer */}
                {expandedId === alert.id && (
                  <tr className="bg-soc-inset/60 border-b border-soc-border">
                    <td colSpan={8} className="px-6 py-4">
                      <div className="p-4 rounded-lg bg-soc-card border border-soc-borderLight space-y-3 text-xs">
                        <div className="flex justify-between items-center pb-2 border-b border-soc-border">
                          <span className="font-semibold text-slate-200">Alert Deep Detail ({alert.id})</span>
                          <span className="font-mono text-cyan-400">{alert.technique || 'T1078'}</span>
                        </div>
                        <p className="text-slate-300 leading-relaxed">{alert.description || 'Splunk Security Telemetry Incident.'}</p>
                        <div className="flex gap-4 font-mono text-[11px] text-slate-400 pt-2">
                          <span>Rule ID: SOC-R-89102</span>
                          <span>Category: Authentication Security</span>
                          <span>Target: Enterprise IAM Domain</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </Table>
        </Card>
      )}
    </div>
  );
}

export default AlertsPage;
