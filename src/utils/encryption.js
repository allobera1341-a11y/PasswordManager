import CryptoJS from 'crypto-js';

/**
 * AI Secure Password Manager - Local AES Encryption
 * 
 * This module ensures that passwords are encrypted on the client-side
 * before being transmitted to any external storage.
 */

// In a production environment, this key should be derived from a User Master Password.
// For this Phase 3 prototype, we use a local session key.
const MASTER_KEY = "local-vault-secure-key-2024";

/**
 * Encrypts a plaintext string using AES-256.
 * @param {string} plaintext - The password to encrypt.
 * @returns {string} The encrypted ciphertext.
 */
export const encryptPassword = (plaintext) => {
  try {
    return CryptoJS.AES.encrypt(plaintext, MASTER_KEY).toString();
  } catch (error) {
    console.error("Encryption failed:", error);
    return null;
  }
};

/**
 * Decrypts an AES-256 ciphertext back to plaintext.
 * @param {string} ciphertext - The encrypted password.
 * @returns {string} The decrypted plaintext.
 */
export const decryptPassword = (ciphertext) => {
  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, MASTER_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error("Decryption failed:", error);
    return null;
  }
};
