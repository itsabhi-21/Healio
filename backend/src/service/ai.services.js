const Groq = require("groq-sdk");
const dotenv = require("dotenv");
dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const analyzeSymptoms = async (symptoms) => {

  const systemPrompt = `
You are an AI health information assistant.

Rules:
- You must NOT provide a medical diagnosis.
- Only suggest POSSIBLE CONDITIONS (not confirmed).
- Keep the response short, simple, and user-friendly.
- Do NOT use markdown, tables, headings, or long explanations.
- Respond ONLY in valid JSON format.
- The JSON must contain exactly these fields:
  {
    "possibleConditions": [],
    "generalAdvice": [],
    "warningSigns": []
  }
`;

  const userPrompt = `
User symptoms: ${symptoms.join(", ")}

Provide general health information following the rules.
`;

  try {
    const chatCompletion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.3   // less creativity, more controlled
    });

    let text = chatCompletion.choices[0]?.message?.content || "";

    // Safety: try to parse JSON
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch (e) {
      parsed = {
        possibleConditions: [],
        generalAdvice: [],
        warningSigns: [],
      };
    }

    return {
      symptomsAnalyzed: symptoms,
      ...parsed,
      disclaimer: "This is not medical advice. Please consult a qualified healthcare provider for any health concerns."
    };

  } catch (error) {
    console.error("Error in analyzeSymptoms:", error);
    throw new Error("Failed to analyze symptoms.");
  }
};

module.exports = { analyzeSymptoms };
