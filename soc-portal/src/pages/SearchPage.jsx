import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SplQueryEditor from '../components/search/SplQueryEditor';
import splunkService from '../services/splunkService';
import { useAuth } from '../context/AuthContext';

export function SearchPage() {
  const { token } = useAuth();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || 'index=_internal | head 10';
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleExecuteQuery = (query, timeRange) => {
    setLoading(true);
    splunkService.executeSplQuery(query, timeRange, token)
      .then(res => {
        setResults(res);
        setLoading(false);
      })
      .catch(err => {
        console.error("[SearchPage Error]", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    handleExecuteQuery(initialQuery, 'Last 24 Hours');
  }, [initialQuery, token]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-slate-100">Splunk Log Search & SPL Query Editor</h1>
        <p className="text-xs text-soc-textMuted mt-0.5">
          Execute Search Processing Language (SPL) commands directly against Express & Splunk Enterprise REST API.
        </p>
      </div>

      <SplQueryEditor
        initialQuery={initialQuery}
        onExecuteQuery={handleExecuteQuery}
        searchResults={results}
        isLoading={loading}
      />
    </div>
  );
}

export default SearchPage;
