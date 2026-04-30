const fetchClient = globalThis.fetch || ((...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args)));

const getOpenAIResponse = async (message) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return `Mock AI reply to: ${message}`;
  }

  const endpoint = 'https://api.openai.com/v1/chat/completions';
  const payload = {
    model: process.env.AI_MODEL || 'gpt-4o-mini',
    messages: [{ role: 'user', content: message }],
    max_tokens: 400,
    temperature: 0.6,
  };

  const response = await fetchClient(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error?.message || 'AI provider failed');
  }

  return data.choices?.[0]?.message?.content?.trim() || 'No response from AI model';
};

const getAIResponse = async (message) => {
  if (process.env.AI_PROVIDER?.toLowerCase() === 'mistral') {
    return `Mistral integration placeholder response for: ${message}`;
  }
  if (process.env.AI_PROVIDER?.toLowerCase() === 'gemini') {
    return `Gemini integration placeholder response for: ${message}`;
  }
  return getOpenAIResponse(message);
};

module.exports = { getAIResponse };
