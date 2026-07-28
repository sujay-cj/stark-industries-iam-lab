import contextService from './contextService.js';
import memoryService from './memoryService.js';
import geminiService from './geminiService.js';
import { CAPABILITY_PROMPTS } from '../config/prompts.js';

/**
 * AI Orchestrator Service - JARVIS Operational Capability Router
 * Routes user queries to specific capability prompts (IAM Explanation, SPL Generation, Search Result Analysis)
 * while managing context assembly and conversation memory.
 */
export const orchestratorService = {
  /**
   * Automatically detects intent mode if not explicitly provided
   */
  detectCapabilityMode: (message, explicitMode) => {
    if (explicitMode && CAPABILITY_PROMPTS[explicitMode]) {
      return explicitMode;
    }

    if (!message || typeof message !== 'string') {
      return 'COPILOT_DEFAULT';
    }

    const msgLower = message.toLowerCase();

    // 1. SPL Generation Intent Detection
    if (
      msgLower.includes('spl') ||
      msgLower.includes('query') ||
      msgLower.includes('show failed logins') ||
      msgLower.includes('show logins') ||
      msgLower.includes('show events') ||
      msgLower.includes('search for') ||
      msgLower.includes('generate search')
    ) {
      return 'GENERATE_SPL';
    }

    // 2. Search Result Analysis Intent Detection
    if (
      msgLower.includes('analyze') ||
      msgLower.includes('summarize') ||
      msgLower.includes('findings') ||
      msgLower.includes('results')
    ) {
      return 'ANALYZE_RESULTS';
    }

    // 3. IAM Concept Explanation Intent Detection
    if (
      msgLower.includes('explain') ||
      msgLower.includes('what is') ||
      msgLower.includes('how does') ||
      msgLower.includes('login_error') ||
      msgLower.includes('code_to_token') ||
      msgLower.includes('oidc') ||
      msgLower.includes('jwt')
    ) {
      return 'EXPLAIN_IAM';
    }

    return 'COPILOT_DEFAULT';
  },

  /**
   * Main entry point for processing JARVIS Operational requests
   */
  processChatMessage: async ({ userId, message, mode, systemPrompt }) => {
    // 1. Determine active capability mode and system prompt
    const detectedMode = orchestratorService.detectCapabilityMode(message, mode);
    let activeSystemPrompt = CAPABILITY_PROMPTS[detectedMode] || CAPABILITY_PROMPTS.COPILOT_DEFAULT;

    if (systemPrompt && typeof systemPrompt === 'string') {
      activeSystemPrompt = systemPrompt;
    }

    // 2. Load persistent project context
    const contextText = contextService.getPersistentContext();

    // 3. Load user conversation memory history
    const history = memoryService.getHistory(userId);

    // 4. Dispatch assembled payload to Gemini reasoning engine
    const responseText = await geminiService.generateResponse({
      systemPrompt: activeSystemPrompt,
      context: contextText,
      history: history,
      message: message
    });

    // 5. Record exchange in user conversation memory
    if (userId && responseText) {
      memoryService.addExchange(userId, message, responseText);
    }

    // 6. Return generated response
    return responseText;
  }
};

export default orchestratorService;
