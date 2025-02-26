import { generateChatResponse } from '../../../lib/gemini';

export async function POST(req) {
  try {
    const { messages } = await req.json();
    
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: 'Invalid request format' }, { status: 400 });
    }
    
    const response = await generateChatResponse(messages);
    
    return Response.json({ response });
  } catch (error) {
    console.error('API route error details:', error.message, error.stack);
    return Response.json({ 
      error: 'Failed to generate response', 
      details: error.message 
    }, { status: 500 });
  }
}