import { Router } from 'express';
import splunkController from '../controllers/splunkController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// All Splunk REST routes are protected via requireAuth()
router.use(requireAuth());

router.get('/server-info', splunkController.getServerInfo);
router.get('/apps', splunkController.getApps);
router.get('/indexes', splunkController.getIndexes);
router.get('/saved-searches', splunkController.getSavedSearches);
router.get('/search', splunkController.executeSearch);

export default router;
