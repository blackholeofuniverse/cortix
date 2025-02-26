"use client";

import { useEffect } from "react";
import { useChatContext } from "../app/context/ChatContext";
import { MessageSquare, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useState } from "react";

export default function ChatHistory() {
  const { chatHistory, loadChat, deleteChat } = useChatContext();
  const [chatToDelete, setChatToDelete] = useState(null);

  const handleDelete = () => {
    if (chatToDelete) {
      deleteChat(chatToDelete);
      setChatToDelete(null);
    }
  };

  return (
    <div className="space-y-2">
      {chatHistory.length === 0 ? (
        <p className="text-sm text-muted-foreground">No chat history yet</p>
      ) : (
        chatHistory.map((chat) => {
          // Get first user message as title, or fallback
          const title =
            chat.messages.find((m) => m.role === "user")?.content.slice(0, 25) +
              "..." || "Chat";

          return (
            <div
              key={chat.id}
              className="flex items-center justify-between p-2 hover:bg-muted rounded-lg group"
            >
              <div
                className="flex items-center flex-1 overflow-hidden cursor-pointer"
                onClick={() => loadChat(chat)}
              >
                <MessageSquare className="w-4 h-4 mr-2 text-muted-foreground" />
                <span className="text-sm truncate">{title}</span>
              </div>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      setChatToDelete(chat.id);
                    }}
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Chat</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete this chat? This action
                      cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-destructive text-destructive-foreground"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          );
        })
      )}
    </div>
  );
}
