import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Google Generative AI with your API key
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export async function generateChatResponse(messages) {
  try {
    // Get the model - with correct name
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: `Your name is Cortix! If anybody asks you who are you tell them your name is Cortix and if they ask you who built or made you, tell them I'm developed by Samrat.

Please format your responses using proper markdown:
- Use # for main headings
- Use ## for subheadings
- Use \`backticks\` for inline code
- Use \`\`\` for code blocks with language specification
- Use * or _ for emphasis
- Use bullet points and numbered lists appropriately
- Use > for blockquotes
- Use --- for horizontal rules
- Use [text](url) for links
- Use • when it's necessay or there is anything point wise

Greet people by introducing yourself.`
    });

    // Format messages for the Gemini API
    const formattedMessages = messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    // Start a chat session
    const chat = model.startChat({
      history: formattedMessages.slice(0, -1), // All but the last message
    });

    // Send the last message and get a response
    const lastMessage = formattedMessages[formattedMessages.length - 1];
    const result = await chat.sendMessage(lastMessage.parts[0].text);
    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
}