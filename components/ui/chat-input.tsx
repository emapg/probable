'use client';

import { useState, useRef, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send, Paperclip } from 'lucide-react';
import { useSettingsStore } from '@/hooks/use-settings-store';
import { MAX_INPUT_LENGTH } from '@/lib/constants';

interface ChatInputProps {
  onSubmit: (content: string) => void;
  isLoading?: boolean;
}

export function ChatInput({ onSubmit, isLoading }: ChatInputProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const settings = useSettingsStore((state) => state.settings);

  const handleSubmit = () => {
    if (!input.trim() || isLoading) return;
    onSubmit(input.trim());
    setInput('');
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  return (
    <div className="flex gap-2">
      <Button
        variant="ghost"
        size="icon"
        className="flex-shrink-0"
        disabled={isLoading}
      >
        <Paperclip className="h-4 w-4" />
      </Button>
      <Textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value.slice(0, MAX_INPUT_LENGTH))}
        placeholder="Type your message..."
        className="min-h-[60px] resize-none"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey && settings.enterToSend) {
            e.preventDefault();
            handleSubmit();
          }
        }}
        disabled={isLoading}
      />
      <Button
        onClick={handleSubmit}
        disabled={isLoading || !input.trim()}
        className="flex-shrink-0 px-8"
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
}