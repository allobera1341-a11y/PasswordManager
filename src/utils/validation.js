/**
 * AI Secure Password Manager - Validation Utility
 * Professional-grade sanitization and input validation.
 */

export const validatePasswordConfig = (config) => {
  const errors = [];

  if (typeof config.length !== 'number' || config.length < 8 || config.length > 128) {
    errors.push("Longitud inválida: debe estar entre 8 y 128 caracteres.");
  }

  // Basic sanity checks for custom generation
  if (config.customPool && config.customPool.length === 0) {
    errors.push("El pool personalizado no puede estar vacío.");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Sanitize strings to prevent XSS in audit logs or UI labels.
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  return input
    .trim()
    .replace(/[&<>"']/g, (m) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[m]));
};

/**
 * Validate vault entry structure before encryption/sync.
 */
export const validateVaultEntry = (entry) => {
  const schema = ['id', 'label', 'score', 'createdAt'];
  const missing = schema.filter(key => Object.prototype.hasOwnProperty.call(entry, key) === false);
  
  return {
    isValid: missing.length === 0,
    missingFields: missing
  };
};
