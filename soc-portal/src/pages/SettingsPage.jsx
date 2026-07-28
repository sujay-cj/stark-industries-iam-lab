import React from 'react';
import { Settings, Shield, Sliders, Bell, Database } from 'lucide-react';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';

export function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-xl font-bold text-slate-100">SOC Portal Settings & Integration Endpoint Spec</h1>
        <p className="text-xs text-soc-textMuted mt-0.5">
          Enterprise Security Sentinel UI configuration parameters and backend service endpoints.
        </p>
      </div>

      {/* Enterprise Dark Theme Info */}
      <Card title="Portal Visual Theme" icon={Settings}>
        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between p-3 rounded bg-soc-inset border border-soc-border">
            <div>
              <div className="font-semibold text-slate-200">Active Theme: Sentinel Dark Slate</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Standard high-contrast dark theme optimized for SOC Operations Centers.</div>
            </div>
            <Badge variant="info">Polished Dark Theme Enabled</Badge>
          </div>
        </div>
      </Card>

      {/* Backend & Integration Endpoints Spec */}
      <Card title="Integration Service Endpoints (Target Specs)" icon={Database}>
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded bg-soc-inset border border-soc-border space-y-1">
              <span className="text-[10px] text-slate-500 font-mono uppercase">Keycloak OIDC Target</span>
              <div className="font-mono text-cyan-400 font-semibold">http://localhost:8080/realms/stark</div>
            </div>
            <div className="p-3 rounded bg-soc-inset border border-soc-border space-y-1">
              <span className="text-[10px] text-slate-500 font-mono uppercase">Splunk REST API Target</span>
              <div className="font-mono text-cyan-400 font-semibold">https://localhost:8089/services/search/jobs</div>
            </div>
            <div className="p-3 rounded bg-soc-inset border border-soc-border space-y-1">
              <span className="text-[10px] text-slate-500 font-mono uppercase">Express Backend API Target</span>
              <div className="font-mono text-cyan-400 font-semibold">http://localhost:5000/api/v1/soc</div>
            </div>
            <div className="p-3 rounded bg-soc-inset border border-soc-border space-y-1">
              <span className="text-[10px] text-slate-500 font-mono uppercase">Required JWT Group Scope</span>
              <div className="font-mono text-amber-400 font-semibold">soc-portal-users</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default SettingsPage;
