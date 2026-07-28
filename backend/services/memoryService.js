/**
 * Memory Service - Per-User Conversation Memory Provider
 * Manages in-memory conversation history per authenticated user session.
 * Designed to be easily replaceable with Redis or PostgreSQL in future phases.
 */

// In-Memory Storage: Map<userId, Array<{ role: 'user' | 'assistant', content: string }>>
const conversationStore = new Map();

// Retention limit: Max 10 exchanges (20 total messages per user)
const MAX_MESSAGES = 20;

export const memoryService = {
  /**
   * Retrieves current conversation history for a given user ID
   * @param {string} userId Unique user identifier (JWT sub or username)
   * @returns {Array<{ role: string, content: string }>}
   */
  getHistory: (userId) => {
    if (!userId) return [];
    return conversationStore.get(userId) || [];
  },

  /**
   * Appends new exchange messages to user's conversation history
   * @param {string} userId Unique user identifier
   * @param {string} userMessage Content sent by user
   * @param {string} assistantMessage Response content from AI assistant
   */
  addExchange: (userId, userMessage, assistantMessage) => {
    if (!userId) return;

    const history = memoryService.getHistory(userId);

    const updatedHistory = [
      ...history,
      { role: 'user', content: userMessage },
      { role: 'assistant', content: assistantMessage }
    ];

    // Truncate to latest MAX_MESSAGES
    if (updatedHistory.length > MAX_MESSAGES) {
      conversationStore.set(userId, updatedHistory.slice(updatedHistory.length - MAX_MESSAGES));
    } else {
      conversationStore.set(userId, updatedHistory);
    }
  },

  /**
   * Clears conversation history for a specific user ID
   * @param {string} userId
   */
  clearHistory: (userId) => {
    if (userId) {
      conversationStore.delete(userId);
    }
  }
};

export default memoryService;
