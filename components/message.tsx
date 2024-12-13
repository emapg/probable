'use client';

import { Message as MessageType } from '@/types/chat';
import { cn } from '@/lib/utils';
import ReactMarkdown, { Components } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { format } from 'date-fns';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface MessageProps {
  message: MessageType;
}

export function Message({ message }: MessageProps) {
  const isUser  = message.role === 'user';

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  const components: Components = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2"
            onClick={() => copyToClipboard(String(children))}
          >
            <Copy className="h-4 w-4" />
          </Button>
          <SyntaxHighlighter
            {...props}
            style={vscDarkPlus}
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
  };

  return (
    <div
      className={cn(
        'flex w-full gap-4 rounded-lg p-4',
        isUser  ? 'bg-muted/50' : 'bg-background'
      )}
    >
      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">
            {isUser  ? 'You' : 'Assistant'}
          </span>
          <span className="text-xs text-muted-foreground">
            {format(message.timestamp, 'h:mm a')}
          </span>
        </div>
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <ReactMarkdown components={components}>
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
