/**
 * AI Secure Password Manager - Security Analyzer
 * Local heuristic analysis for password strength.
 */

export const analyzePassword = (password) => {
  if (!password) return null;

  const length = password.length;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);
  
  // Calculate Entropy (H = L * log2(R))
  // R = Pool size
  let poolSize = 0;
  if (hasLower) poolSize += 26;
  if (hasUpper) poolSize += 26;
  if (hasNumber) poolSize += 10;
  if (hasSymbol) poolSize += 32;
  
  const entropy = Math.floor(length * Math.log2(poolSize));

  // Check for patterns
  const hasRepeated = /(.)\1{2,}/.test(password); // 3+ identical chars
  const isSequential = checkSequential(password);

  // Score calculation (0-10)
  let score = 0;
  if (length >= 12) score += 2;
  if (length >= 16) score += 2;
  if (hasUpper && hasLower) score += 2;
  if (hasNumber) score += 1;
  if (hasSymbol) score += 2;
  if (poolSize > 60) score += 1;
  
  // Penalties
  if (hasRepeated) score -= 2;
  if (isSequential) score -= 2;

  // Final normalization
  score = Math.max(0, Math.min(10, score));

  let level = "WEAK";
  if (score >= 4) level = "MEDIUM";
  if (score >= 8) level = "STRONG";

  return {
    score,
    level,
    entropy,
    metrics: [
      { label: 'Longitud mínima (16+)', ok: length >= 16 },
      { label: 'Variedad de símbolos', ok: hasSymbol },
      { label: 'Uso de números', ok: hasNumber },
      { label: 'Sin patrones repetitivos', ok: !hasRepeated && !isSequential },
    ]
  };
};

function checkSequential(str) {
  const s = str.toLowerCase();
  for (let i = 0; i < s.length - 2; i++) {
    const charCode = s.charCodeAt(i);
    if (s.charCodeAt(i+1) === charCode + 1 && s.charCodeAt(i+2) === charCode + 2) return true;
  }
  return false;
}
