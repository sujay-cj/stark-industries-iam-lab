import { exec } from 'child_process';
import axios from 'axios';
import https from 'https';
import dotenv from 'dotenv';
dotenv.config();

const agent = new https.Agent({ rejectUnauthorized: false });
const authHeader = 'Basic ' + Buffer.from('admin:' + (process.env.SPLUNK_PASSWORD || 'Stark@123')).toString('base64');
const splunkHost = process.env.SPLUNK_HOST || 'https://localhost:8089';

const ingestedHashes = new Set();
let isSyncing = false;

/**
 * Keycloak Container Log Collector & Splunk Indexer Service
 * Non-blocking batch forwarder for Docker container 'keycloak' stdout/stderr
 */
export const keycloakLogForwarder = {
  syncLogs: async () => {
    if (isSyncing) return;
    isSyncing = true;

    try {
      exec('docker logs --since 24h keycloak', async (err, stdout, stderr) => {
        if (err) {
          isSyncing = false;
          return;
        }

        const lines = (stdout + '\n' + stderr)
          .split('\n')
          .map(l => l.trim())
          .filter(l => l.length > 0 && (l.includes('org.keycloak') || l.includes('type=')));

        const newLines = lines.filter(l => !ingestedHashes.has(l));

        if (newLines.length > 0) {
          // Batch post log lines in a single payload to keep Node event loop responsive
          const batchPayload = newLines.join('\n');

          try {
            await axios.post(
              `${splunkHost}/services/receivers/simple?index=keycloak&sourcetype=keycloak:events`,
              batchPayload,
              {
                httpsAgent: agent,
                headers: {
                  Authorization: authHeader,
                  'Content-Type': 'text/plain'
                },
                timeout: 3000
              }
            );

            newLines.forEach(l => ingestedHashes.add(l));
            console.log(`[KeycloakLogForwarder] Batch ingested ${newLines.length} new events into index=keycloak`);
          } catch (postErr) {
            // Silently ignore batch post error
          }
        }

        isSyncing = false;
      });
    } catch (error) {
      isSyncing = false;
    }
  },

  startContinuousForwarding: () => {
    keycloakLogForwarder.syncLogs();

    // Schedule continuous sync every 10 seconds
    setInterval(() => {
      keycloakLogForwarder.syncLogs();
    }, 10000);

    console.log('[KeycloakLogForwarder] Continuous Log Ingestion active (Non-blocking batch mode)');
  }
};

export default keycloakLogForwarder;
