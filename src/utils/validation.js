/**
 * AI Secure Password Manager - Validation Utility
 * Basic sanitization and input validation for professional hardening.
 */

export const validatePasswordConfig = (config) => {
  const errors = [];

  if (config.length < 4 || config.length > 64) {
    errors.push("Length must be between 4 and 64.");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const sanitizeString = (str) => {
  if (typeof str !== 'string') return '';
  return str.replace(/[<>]/g, ''); // Simple XSS prevention for labels/names
};
