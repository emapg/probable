import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export async function streamGeminiResponse(prompt: string) {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContentStream(prompt);
    return result;
  } catch (error) {
    console.error('Error in Gemini API:', error);
    throw error;
  }
}