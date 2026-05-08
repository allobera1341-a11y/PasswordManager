/**
 * AI Secure Password Manager - Secure Password Generator
 * Uses window.crypto.getRandomValues() for cryptographic security.
 */

const CHARSETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?"
};

/**
 * Generates a secure password based on specified constraints.
 * @param {number} length - Length of the password (16-20).
 * @returns {string} The generated password.
 */
export const generateSecurePassword = (length = 18) => {
  const allChars = Object.values(CHARSETS).join("");
  let password = "";
  
  // Ensure at least one of each type for initial entropy
  password += CHARSETS.uppercase[getRandomIndex(CHARSETS.uppercase.length)];
  password += CHARSETS.lowercase[getRandomIndex(CHARSETS.lowercase.length)];
  password += CHARSETS.numbers[getRandomIndex(CHARSETS.numbers.length)];
  password += CHARSETS.symbols[getRandomIndex(CHARSETS.symbols.length)];

  // Fill the rest
  for (let i = password.length; i < length; i++) {
    password += allChars[getRandomIndex(allChars.length)];
  }

  // Shuffle the password to avoid predictable start
  return shuffleString(password);
};

/**
 * Gets a cryptographically secure random index.
 */
function getRandomIndex(max) {
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  return array[0] % max;
}

/**
 * Shuffles string using Fisher-Yates algorithm with Crypto API.
 */
function shuffleString(str) {
  let arr = str.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = getRandomIndex(i + 1);
    [arr[i], arr[arr[j]]] = [arr[j], arr[i]];
  }
  return arr.join("");
}
