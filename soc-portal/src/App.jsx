import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute';
import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';

import DashboardPage from './pages/DashboardPage';
import AlertsPage from './pages/AlertsPage';
import SearchPage from './pages/SearchPage';
import AiCopilotPage from './pages/AiCopilotPage';
import AssetsPage from './pages/AssetsPage';
import ThreatIntelPage from './pages/ThreatIntelPage';
import InvestigationsPage from './pages/InvestigationsPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import AccessDeniedPage from './pages/AccessDeniedPage';

function AppLayout() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-soc-bg text-slate-100">
      {/* Permanent Collapsible Left Sidebar */}
      <Sidebar />

      {/* Main Container */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <Navbar />

        {/* Scrollable View Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-soc-bg">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Access Denied Route */}
        <Route path="/403" element={<AccessDeniedPage />} />

        {/* Protected Routes Requiring soc-portal-users Group Claim */}
        <Route element={<ProtectedRoute requiredGroup="soc-portal-users" />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/copilot" element={<AiCopilotPage />} />
            <Route path="/assets" element={<AssetsPage />} />
            <Route path="/threat-intel" element={<ThreatIntelPage />} />
            <Route path="/investigations" element={<InvestigationsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Route>

        {/* Catch-all fallback */}
        <Route path="*" element={<AccessDeniedPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
