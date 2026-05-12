# Security Model Specification

## 1. Threat Model
- **Client-Side Attacks:** Protected via AES-GCM and memory cleanup during encryption operations. All sensitive operations occur within a single-session scope.
- **Man-in-the-Middle (MITM):** Prevented by mandatory TLS (HTTPS) transport and client-side encryption before transmission. Data is opaque to the network layer.
- **Database Breach:** Even if the cloud persistence layer is compromised, passwords remain mathematically unreadable without the local encryption keys, maintaining zero-knowledge integrity.

## 2. Cryptographic Implementation
- **Algorithm:** AES-256-GCM (Authenticated Encryption with Associated Data).
- **Initialization Vector (IV):** Unique 12-byte cryptographically secure random IV per encryption operation.
- **Randomness:** Utilizes `window.crypto.getRandomValues()` for high-entropy byte generation.
- **Authentication Tag:** GCM mode ensures both confidentiality and authenticity of the stored payload.

## 3. Data Privacy (AI Ethics)
The AI Assistant acts on a strict "Need-to-Know" basis. 
- No plaintext strings or encrypted blobs are shared with the AI.
- Only abstract cryptographic metadata (entropy bits, character distribution percentages, complexity level) is transmitted to provide recommendations.
- This decoupling ensures that the assistant explains security without having access to it.

## 4. Compliance & Standards
- **Entropy:** Measured in bits using Shannons algorithm to ensure NIST-compliant strength.
- **Zero-Knowledge:** No server-side processing of raw credentials.
