'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/sidebar';
import { ChatArea } from '@/components/chat-area';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';

export function ChatInterface() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <ResizablePanelGroup direction="horizontal" className="w-full">
      <ResizablePanel
        defaultSize={20}
        minSize={15}
        maxSize={30}
        collapsible
        collapsedSize={4}
        onCollapse={() => setIsSidebarCollapsed(true)}
        onExpand={() => setIsSidebarCollapsed(false)}
        className="bg-muted/50"
      >
        <Sidebar collapsed={isSidebarCollapsed} />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={80}>
        <ChatArea />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}