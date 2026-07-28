import React, { useState } from 'react';
import { FileText, Download, Eye, Calendar, User, CheckCircle2 } from 'lucide-react';
import Badge from '../common/Badge';
import Modal from '../common/Modal';

export function ReportCardList({ reports }) {
  const [selectedReport, setSelectedReport] = useState(null);

  if (!reports || reports.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {reports.map((rep) => (
        <div key={rep.id} className="bg-soc-card border border-soc-border rounded-xl p-5 shadow-lg flex flex-col justify-between space-y-4 hover:border-soc-borderLight transition">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-cyan-400 font-semibold">{rep.id}</span>
              <Badge variant="info">{rep.category}</Badge>
            </div>
            <h3 className="text-sm font-semibold text-slate-100">{rep.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{rep.description}</p>
          </div>

          <div className="pt-3 border-t border-soc-border space-y-3">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1"><Calendar size={12} /> {rep.period}</span>
              <span className="flex items-center gap-1"><User size={12} /> {rep.author}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedReport(rep)}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded bg-soc-inset border border-soc-border text-slate-200 hover:bg-soc-surfaceHover text-xs font-semibold transition"
              >
                <Eye size={14} /> View Report
              </button>
              <button
                onClick={() => alert(`Report download placeholder for ${rep.id}`)}
                className="p-1.5 rounded bg-soc-accent/15 border border-soc-accent/30 text-cyan-400 hover:bg-soc-accent hover:text-slate-950 text-xs transition"
                title="Download Report (Placeholder)"
              >
                <Download size={14} />
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Report Preview Modal */}
      <Modal
        isOpen={Boolean(selectedReport)}
        onClose={() => setSelectedReport(null)}
        title={selectedReport?.title || 'Report Preview'}
      >
        {selectedReport && (
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-lg bg-soc-inset border border-soc-border space-y-2">
              <div className="flex justify-between font-mono">
                <span className="text-slate-400">Report ID: {selectedReport.id}</span>
                <span className="text-cyan-400">Period: {selectedReport.period}</span>
              </div>
              <div className="text-slate-300 font-semibold text-sm">{selectedReport.title}</div>
              <p className="text-slate-400 leading-relaxed">{selectedReport.description}</p>
            </div>

            <div className="p-4 rounded-lg bg-soc-card border border-soc-border space-y-3">
              <h4 className="font-semibold text-slate-200">Executive Summary Highlights</h4>
              <ul className="list-disc list-inside space-y-1 text-slate-400">
                <li>Total Security Events Analyzed: 1,482,910</li>
                <li>Critical Threat Escalations: 14 (100% Contained)</li>
                <li>OIDC & LDAP SSO Authentication Availability: 99.98%</li>
                <li>Zero-Trust Policy Enforcement via Keycloak & OpenLDAP</li>
              </ul>
            </div>

            <div className="p-3 bg-soc-inset rounded border border-soc-border text-[11px] text-slate-500 font-mono text-center">
              Backend Report Export Integration Ready (PDF / CSV Service Target)
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default ReportCardList;
