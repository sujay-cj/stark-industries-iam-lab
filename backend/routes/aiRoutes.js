import express from 'express';
import aiController from '../controllers/aiController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Enforce JWT OIDC Authentication on all AI Security Copilot Endpoints
router.use(requireAuth());

/**
 * POST /api/ai/chat
 * Payload: { "message": "What is the status of Keycloak sessions?" }
 */
router.post('/chat', aiController.chat);

export default router;
