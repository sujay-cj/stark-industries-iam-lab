import splunkService from '../services/splunkService.js';

export const dashboardController = {
  // GET /api/dashboard/overview
  // Aggregates real Splunk SPL searches into a single payload for the React SOC Portal
  getOverview: async (req, res, next) => {
    try {
      const [
        eventsToday,
        criticalAlerts,
        highAlerts,
        loginAttempts,
        auditAdds,
        topUsers,
        topHosts,
        recentAlerts,
        mitreData,
        distribution
      ] = await Promise.all([
        splunkService.getEventsTodayCount(),
        splunkService.getCriticalAlertsCount(),
        splunkService.getHighAlertsCount(),
        splunkService.getLoginAttemptsCount(),
        splunkService.getAuditAddsCount(),
        splunkService.getTopUsers(),
        splunkService.getTopHosts(),
        splunkService.getRecentAlerts(),
        splunkService.getAuditActions(),
        splunkService.getEventDistribution()
      ]);

      res.json({
        success: true,
        data: {
          metrics: {
            eventsToday,
            criticalAlerts,
            highAlerts,
            mediumAlerts: loginAttempts,
            lowAlerts: auditAdds
          },
          topUsers,
          topHosts,
          recentAlerts,
          mitreData,
          distribution,
          userContext: req.user ? {
            username: req.user.username,
            groups: req.user.groups,
            roles: req.user.roles
          } : null
        }
      });
    } catch (err) {
      next(err);
    }
  },

  // GET /api/dashboard/recent-alerts
  getRecentAlerts: async (req, res, next) => {
    try {
      const alerts = await splunkService.getRecentAlerts();
      res.json({ success: true, data: alerts });
    } catch (err) {
      next(err);
    }
  },

  // GET /api/dashboard/top-users
  getTopUsers: async (req, res, next) => {
    try {
      const users = await splunkService.getTopUsers();
      res.json({ success: true, data: users });
    } catch (err) {
      next(err);
    }
  },

  // GET /api/dashboard/top-hosts
  getTopHosts: async (req, res, next) => {
    try {
      const hosts = await splunkService.getTopHosts();
      res.json({ success: true, data: hosts });
    } catch (err) {
      next(err);
    }
  }
};

export default dashboardController;
