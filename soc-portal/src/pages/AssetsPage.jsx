import React, { useState, useEffect } from 'react';
import { Server, Shield, HardDrive, Cpu, AlertTriangle } from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Table from '../components/common/Table';
import Spinner from '../components/common/Spinner';
import splunkService from '../services/splunkService';

export function AssetsPage() {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    splunkService.getAssets().then(data => {
      setAssets(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <Spinner size={32} className="py-20" />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-100">Monitored Infrastructure Assets</h1>
        <p className="text-xs text-soc-textMuted mt-0.5">
          Enterprise server hosts, Keycloak auth servers, OpenLDAP domain controllers, and K8s nodes.
        </p>
      </div>

      <Card title={`Monitored Infrastructure Inventory (${assets.length} Hosts)`}>
        <Table headers={['Asset ID', 'Hostname', 'Operating System / Service', 'IP Address', 'Group', 'Last Seen', 'Status', 'Risk Score']}>
          {assets.map((asset) => (
            <tr key={asset.id} className="hover:bg-soc-surfaceHover transition text-xs">
              <td className="px-4 py-3 font-mono text-cyan-400 font-bold">{asset.id}</td>
              <td className="px-4 py-3 font-mono font-semibold text-slate-100">{asset.hostname}</td>
              <td className="px-4 py-3 text-slate-300">{asset.os}</td>
              <td className="px-4 py-3 font-mono text-slate-400">{asset.ip}</td>
              <td className="px-4 py-3">
                <Badge variant="neutral">{asset.group}</Badge>
              </td>
              <td className="px-4 py-3 font-mono text-slate-400">{asset.lastSeen}</td>
              <td className="px-4 py-3">
                <Badge variant={asset.status === 'Online' ? 'success' : asset.status === 'Warning' ? 'warning' : 'critical'}>
                  {asset.status}
                </Badge>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-soc-inset rounded-full h-2 overflow-hidden border border-soc-border">
                    <div
                      style={{ width: `${asset.riskScore}%` }}
                      className={`h-full ${
                        asset.riskScore > 80 ? 'bg-red-500' : asset.riskScore > 60 ? 'bg-orange-500' : 'bg-emerald-500'
                      }`}
                    ></div>
                  </div>
                  <span className="font-mono text-xs font-semibold text-slate-200">{asset.riskScore}</span>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      </Card>
    </div>
  );
}

export default AssetsPage;
