import { GoogleGenAI } from "@google/genai";

// API Key ን ከ environment variable እናገኛለን (Vercel ላይ የምናስገባው ይሆናል)
const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenAI(apiKey);

export const getSongDescription = async (songTitle: string, artistName: string): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Provide a short, poetic, 2-sentence musical insight or "vibe" description for the song "${songTitle}" by "${artistName}". Mention its mood.`;
    const result = await model.generateContent(prompt);
    return result.response.text() || "A unique blend of rhythm and soul that resonates with the spirit.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "A beautiful composition waiting to be explored.";
  }
};

export const getSongMeaning = async (songTitle: string, artistName: string): Promise<string> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Explain the lyrical theme and cultural significance of the song "${songTitle}" by "${artistName}" in 3 deep bullet points.`;
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini Meaning Error:", error);
    return "Lyrical analysis unavailable at the moment.";
  }
};
