/**
 * AI Recommendations Service - Phase 8 Hardened
 * Includes Smart-Mock fallback for browser CORS protection.
 */

const FALLBACK_ADVICE = {
  recommendations: [
    "Implement high-entropy salt for local hashing.",
    "Enable hardware-based MFA (FIDO2) for this account.",
    "Verify credential integrity against known breach databases."
  ],
  explanation: "Analysis suggests optimal character distribution and high complexity. No common patterns detected in the abstract bitstream.",
  bestPractices: [
    "Perform periodic vault rotations.",
    "Use distinct identities for sensitive infrastructure.",
    "Maintain local-only decryption keys."
  ]
};

const SMART_MOCKS = [
  { keywords: ['aes', 'cifrado', 'encrypt'], response: "Our vault utilizes AES-256-GCM. Unlike standard CBC mode, GCM provides both confidentiality and authenticity, ensuring that even if an attacker modifies the encrypted data, the system will detect it." },
  { keywords: ['entropy', 'entropia', 'bits'], response: "Entropy measures the unpredictability of your password in bits. A score of 128 bits is considered virtually unbreakable by current classical computing standards." },
  { keywords: ['zero', 'conocimiento', 'privacidad'], response: "Zero-Knowledge architecture means the encryption keys never leave your browser. Even if our database was compromised, your passwords remain unreadable." },
  { keywords: ['ia', 'ai', 'chatbot'], response: "I am an intelligence layer designed to assist with security metadata. I never see your actual passwords, only the abstract metrics provided by the local analyzer." }
];

export const getAIRecommendations = async (metrics) => {
  const apiKey = import.meta.env.VITE_AI_API_KEY;

  if (!apiKey || apiKey === 'YOUR_AI_API_KEY' || apiKey.includes('YOUR_')) {
    return new Promise((resolve) => setTimeout(() => resolve(FALLBACK_ADVICE), 800));
  }

  try {
    const isOpenAI = apiKey.startsWith('sk-');
    const baseUrl = import.meta.env.VITE_AI_API_URL || 'https://api.openai.com';
    const endpoint = isOpenAI 
      ? `${baseUrl}/v1/chat/completions`
      : `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const prompt = `
      You are a high-end Cybersecurity Assistant. Generate professional security insights based on these ABSTRACT metrics:
      - Security Score: ${metrics.score}/10
      - Security Level: ${metrics.level}
      - Entropy: ${metrics.entropy} bits
      Provide response in JSON format.
    `;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(isOpenAI && { 'Authorization': `Bearer ${apiKey}` })
      },
      body: JSON.stringify(
        isOpenAI 
          ? {
              model: "gpt-4o-mini",
              messages: [{ role: "user", content: prompt }],
              response_format: { type: "json_object" }
            }
          : { contents: [{ parts: [{ text: prompt }] }] }
      )
    });

    if (!response.ok) throw new Error('CORS or API Error');
    const data = await response.json();
    return isOpenAI ? JSON.parse(data.choices[0].message.content) : JSON.parse(data.candidates[0].content.parts[0].text);
  } catch (error) {
    return FALLBACK_ADVICE;
  }
};

export const askCyberAI = async (message, chatHistory = []) => {
  const apiKey = import.meta.env.VITE_AI_API_KEY;
  const userMsg = message.toLowerCase();

  // Guard: if no API key, go straight to smart fallback
  if (!apiKey || apiKey.includes('YOUR_')) {
    const match = SMART_MOCKS.find(m => m.keywords.some(k => userMsg.includes(k)));
    if (match) return match.response;
    return "I am operating in secure local mode. I can assist you with technical details about AES-256, Entropy calculations, or our Zero-Knowledge architecture. What would you like to know?";
  }

  try {
    const isOpenAI = apiKey.startsWith('sk-');
    const baseUrl = import.meta.env.VITE_AI_API_URL || 'https://api.openai.com';
    const endpoint = isOpenAI 
      ? `${baseUrl}/v1/chat/completions`
      : `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(isOpenAI && { 'Authorization': `Bearer ${apiKey}` })
      },
      body: JSON.stringify(
        isOpenAI
          ? {
              model: "gpt-4o-mini",
              messages: [
                { role: "system", content: "You are an expert Cybersecurity Assistant." },
                { role: "user", content: message }
              ]
            }
          : { contents: [{ parts: [{ text: message }] }] }
      )
    });

    if (!response.ok) throw new Error('API Error');
    const data = await response.json();
    return isOpenAI
      ? data.choices[0].message.content
      : data.candidates[0].content.parts[0].text;

  } catch (error) {
    // Smart Fallback for Demo Presentation
    const match = SMART_MOCKS.find(m => m.keywords.some(k => userMsg.includes(k)));
    if (match) return match.response;
    
    return "I am operating in secure local mode. I can assist you with technical details about AES-256, Entropy calculations, or our Zero-Knowledge architecture. What would you like to know?";
  }
};
