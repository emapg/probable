'use client';

import { Message } from '@/types/chat';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, github } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { format } from 'date-fns';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useState } from 'react';
import { useSettingsStore } from '@/hooks/use-settings-store';

interface MessageProps {
  message: Message;
}

export function ChatMessage({ message }: MessageProps) {
  const [copied, setCopied] = useState(false);
  const settings = useSettingsStore((state) => state.settings);
  const isUser = message.role === 'user';

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        'flex w-full gap-4 rounded-lg p-4 transition-colors',
        isUser ? 'bg-muted/50' : 'bg-background',
        message.pending && 'opacity-70',
        message.error && 'bg-destructive/10'
      )}
    >
      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">
            {isUser ? 'You' : 'Assistant'}
          </span>
          {settings.showTimestamps && (
            <span className="text-xs text-muted-foreground">
              {format(message.timestamp, 'h:mm a')}
            </span>
          )}
        </div>
        <div 
          className={cn(
            "prose prose-sm dark:prose-invert max-w-none",
            settings.fontSize === 'small' && 'prose-sm',
            settings.fontSize === 'large' && 'prose-lg'
          )}
        >
          {settings.enableMarkdown ? (
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-2"
                        onClick={() => copyToClipboard(String(children))}
                      >
                        {copied ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                      <SyntaxHighlighter
                        {...props}
                        style={settings.codeTheme === 'dark' ? vscDarkPlus : github}
                        language={match[1]}
                        PreTag="div"
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    </div>
                  ) : (
                    <code {...props} className={className}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {message.content}
            </ReactMarkdown>
          ) : (
            <p>{message.content}</p>
          )}
        </div>
      </div>
    </div>
  );
}