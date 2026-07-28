import React, { useState, useEffect } from 'react';
import { Globe, ShieldAlert, AlertTriangle, Link as LinkIcon, FileCode, CheckCircle2 } from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Spinner from '../components/common/Spinner';
import splunkService from '../services/splunkService';

export function ThreatIntelPage() {
  const [intel, setIntel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    splunkService.getThreatIntel().then(data => {
      setIntel(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <Spinner size={32} className="py-20" />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-100">Threat Intelligence & IOC Feeds</h1>
        <p className="text-xs text-soc-textMuted mt-0.5">
          Real-time threat feeds, malicious IP blocklists, typosquatting domains, and file signatures.
        </p>
      </div>

      {/* Overview Stat Card */}
      <div className="bg-soc-card border border-soc-border p-4 rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Globe size={24} className="text-cyan-400" />
          <div>
            <div className="text-xs text-slate-400 font-medium">Active IOC Indicators</div>
            <div className="text-lg font-bold text-slate-100 font-mono">{intel?.iocFeedCount?.toLocaleString()} Total Threat Signatures</div>
          </div>
        </div>
        <Badge variant="success">CrowdStrike & Mandiant Feeds Synced</Badge>
      </div>

      {/* Grid of 4 Threat Intelligence Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Malicious IPs */}
        <Card title="Malicious IPs Blocklist" icon={ShieldAlert}>
          <div className="space-y-2">
            {intel?.maliciousIps?.map((item, i) => (
              <div key={i} className="p-3 rounded-lg bg-soc-inset border border-soc-border flex items-center justify-between text-xs">
                <div>
                  <div className="font-mono font-bold text-red-400">{item.ip}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{item.threatType} • {item.reportedBy}</div>
                </div>
                <Badge variant="critical">Conf: {item.confidence}</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Suspicious Domains */}
        <Card title="Suspicious Domains & Typosquatting" icon={AlertTriangle}>
          <div className="space-y-2">
            {intel?.domains?.map((item, i) => (
              <div key={i} className="p-3 rounded-lg bg-soc-inset border border-soc-border flex items-center justify-between text-xs">
                <div>
                  <div className="font-mono font-bold text-cyan-400">{item.domain}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{item.category}</div>
                </div>
                <Badge variant={item.risk.toLowerCase()}>{item.risk}</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Malicious URLs */}
        <Card title="Malicious URLs & Phishing Endpoints" icon={LinkIcon}>
          <div className="space-y-2">
            {intel?.urls?.map((item, i) => (
              <div key={i} className="p-3 rounded-lg bg-soc-inset border border-soc-border flex items-center justify-between text-xs">
                <div className="truncate max-w-[280px]">
                  <div className="font-mono text-slate-200 truncate">{item.url}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Target: {item.target}</div>
                </div>
                <Badge variant="critical">{item.status}</Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Malicious File Hashes (SHA-256) */}
        <Card title="Malicious Hashes (SHA-256 / YARA)" icon={FileCode}>
          <div className="space-y-2">
            {intel?.hashes?.map((item, i) => (
              <div key={i} className="p-3 rounded-lg bg-soc-inset border border-soc-border flex items-center justify-between text-xs">
                <div className="truncate max-w-[280px]">
                  <div className="font-semibold text-slate-100">{item.name}</div>
                  <div className="font-mono text-[10px] text-slate-500 truncate">{item.hash}</div>
                </div>
                <Badge variant="critical">{item.severity}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ThreatIntelPage;
