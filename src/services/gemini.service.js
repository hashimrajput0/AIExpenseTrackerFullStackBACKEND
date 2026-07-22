import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function generateSummary(stats) {
  try {
    const prompt = `
Return ONLY valid JSON.

Data of Last Month:
${JSON.stringify(stats)}

Format:
{
  "summary": "",
  "insights": [],
  "recommendations": [],
  "financialScore": 0,
  "mood": ""
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const text = response.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(text);

  } catch (err) {
    console.error("Gemini Error:", err);
    throw err; // Let your controller handle the error
  }
}
