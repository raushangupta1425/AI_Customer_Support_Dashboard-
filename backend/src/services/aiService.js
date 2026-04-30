const fetchClient = globalThis.fetch || ((...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args)));

// const getOpenAIResponse = async (message) => {
//   const apiKey = process.env.OPENAI_API_KEY;
//   if (!apiKey) {
//     return `Mock AI reply to: ${message}`;
//   }

//   const endpoint = 'https://api.openai.com/v1/chat/completions';
//   const payload = {
//     model: process.env.AI_MODEL || 'gpt-4o-mini',
//     messages: [{ role: 'user', content: message }],
//     max_tokens: 400,
//     temperature: 0.6,
//   };

//   const response = await fetchClient(endpoint, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${apiKey}`,
//     },
//     body: JSON.stringify(payload),
//   });

//   const data = await response.json();
//   if (!response.ok) {
//     throw new Error(data.error?.message || 'AI provider failed');
//   }

//   return data.choices?.[0]?.message?.content?.trim() || 'No response from AI model';
// };

const getGeminiResponse = async (message) => {
  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL || 'gemini-1.5-pro';
  if (!apiKey) {
    return `Mock Gemini reply to: ${message}`;
  }

  const endpoint = `https://gemini.googleapis.com/v1/models/${encodeURIComponent(model)}:generate?key=${encodeURIComponent(apiKey)}`;
  const payload = {
    prompt: {
      text: message,
    },
    maxOutputTokens: Number(process.env.GEMINI_MAX_OUTPUT_TOKENS || 400),
    temperature: Number(process.env.GEMINI_TEMPERATURE || 0.6),
  };

  const response = await fetchClient(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || data.error?.status || 'Gemini provider failed');
  }

  return data.candidates?.[0]?.output?.trim() || data.output?.[0]?.content?.[0]?.text?.trim() || 'No response from Gemini model';
};

const getAIResponse = async (message) => {
  const provider = (process.env.AI_PROVIDER || (process.env.GEMINI_API_KEY ? 'gemini' : 'openai')).toLowerCase();
  if (provider === 'mistral') {
    return `Mistral integration placeholder response for: ${message}`;
  }
  if (provider === 'gemini') {
    return getGeminiResponse(message);
  }
  return getOpenAIResponse(message);
};

module.exports = { getAIResponse };
