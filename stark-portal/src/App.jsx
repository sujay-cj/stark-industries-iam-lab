import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { Navbar } from './components/common/Navbar';
import { Sidebar } from './components/common/Sidebar';
import { Footer } from './components/common/Footer';
import { AccessDenied } from './components/common/AccessDenied';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { DocsPage } from './pages/DocsPage';
import { RepositoriesPage } from './pages/RepositoriesPage';
import { TeamsPage } from './pages/TeamsPage';
import { SettingsPage } from './pages/SettingsPage';

export function App() {
  // Consume Keycloak authentication and group authorization helper from AuthContext
  const { authenticated, hasGroup, login, devPreviewActive, setDevPreviewActive } = useAuth();
  
  // Active sidebar tab state
  const [activeTab, setActiveTab] = useState('dashboard');

  // Handle SSO Login
  const handleSsoLogin = async () => {
    await login();
  };

  // Check required group authorization claim from Keycloak JWT (stark-groups client scope)
  // Required LDAP Group: employee-portal-users
  const isAuthorized = authenticated ? hasGroup('employee-portal-users') : true;

  // Determine active view:
  const isShowingDashboard = authenticated || devPreviewActive;

  // Toggle Developer Preview override
  const handleToggleDevPreview = (showDashboardPreview) => {
    setDevPreviewActive(showDashboardPreview);
  };

  // Render sub-page content based on activeTab
  const renderDashboardContent = () => {
    // Group-Based Authorization Guard:
    // If authenticated via Keycloak but missing employee-portal-users group claim, block access.
    if (authenticated && !isAuthorized) {
      return <AccessDenied />;
    }

    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'docs':
        return <DocsPage />;
      case 'repositories':
        return <RepositoriesPage />;
      case 'teams':
        return <TeamsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="app-container">
      {/* Top Navbar */}
      <Navbar 
        isDashboard={isShowingDashboard}
        isDevPreview={devPreviewActive && !authenticated}
        onToggleDevPreview={handleToggleDevPreview}
      />

      {/* Main App Container */}
      {!isShowingDashboard ? (
        <LandingPage 
          onSsoLogin={handleSsoLogin}
          onNavigateDashboard={() => setDevPreviewActive(true)}
        />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
          <div className="app-main">
            {/* Sidebar Navigation */}
            <Sidebar 
              activeTab={activeTab} 
              onTabChange={setActiveTab} 
            />

            {/* Scrollable Content Area */}
            <main className="content-area">
              {renderDashboardContent()}
            </main>
          </div>

          {/* Enterprise Footer */}
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
