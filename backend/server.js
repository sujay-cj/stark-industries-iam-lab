import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load both root .env and backend/.env to ensure all GEMINI_API_KEY settings are captured
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });
dotenv.config({ path: path.join(__dirname, '.env') });

import splunkRoutes from './routes/splunkRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import keycloakLogForwarder from './services/keycloakLogForwarder.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Middleware
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3001', 'http://127.0.0.1:3001', 'http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Public Health Check Endpoint (Requirement: GET /api/health -> {"status":"ok"})
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Stark IAM & SOC Security Backend',
    version: '1.0.0'
  });
});

// Register Protected API Routes
app.use('/api/splunk', splunkRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/ai', aiRoutes);

// 404 Route Handler
app.use((req, res, next) => {
  res.status(404).json({
    error: 'Not Found',
    statusCode: 404,
    message: `Endpoint ${req.method} ${req.originalUrl} does not exist.`
  });
});

// Centralized Global Error Handler Middleware
app.use(errorHandler);

// Start Express Backend Server & Keycloak Continuous Log Ingestion
app.listen(PORT, '0.0.0.0', () => {
  console.log(`====================================================`);
  console.log(` Stark Industries Security Backend Server Running `);
  console.log(` Port: http://0.0.0.0:${PORT} (http://127.0.0.1:${PORT})`);
  console.log(` Health: http://127.0.0.1:${PORT}/api/health`);
  console.log(` AI Endpoint: http://127.0.0.1:${PORT}/api/ai/chat`);
  console.log(` Gemini API Key Configured: ${process.env.GEMINI_API_KEY ? 'YES (Active)' : 'NO (Missing in .env)'}`);
  console.log(` Splunk Target: ${process.env.SPLUNK_HOST || 'https://localhost:8089'}`);
  console.log(` Keycloak Realm: ${process.env.KEYCLOAK_REALM || 'stark-industries'}`);
  console.log(`====================================================`);

  // Activate continuous background ingestion of Keycloak logs into index=keycloak
  keycloakLogForwarder.startContinuousForwarding();
});

export default app;
