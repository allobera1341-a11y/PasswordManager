/**
 * Vault Integrity Validator
 * Ensures that incoming data from the cloud matches the expected schema.
 * Prevents corrupted or malicious records from breaking the UI.
 */

export const validateVaultData = (data) => {
  if (!Array.isArray(data)) return [];

  const schema = ['encryptedPassword', 'securityScore', 'securityLevel', 'entropy'];
  
  return data.filter(item => {
    // Check for mandatory fields
    const hasAllFields = schema.every(field => Object.prototype.hasOwnProperty.call(item, field));
    
    // Validate score boundaries
    const isValidScore = typeof item.securityScore === 'number' && 
                         item.securityScore >= 0 && 
                         item.securityScore <= 10;
    
    // Ensure security level is recognized
    const isValidLevel = ['STRONG', 'MEDIUM', 'WEAK'].includes(item.securityLevel);

    return hasAllFields && isValidScore && isValidLevel;
  });
};
