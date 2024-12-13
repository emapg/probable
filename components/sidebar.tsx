'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PlusCircle, Settings, Trash2 } from 'lucide-react';
import { useChatStore } from '@/hooks/use-chat-store';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface SidebarProps {
  collapsed: boolean;
}

export function Sidebar({ collapsed }: SidebarProps) {
  const { chats, currentChatId, createChat, setCurrentChat, deleteChat } = useChatStore();

  return (
    <div className="flex h-full flex-col gap-2 p-2">
      <Button
        variant="secondary"
        className="w-full justify-start gap-2"
        onClick={() => createChat()}
      >
        <PlusCircle className="h-4 w-4" />
        {!collapsed && <span>New Chat</span>}
      </Button>
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-2 pr-2">
          {chats.map((chat) => (
            <Button
              key={chat.id}
              variant={chat.id === currentChatId ? 'secondary' : 'ghost'}
              className={cn(
                'w-full justify-between group',
                collapsed && 'justify-center'
              )}
              onClick={() => setCurrentChat(chat.id)}
            >
              <div className="flex items-center gap-2 overflow-hidden">
                {!collapsed && (
                  <>
                    <span className="truncate">{chat.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {format(chat.updatedAt, 'MMM d')}
                    </span>
                  </>
                )}
              </div>
              {!collapsed && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteChat(chat.id);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </Button>
          ))}
        </div>
      </ScrollArea>
      <Button variant="ghost" size="icon" className="w-full">
        <Settings className="h-4 w-4" />
        {!collapsed && <span className="ml-2">Settings</span>}
      </Button>
    </div>
  );
}