import https from 'https';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { DEFAULT_MODEL } from '../config/prompts.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure all environment locations are scanned for GEMINI_API_KEY
dotenv.config({ path: path.join(__dirname, '../../.env') });
dotenv.config({ path: path.join(__dirname, '../.env') });

/**
 * Gemini Service - Direct REST API implementation (bypasses SDK retry-on-429 hang)
 * Uses raw HTTPS to the v1beta REST endpoint for reliable, fast responses.
 */
export const geminiService = {
  /**
   * Makes a raw HTTPS POST to the Gemini v1beta REST API.
   * Returns a Promise that resolves to the response text or rejects on error/timeout.
   */
  _callGeminiRest: (modelName, requestBody, apiKey, timeoutMs = 25000) => {
    return new Promise((resolve, reject) => {
      const bodyStr = JSON.stringify(requestBody);
      const options = {
        hostname: 'generativelanguage.googleapis.com',
        path: `/v1beta/models/${modelName}:generateContent`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(bodyStr),
          'X-goog-api-key': apiKey
        }
      };

      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            if (res.statusCode === 200 && parsed.candidates?.[0]?.content?.parts?.[0]?.text) {
              resolve(parsed.candidates[0].content.parts[0].text);
            } else if (res.statusCode === 429) {
              const retryAfter = parsed.error?.details?.find(d => d.retryDelay)?.retryDelay || '60s';
              reject(new Error(`Rate limit exceeded (429). Retry after ${retryAfter}. You may have hit the free tier daily quota.`));
            } else if (res.statusCode === 404) {
              reject(new Error(`Model '${modelName}' not found (404). It may not be available for your API key tier.`));
            } else if (res.statusCode === 403) {
              reject(new Error(`API key unauthorized (403). Check your GEMINI_API_KEY in .env.`));
            } else {
              const errMsg = parsed.error?.message || `HTTP ${res.statusCode}`;
              reject(new Error(`Gemini API error: ${errMsg}`));
            }
          } catch (parseErr) {
            reject(new Error(`Failed to parse Gemini response: ${parseErr.message}`));
          }
        });
      });

      req.on('error', (err) => reject(new Error(`Network error calling Gemini API: ${err.message}`)));
      req.setTimeout(timeoutMs, () => {
        req.destroy();
        reject(new Error(`Gemini API request timed out after ${timeoutMs / 1000}s`));
      });

      req.write(bodyStr);
      req.end();
    });
  },

  /**
   * Dispatches an assembled payload to the Google Gemini AI Model
   */
  generateResponse: async ({ systemPrompt, context, history = [], message, options = {} }) => {
    const apiKey = process.env.GEMINI_API_KEY;

    // 1. Instant check for missing API Key
    if (!apiKey || apiKey.trim().length === 0 || apiKey.includes('YOUR_API_KEY')) {
      console.warn('[GeminiService] GEMINI_API_KEY is unconfigured in .env');
      return `JARVIS System Notice: The GEMINI_API_KEY environment variable is currently missing or unconfigured in .env.\n\nTo activate live AI reasoning:\n1. Open backend/.env\n2. Add: GEMINI_API_KEY=your_key_here\n3. Restart the backend server.`;
    }

    const modelName = options.model || DEFAULT_MODEL;
    const timeoutMs = options.timeoutMs || 25000;

    // 2. Construct system instruction combining system prompt & persistent project context
    const systemText = [
      systemPrompt,
      context ? `\n\n--- PERSISTENT PROJECT CONTEXT ---\n${context}` : ''
    ].filter(Boolean).join('');

    // 3. Format conversation history for Gemini contents array
    const contents = [];

    if (history && history.length > 0) {
      for (const item of history) {
        contents.push({
          role: item.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: item.content }]
        });
      }
    }

    // Append the current user message
    contents.push({ role: 'user', parts: [{ text: message }] });

    // 4. Build the REST request body
    const requestBody = {
      system_instruction: { parts: [{ text: systemText }] },
      contents,
      generationConfig: {
        temperature: options.temperature ?? 0.7,
        maxOutputTokens: options.maxTokens ?? 1024
      }
    };

    try {
      console.log(`[GeminiService] Calling model: ${modelName}`);
      const responseText = await geminiService._callGeminiRest(modelName, requestBody, apiKey, timeoutMs);
      console.log(`[GeminiService] Response received (${responseText.length} chars)`);
      return responseText;
    } catch (error) {
      console.error('[GeminiService Error]', error.message);
      return `JARVIS Operational Note: ${error.message}`;
    }
  }
};

export default geminiService;
