'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send } from 'lucide-react';
import { useChatStore } from '@/hooks/use-chat-store';
import { Message } from '@/components/message';
import { streamGeminiResponse } from '@/lib/gemini';

export function ChatArea() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { chats, currentChatId, addMessage } = useChatStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentChat = chats.find((chat) => chat.id === currentChatId);

  const handleSubmit = async () => {
    if (!input.trim() || !currentChatId) return;

    const userMessage = {
      role: 'user' as const,
      content: input.trim(),
    };

    addMessage(currentChatId, userMessage);
    setInput('');
    setIsLoading(true);

    try {
      const response = await streamGeminiResponse(input.trim());
      const result = await response.response;
      const text = result.text();

      addMessage(currentChatId, {
        role: 'assistant',
        content: text,
      });
    } catch (error) {
      console.error('Error:', error);
      // Handle error appropriately
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [currentChat?.messages]);

  if (!currentChatId) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Select or create a chat to begin</p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <ScrollArea ref={scrollRef} className="flex-1 p-4">
        <div className="space-y-4">
          {currentChat?.messages.map((message) => (
            <Message key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="flex justify-center">
              <div className="animate-pulse space-x-1">
                <span className="inline-block h-2 w-2 rounded-full bg-primary"></span>
                <span className="inline-block h-2 w-2 rounded-full bg-primary"></span>
                <span className="inline-block h-2 w-2 rounded-full bg-primary"></span>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="border-t p-4">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="min-h-[60px]"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
          <Button
            onClick={handleSubmit}
            disabled={isLoading || !input.trim()}
            className="px-8"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}