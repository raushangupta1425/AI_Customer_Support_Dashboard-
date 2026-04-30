const fetchClient = globalThis.fetch || ((...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args)));

function mernChatbot(userInput) {
    const input = userInput.toLowerCase();

    const responses = {
        greeting: [
            "Hey! Need help with MERN stack?",
            "Hi! I can assist you with MongoDB, Express, React, and Node.",
        ],
        react: [
            "React is used for building UI. You can use hooks like useState and useEffect.",
            "In React, components help you create reusable UI elements.",
        ],
        node: [
            "Node.js is used to run JavaScript on the server side.",
            "You can build scalable backend services using Node.js.",
        ],
        express: [
            "Express.js is a backend framework for Node.js used to build APIs.",
            "You can create REST APIs easily using Express.",
        ],
        mongodb: [
            "MongoDB is a NoSQL database that stores data in JSON-like format.",
            "You can use Mongoose to interact with MongoDB in Node.js.",
        ],
        crud: [
            "CRUD operations include Create, Read, Update, Delete using REST APIs.",
            "In MERN, CRUD is handled via Express routes and MongoDB queries.",
        ],
        project: [
            "A typical MERN project has React frontend, Express/Node backend, and MongoDB database.",
            "You should structure your project into client and server folders.",
        ],
        auth: [
            "Authentication is usually done using JWT (JSON Web Tokens).",
            "You can use bcrypt to hash passwords securely.",
        ],
        bye: [
            "Good luck with your MERN development!",
            "Happy coding! See you soon.",
        ]
    };

    function getIntent(text) {
        if (/\b(hi|hello|hey)\b/.test(text)) return "greeting";
        if (/\b(react|frontend|component|hook)\b/.test(text)) return "react";
        if (/\b(node|backend|server)\b/.test(text)) return "node";
        if (/\b(express|api|route)\b/.test(text)) return "express";
        if (/\b(mongodb|database|mongoose)\b/.test(text)) return "mongodb";
        if (/\b(crud|create|read|update|delete)\b/.test(text)) return "crud";
        if (/\b(project|structure)\b/.test(text)) return "project";
        if (/\b(auth|login|jwt|authentication)\b/.test(text)) return "auth";
        if (/\b(bye|exit|quit)\b/.test(text)) return "bye";
        return "unknown";
    }

    const intent = getIntent(input);

    if (intent === "unknown") {
        return "I'm not sure about that. Try asking something about MERN stack like React, Node, or MongoDB.";
    }

    const replyList = responses[intent];
    return replyList[Math.floor(Math.random() * replyList.length)];
}

const getGeminiResponse = async (message) => {
  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL || 'gemini-1.5-pro';
  if (!apiKey) {
    res=mernChatbot(message);
    return `Mock Gemini reply to: ${res}`;
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

// const getOpenAIResponse = async (message) => {
//   const apiKey = process.env.OPENAI_API_KEY;
//   if (!apiKey) {
//     return `Mock OpenAI reply to: ${message}`;
//   }

//   const endpoint = 'https://api.openai.com/v1/chat/completions';
//   const payload = {
//     model: process.env.AI_MODEL || 'gpt-4o-mini',
//     messages: [{ role: 'user', content: message }],
//     max_tokens: Number(process.env.OPENAI_MAX_TOKENS || 400),
//     temperature: Number(process.env.OPENAI_TEMPERATURE || 0.6),
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
//     throw new Error(data.error?.message || 'OpenAI provider failed');
//   }

//   return data.choices?.[0]?.message?.content?.trim() || 'No response from OpenAI model';
// };

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
