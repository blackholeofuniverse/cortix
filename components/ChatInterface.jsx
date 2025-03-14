"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Search } from "lucide-react";
import ChatMessage from "./ChatMessage";
import { useChatContext } from "../app/context/ChatContext";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Skeleton } from "./ui/skeleton";
import { Bot } from "lucide-react";

export default function ChatInterface() {
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const { currentChat, setCurrentChat } = useChatContext();
  const inputRef = useRef(null);
  const [typingText, setTypingText] = useState("");
  const welcomeMessage = "How can I help you today?";

  useEffect(() => {
    if (currentChat.length === 0) {
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex <= welcomeMessage.length) {
          setTypingText(welcomeMessage.slice(0, currentIndex));
          currentIndex++;
        } else {
          setTimeout(() => {
            currentIndex = 0;
            setTypingText("");
          }, 2000);
        }
      }, 50);

      return () => clearInterval(typingInterval);
    }
  }, [currentChat.length]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollToBottom();
    }
  }, [currentChat]);

  useEffect(() => {
    // Focus input when component mounts or after sending a message
    inputRef.current?.focus();
  }, [isLoading]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!inputMessage.trim()) return;

    const userMessage = {
      role: "user",
      content: inputMessage,
      timestamp: new Date().toISOString(),
    };

    // Update state to show user message immediately
    setCurrentChat((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...currentChat, userMessage],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from API");
      }

      const data = await response.json();

      // Update chat with AI response
      const aiMessage = {
        role: "assistant",
        content: data.response,
        timestamp: new Date().toISOString(),
      };

      const updatedChat = [...currentChat, userMessage, aiMessage];
      setCurrentChat(updatedChat);

      // Update chat state
      // No need to save to history anymore
    } catch (error) {
      console.error("Error sending message:", error);

      // Add error message to chat
      setCurrentChat((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
          timestamp: new Date().toISOString(),
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat messages area */}
      <ScrollArea ref={chatContainerRef} className="flex-1 p-4">
        <div className="space-y-4 pb-4">
          {currentChat.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[80vh] space-y-4">
              <Bot className="w-8 h-8 text-white" />
              <h2 className="text-2xl font-semibold">Hi, I'm Cortix!</h2>
              <p className="text-muted-foreground h-6 overflow-hidden">
                {typingText}
              </p>
            </div>
          ) : (
            currentChat.map((message, index) => (
              <ChatMessage key={index} message={message} />
            ))
          )}

          {isLoading && (
            <div className="flex space-x-3 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-72" />
                <Skeleton className="h-4 w-60" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input area */}
      <div className="border-t border-border p-4 bg-background">
        <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto">
          <div className="relative flex items-center gap-2 bg-card rounded-lg p-2 border border-border">
            <Input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Message Cortix..."
              className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              variant={isLoading || !inputMessage.trim() ? "ghost" : "default"}
              size="icon"
              className="shrink-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>
        <div className="text-xs text-muted-foreground text-center mt-2 font-mono">
          Made By Samrat🤍
        </div>
      </div>
    </div>
  );
}
