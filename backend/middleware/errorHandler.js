/**
 * Centralized Global Error Handler Middleware
 * Parses Express & Axios Splunk REST API errors into structured JSON.
 */
export const errorHandler = (err, req, res, next) => {
  console.error(`[Global Error Handler] Path: ${req.method} ${req.originalUrl}`);
  console.error(err);

  // Axios HTTP Error from Splunk REST API
  if (err.response) {
    const status = err.response.status || 500;
    const splunkData = err.response.data;

    let message = 'Splunk Enterprise REST API returned an error';
    if (splunkData && splunkData.messages && splunkData.messages.length > 0) {
      message = splunkData.messages.map(m => m.text).join('; ');
    } else if (typeof splunkData === 'string') {
      message = splunkData;
    } else if (err.message) {
      message = err.message;
    }

    return res.status(status).json({
      error: status === 401 ? 'Splunk Authentication Error' : status === 403 ? 'Splunk Authorization Forbidden' : 'Splunk REST API Error',
      statusCode: status,
      message: message,
      details: splunkData || null
    });
  }

  // Axios Network / Connection Error (e.g. ECONNREFUSED or Timeout)
  if (err.code === 'ECONNREFUSED') {
    return res.status(503).json({
      error: 'Splunk Service Unavailable',
      statusCode: 503,
      message: 'Could not connect to Splunk Enterprise REST API at https://localhost:8089 (Connection Refused).'
    });
  }

  if (err.code === 'ETIMEDOUT' || err.code === 'ECONNABORTED') {
    return res.status(504).json({
      error: 'Splunk REST Gateway Timeout',
      statusCode: 504,
      message: 'Splunk Enterprise REST API request timed out.'
    });
  }

  // Invalid SPL query error
  if (err.message && err.message.includes('SPL')) {
    return res.status(400).json({
      error: 'Invalid Search Processing Language (SPL)',
      statusCode: 400,
      message: err.message
    });
  }

  // Standard Express Error Fallback
  const statusCode = err.statusCode || res.statusCode !== 200 ? res.statusCode : 500;
  return res.status(statusCode).json({
    error: err.name || 'Internal Server Error',
    statusCode: statusCode,
    message: err.message || 'An unexpected error occurred on the security backend server.'
  });
};

export default errorHandler;
