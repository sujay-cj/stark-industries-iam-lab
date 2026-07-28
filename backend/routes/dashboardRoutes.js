import { Router } from 'express';
import dashboardController from '../controllers/dashboardController.js';
import { requireAuth, requireGroup } from '../middleware/auth.js';

const router = Router();

// Require authentication for all dashboard routes
router.use(requireAuth());

// Require membership in soc-portal-users group claim
router.use(requireGroup('soc-portal-users'));

router.get('/overview', dashboardController.getOverview);
router.get('/recent-alerts', dashboardController.getRecentAlerts);
router.get('/top-users', dashboardController.getTopUsers);
router.get('/top-hosts', dashboardController.getTopHosts);

export default router;
