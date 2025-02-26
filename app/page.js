'use client';

import { useState } from 'react';
import ChatInterface from '../components/ChatInterface';
import { Bot, MessageSquare, Plus } from 'lucide-react';
import { ChatProvider } from './context/ChatContext';
import { Button } from '../components/ui/button';
import { ScrollArea } from '../components/ui/scroll-area';

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <ChatProvider>
      <div className="flex h-screen">
        {/* Main chat area */}
        <div className="flex-1 flex flex-col font-mono">
          {/* Top bar */}
          <header className="p-4 border-b border-border bg-card flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Bot className="w-6 h-6 text-white" />
              <h1 className="text-xl font-bold">Cortix</h1>
            </div>
            <Button
              onClick={() => window.location.reload()}
              className="flex items-center justify-center"
              variant="default"
            >
              <Plus className="w-5 h-5" />
              New Chat
            </Button>
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