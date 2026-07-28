import axios from 'axios';
import https from 'https';
import dotenv from 'dotenv';

dotenv.config();

const splunkHost = process.env.SPLUNK_HOST || 'https://localhost:8089';
const username = process.env.SPLUNK_USERNAME || 'admin';
const password = process.env.SPLUNK_PASSWORD || 'changeme';

// Create custom HTTPS agent to allow self-signed certificates in local development
const httpsAgent = new https.Agent({
  rejectUnauthorized: false
});

// Configure Axios instance for Splunk Enterprise REST API
export const splunkClient = axios.create({
  baseURL: splunkHost,
  httpsAgent: httpsAgent,
  timeout: 15000, // 15 second REST API timeout
  auth: {
    username: username,
    password: password
  },
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'
  }
});

// Axios Request Interceptor for logging outgoing REST requests to Splunk
splunkClient.interceptors.request.use((config) => {
  const method = config.method?.toUpperCase() || 'GET';
  const url = `${config.baseURL}${config.url}`;
  console.log(`[Splunk REST Request] ${method} -> ${url}`);
  config.metadata = { startTime: new Date() };
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Axios Response Interceptor for logging response times
splunkClient.interceptors.response.use((response) => {
  const durationMs = new Date() - response.config.metadata.startTime;
  console.log(`[Splunk REST Response] ${response.status} ${response.statusText} (${durationMs}ms)`);
  return response;
}, (error) => {
  if (error.config && error.config.metadata) {
    const durationMs = new Date() - error.config.metadata.startTime;
    console.error(`[Splunk REST Error] ${error.message} (${durationMs}ms)`);
  } else {
    console.error(`[Splunk REST Error] ${error.message}`);
  }
  return Promise.reject(error);
});

export default splunkClient;
