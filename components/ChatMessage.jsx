"use client";

import { User } from "lucide-react";
import { Bot } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Card, CardContent } from "./ui/card";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function ChatMessage({ message }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex items-start gap-3 ${isUser ? "justify-end" : ""}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
          <Bot className="w-5 h-5" />
        </div>
      )}

      <Card
        className={`max-w-3xl ${
          isUser
            ? "bg-[#111] text-white"
            : message.isError
            ? "bg-destructive text-destructive-foreground"
            : ""
        }`}
      >
        <CardContent className="p-3">
          <div className="prose prose-sm dark:prose-invert prose-pre:bg-[#282c34] prose-pre:p-0 prose-code:text-pink-500 prose-headings:mb-4 prose-p:mb-4 prose-ul:mb-4 prose-ol:mb-4 prose-blockquote:mb-4 prose-ul:list-[•] prose-ol:list-decimal prose-ul:pl-5 prose-ol:pl-5 max-w-none">
            {isUser ? (
              message.content
            ) : (
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={oneDark}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {message.content}
              </ReactMarkdown>
            )}
          </div>
          <div
            className={`text-[10px] mt-1 ${
              isUser ? "text-gray-300" : "text-muted-foreground"
            }`}
          >
            {typeof window !== "undefined" && message.timestamp
              ? formatDistanceToNow(new Date(message.timestamp), {
                  addSuffix: true,
                })
              : "just now"}
          </div>
        </CardContent>
      </Card>

      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
          <User className="w-5 h-5" />
        </div>
      )}
    </div>
  );
}
