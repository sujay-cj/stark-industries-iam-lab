import splunkService from '../services/splunkService.js';

export const splunkController = {
  // GET /api/splunk/server-info
  getServerInfo: async (req, res, next) => {
    try {
      const data = await splunkService.getServerInfo();
      res.json({
        success: true,
        data: data
      });
    } catch (err) {
      next(err);
    }
  },

  // GET /api/splunk/apps
  getApps: async (req, res, next) => {
    try {
      const data = await splunkService.getApps();
      res.json({
        success: true,
        data: data
      });
    } catch (err) {
      next(err);
    }
  },

  // GET /api/splunk/indexes
  getIndexes: async (req, res, next) => {
    try {
      const data = await splunkService.getIndexes();
      res.json({
        success: true,
        data: data
      });
    } catch (err) {
      next(err);
    }
  },

  // GET /api/splunk/saved-searches
  getSavedSearches: async (req, res, next) => {
    try {
      const data = await splunkService.getSavedSearches();
      res.json({
        success: true,
        data: data
      });
    } catch (err) {
      next(err);
    }
  },

  // GET /api/splunk/search?search=<spl>&timeRange=<range>
  executeSearch: async (req, res, next) => {
    try {
      const query = req.query.search || req.query.q || 'index=* | stats count by index';
      const timeRangeInput = req.query.timeRange || req.query.earliest || 'Last 24 Hours';

      // Map UI time range selection to Splunk earliest_time syntax
      let earliestTime = '-24h';
      if (timeRangeInput === 'Last 15 Minutes') earliestTime = '-15m';
      else if (timeRangeInput === 'Last 1 Hour') earliestTime = '-1h';
      else if (timeRangeInput === 'Last 24 Hours') earliestTime = '-24h';
      else if (timeRangeInput === 'Last 7 Days') earliestTime = '-7d';
      else if (timeRangeInput.startsWith('-')) earliestTime = timeRangeInput;

      console.log(`[SplunkController] Request received for query: "${query}" (TimeRange: ${timeRangeInput} -> ${earliestTime})`);

      const results = await splunkService.executeSearch(query, earliestTime, 'now');
      res.json({
        success: true,
        data: results
      });
    } catch (err) {
      next(err);
    }
  }
};

export default splunkController;
