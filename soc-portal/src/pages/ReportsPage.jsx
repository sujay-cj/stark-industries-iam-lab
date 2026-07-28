import React, { useState, useEffect } from 'react';
import ReportCardList from '../components/reports/ReportCardList';
import Spinner from '../components/common/Spinner';
import splunkService from '../services/splunkService';

export function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    splunkService.getReports().then(data => {
      setReports(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <Spinner size={32} className="py-20" />;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-100">Executive Security Reports</h1>
        <p className="text-xs text-soc-textMuted mt-0.5">
          Archived and generated security operations, identity audit, and compliance reports.
        </p>
      </div>

      <ReportCardList reports={reports} />
    </div>
  );
}

export default ReportsPage;
