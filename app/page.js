'use client';

import { useState } from 'react';
import ChatInterface from '../components/ChatInterface';
import ChatHistory from '../components/ChatHistory';
import { MessageSquare, Plus } from 'lucide-react';
import { ChatProvider } from './context/ChatContext';
import { Button } from '../components/ui/button';
import { ScrollArea } from '../components/ui/scroll-area';

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <ChatProvider>
      <div className="flex h-screen">
        {/* Sidebar for chat history - hidden on mobile until toggled */}
        <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block md:w-72 bg-card border-r border-border`}>
          <ScrollArea className="h-full">
            <div className="p-4">
              <Button
                onClick={() => window.location.reload()}
                className="flex items-center justify-center w-full mb-4"
                variant="default"
              >
                <Plus className="w-5 h-5 mr-2" />
                New Chat
              </Button>

              <h2 className="text-lg font-semibold mb-3 text-foreground">Chat History</h2>
              <ChatHistory />
            </div>
          </ScrollArea>
        </div>

        {/* Main chat area */}
        <div className="flex-1 flex flex-col">
          {/* Top bar */}
          <header className="p-4 border-b border-border bg-card flex items-center justify-between">
            <Button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden"
              variant="ghost"
              size="icon"
            >
              <MessageSquare className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold">Gemini Chat</h1>
            <div className="w-5 md:hidden">
              {/* Spacer for mobile layout */}
            </div>
          </header>

          {/* Chat interface */}
          <div className="flex-1 overflow-hidden">
            <ChatInterface />
          </div>
        </div>
      </div>
    </ChatProvider>
  );
}