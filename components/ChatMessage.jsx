'use client';

import { User } from 'lucide-react';
import { Bot } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent } from './ui/card';

export default function ChatMessage({ message }) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex items-start gap-3 ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
          <Bot className="w-5 h-5" />
        </div>
      )}
      
      <Card className={`max-w-3xl ${isUser ? 'bg-primary text-primary-foreground' : message.isError ? 'bg-destructive text-destructive-foreground' : ''}`}>
        <CardContent className="p-3">
          <div className="prose dark:prose-invert">
            {message.content}
          </div>
          <div className={`text-xs mt-1 ${isUser ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
            {typeof window !== 'undefined' && message.timestamp ? 
              formatDistanceToNow(new Date(message.timestamp), { addSuffix: true }) : 
              'just now'}
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