'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [currentChat, setCurrentChat] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  
  // Load chat history from localStorage on component mount
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('chatHistory');
      if (savedHistory) {
        setChatHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
    }
  }, []);
  
  // Save chat to history
  const saveChat = (messages) => {
    if (messages.length === 0) return;
    
    const chatId = Date.now().toString();
    
    const newHistory = [
      { id: chatId, messages, timestamp: new Date().toISOString() },
      ...chatHistory.filter(chat => {
        // Check if this is essentially the same chat by comparing messages
        const isSameChat = chat.messages.length === messages.length &&
          chat.messages.every((msg, i) => 
            msg.content === messages[i].content && msg.role === messages[i].role
          );
        return !isSameChat;
      }).slice(0, 19) // Keep only the 20 most recent chats
    ];
    
    setChatHistory(newHistory);
    
    try {
      localStorage.setItem('chatHistory', JSON.stringify(newHistory));
    } catch (error) {
      console.error('Error saving chat history:', error);
    }
  };
  
  // Load a chat from history
  const loadChat = (chat) => {
    setCurrentChat(chat.messages);
  };
  
  // Delete a chat from history
  const deleteChat = (chatId) => {
    const newHistory = chatHistory.filter(chat => chat.id !== chatId);
    setChatHistory(newHistory);
    
    try {
      localStorage.setItem('chatHistory', JSON.stringify(newHistory));
    } catch (error) {
      console.error('Error saving chat history:', error);
    }
  };
  
  return (
    <ChatContext.Provider value={{ 
      currentChat, 
      setCurrentChat, 
      chatHistory, 
      saveChat, 
      loadChat, 
      deleteChat 
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChatContext = () => useContext(ChatContext);