'use client';

import { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [currentChat, setCurrentChat] = useState([]);
  
  return (
    <ChatContext.Provider value={{ 
      currentChat, 
      setCurrentChat
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChatContext = () => useContext(ChatContext);