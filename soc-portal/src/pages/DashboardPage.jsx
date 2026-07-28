import React, { useEffect, useState } from 'react';
import { Activity, ShieldAlert, AlertTriangle, KeyRound, Database, RefreshCw } from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Table from '../components/common/Table';
import Spinner from '../components/common/Spinner';
import AlertsOverTimeChart from '../components/charts/AlertsOverTimeChart';
import EventDistributionChart from '../components/charts/EventDistributionChart';
import MitreAttackChart from '../components/charts/MitreAttackChart';
import TopIpsChart from '../components/charts/TopIpsChart';
import splunkService from '../services/splunkService';
import { useAuth } from '../context/AuthContext';

export function DashboardPage() {
  const { token } = useAuth();
  const [metrics, setMetrics] = useState(null);
  const [overTimeData, setOverTimeData] = useState([]);
  const [distribution, setDistribution] = useState([]);
  const [mitreData, setMitreData] = useState([]);
  const [topIps, setTopIps] = useState(null);
  const [recentAlerts, setRecentAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDashboardData = () => {
    setLoading(true);
    Promise.all([
      splunkService.getDashboardMetrics(token),
      splunkService.getAlertsOverTime(token),
      splunkService.getEventDistribution(token),
      splunkService.getMitreTechniques(token),
      splunkService.getTopIps(token),
      splunkService.getAlerts({}, token)
    ]).then(([m, ot, dist, mitre, ips, alerts]) => {
      setMetrics(m);
      setOverTimeData(ot);
      setDistribution(dist);
      setMitreData(mitre);
      setTopIps(ips);
      setRecentAlerts(alerts);
      setLoading(false);
    }).catch(err => {
      console.error("[DashboardPage Error]", err);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadDashboardData();
  }, [token]);

  if (loading) return <Spinner size={32} className="py-20" />;

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-100 tracking-tight">Keycloak IAM Security & Telemetry SOC</h1>
          <p className="text-xs text-soc-textMuted mt-0.5">
            Real-time Keycloak OIDC authentication logs, token errors, and LDAP federation events (<code className="text-cyan-400 font-mono">index=keycloak</code>).
          </p>
        </div>
        <button
          onClick={loadDashboardData}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-soc-inset border border-soc-border hover:bg-soc-surfaceHover text-xs text-slate-200 font-semibold transition"
        >
          <RefreshCw size={14} /> Refresh IAM Logs
        </button>
      </div>

      {/* Top 5 Keycloak IAM Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-soc-card border border-soc-border p-4 rounded-xl flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Keycloak Logs</div>
            <div className="text-xl font-bold text-slate-100 font-mono mt-1">{metrics?.eventsToday}</div>
          </div>
          <div className="p-2.5 rounded-lg bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
            <Activity size={20} />
          </div>
        </div>

        <div className="bg-soc-card border border-red-500/30 p-4 rounded-xl flex items-center justify-between shadow-[0_0_15px_rgba(239,68,68,0.1)]">
          <div>
            <div className="text-[11px] font-semibold text-red-400 uppercase tracking-wider">Auth & Code Errors</div>
            <div className="text-xl font-bold text-red-400 font-mono mt-1">{metrics?.criticalAlerts}</div>
          </div>
          <div className="p-2.5 rounded-lg bg-red-500/15 text-red-400 border border-red-500/30">
            <ShieldAlert size={20} />
          </div>
        </div>

        <div className="bg-soc-card border border-orange-500/30 p-4 rounded-xl flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-orange-400 uppercase tracking-wider">Session & Token Events</div>
            <div className="text-xl font-bold text-orange-400 font-mono mt-1">{metrics?.highAlerts}</div>
          </div>
          <div className="p-2.5 rounded-lg bg-orange-500/15 text-orange-400 border border-orange-500/30">
            <AlertTriangle size={20} />
          </div>
        </div>

        <div className="bg-soc-card border border-amber-500/30 p-4 rounded-xl flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">Login Errors</div>
            <div className="text-xl font-bold text-amber-400 font-mono mt-1">{metrics?.mediumAlerts}</div>
          </div>
          <div className="p-2.5 rounded-lg bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <KeyRound size={20} />
          </div>
        </div>

        <div className="bg-soc-card border border-emerald-500/30 p-4 rounded-xl flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">LDAP Sync Events</div>
            <div className="text-xl font-bold text-emerald-400 font-mono mt-1">{metrics?.lowAlerts}</div>
          </div>
          <div className="p-2.5 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <Database size={20} />
          </div>
        </div>
      </div>

      {/* Main Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Keycloak IAM Activity Over Time" subtitle="24-Hour Event Timeline" className="lg:col-span-2">
          <AlertsOverTimeChart data={overTimeData} />
        </Card>
        <Card title="Ingestion Sourcetype" subtitle="Keycloak Container Logs">
          <EventDistributionChart data={distribution} />
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Keycloak Log Sourcetypes" subtitle="Indexed Telemetry Formats">
          <MitreAttackChart data={mitreData} />
        </Card>
        <Card title="Keycloak Client & Host Origins" subtitle="Monitored OIDC Clients & Container IPs">
          <TopIpsChart data={topIps} />
        </Card>
      </div>

      {/* Recent Keycloak IAM Event Feed Table */}
      <Card title="Keycloak Container Live Log Feed" subtitle="Real-time authentication, session, and LDAP sync event stream (index=keycloak)">
        <Table headers={['Time', 'Status', 'Client', 'Realm', 'Event Summary', 'Ingest']}>
          {recentAlerts.map((alert) => (
            <tr key={alert.id} className="hover:bg-soc-surfaceHover transition text-xs">
              <td className="px-4 py-3 font-mono text-slate-400">{alert.time}</td>
              <td className="px-4 py-3">
                <Badge variant={alert.severity === 'Critical' ? 'critical' : 'info'}>{alert.severity}</Badge>
              </td>
              <td className="px-4 py-3 font-mono text-slate-100 font-semibold">{alert.source}</td>
              <td className="px-4 py-3 font-mono text-cyan-400">{alert.destination}</td>
              <td className="px-4 py-3 text-slate-200 font-medium truncate max-w-[400px]">{alert.rule}</td>
              <td className="px-4 py-3">
                <Badge variant="success">{alert.status}</Badge>
              </td>
            </tr>
          ))}
        </Table>
      </Card>
    </div>
  );
}

export default DashboardPage;
