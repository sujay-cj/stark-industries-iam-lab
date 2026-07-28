import React, { useState, useEffect } from 'react';
import TimelineViewer from '../components/investigations/TimelineViewer';
import Spinner from '../components/common/Spinner';
import splunkService from '../services/splunkService';

export function InvestigationsPage() {
  const [investigations, setInvestigations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    splunkService.getInvestigations().then(data => {
      setInvestigations(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <Spinner size={32} className="py-20" />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-100">Incident Investigations Timeline</h1>
        <p className="text-xs text-soc-textMuted mt-0.5">
          Active security incident timelines, playbook actions, and evidence collation.
        </p>
      </div>

      <TimelineViewer investigations={investigations} />
    </div>
  );
}

export default InvestigationsPage;
