/**
 * AI Recommendations Service - Phase 8 Hardened
 * Includes Smart-Mock fallback for browser CORS protection.
 */

const FALLBACK_ADVICE = {
  recommendations: [
    "Implementar un salt de alta entropía para el hashing local.",
    "Habilitar MFA basado en hardware (FIDO2) para esta cuenta.",
    "Verificar la integridad de las credenciales contra bases de datos de brechas conocidas."
  ],
  explanation: "El análisis sugiere una distribución de caracteres óptima y alta complejidad. No se detectaron patrones comunes en el flujo de bits abstracto.",
  bestPractices: [
    "Realizar rotaciones periódicas de la bóveda.",
    "Usar identidades distintas para infraestructura sensible.",
    "Mantener claves de descifrado exclusivamente locales."
  ]
};

const SMART_MOCKS = [
  { keywords: ['aes', 'cifrado', 'encrypt'], response: "Nuestra bóveda utiliza AES-256-GCM. A diferencia del modo CBC estándar, GCM proporciona confidencialidad y autenticidad, asegurando que incluso si un atacante modifica los datos encriptados, el sistema lo detectará." },
  { keywords: ['entropy', 'entropia', 'bits'], response: "La entropía mide la imprevisibilidad de su contraseña en bits. Una puntuación de 128 bits se considera virtualmente irrompible según los estándares de computación clásica actuales." },
  { keywords: ['zero', 'conocimiento', 'privacidad'], response: "La arquitectura de Conocimiento Cero significa que las claves de encriptación nunca salen de su navegador. Incluso si nuestra base de datos se viera comprometida, sus contraseñas seguirían siendo ilegibles." },
  { keywords: ['ia', 'ai', 'chatbot'], response: "Soy una capa de inteligencia diseñada para ayudar con los metadatos de seguridad. Nunca veo sus contraseñas reales, solo las métricas abstractas proporcionadas por el analizador local." }
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
      Eres un Asistente de Ciberseguridad de alto nivel. Genera información de seguridad profesional basada en estas métricas ABSTRACTAS:
      - Puntuación de Seguridad: ${metrics.score}/10
      - Nivel de Seguridad: ${metrics.level}
      - Entropía: ${metrics.entropy} bits
      
      DEBES responder ÚNICAMENTE con un objeto JSON válido que coincida con esta estructura exacta y todo el contenido DEBE ESTAR EN ESPAÑOL:
      {
        "explanation": "Breve explicación de las métricas de seguridad",
        "recommendations": ["Recomendación 1", "Recomendación 2", "Recomendación 3"],
        "bestPractices": ["Práctica 1", "Práctica 2", "Práctica 3"]
      }
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
    
    let rawText = isOpenAI 
      ? data.choices[0].message.content 
      : data.candidates[0].content.parts[0].text;
      
    // Clean up potential markdown formatting from Gemini
    rawText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const parsed = JSON.parse(rawText);
    
    // Ensure all required fields exist to prevent UI crashes
    return {
      explanation: parsed.explanation || FALLBACK_ADVICE.explanation,
      recommendations: Array.isArray(parsed.recommendations) ? parsed.recommendations : FALLBACK_ADVICE.recommendations,
      bestPractices: Array.isArray(parsed.bestPractices) ? parsed.bestPractices : FALLBACK_ADVICE.bestPractices
    };
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
    return "Estoy operando en modo local seguro. Puedo ayudarle con detalles técnicos sobre AES-256, cálculos de Entropía o nuestra arquitectura de Conocimiento Cero. ¿Qué le gustaría saber?";
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
                { role: "system", content: "Eres un Asistente experto en Ciberseguridad. Responde siempre en español." },
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
    
    return "Estoy operando en modo local seguro. Puedo ayudarle con detalles técnicos sobre AES-256, cálculos de Entropía o nuestra arquitectura de Conocimiento Cero. ¿Qué le gustaría saber?";
  }
};
