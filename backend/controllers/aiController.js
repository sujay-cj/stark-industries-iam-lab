import orchestratorService from '../services/orchestratorService.js';

export const aiController = {
  /**
   * POST /api/ai/chat
   * Request Body: { "message": "..." }
   * Response: { "success": true, "response": "..." }
   */
  chat: async (req, res, next) => {
    try {
      const { message, mode, systemPrompt } = req.body;

      // 1. Validate request body
      if (!message || typeof message !== 'string' || message.trim().length === 0) {
        return res.status(400).json({
          success: false,
          error: 'Bad Request',
          message: 'The "message" string field is required and cannot be empty.'
        });
      }

      // 2. Extract authenticated user identifier from JWT context
      const userId = req.user?.username || req.user?.preferred_username || req.user?.sub || 'default-analyst';

      // 3. Delegate execution to AI Orchestrator Layer
      const responseText = await orchestratorService.processChatMessage({
        userId,
        message: message.trim(),
        mode,
        systemPrompt
      });

      // 4. Return clean JSON response matching API contract
      res.json({
        success: true,
        response: responseText
      });
    } catch (err) {
      next(err);
    }
  }
};

export default aiController;
