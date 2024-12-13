'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';
import { Chat, Message } from '@/types/chat';

interface ChatStore {
  chats: Chat[];
  currentChatId: string | null;
  createChat: () => void;
  addMessage: (chatId: string, message: Omit<Message, 'id' | 'timestamp'>) => void;
  setCurrentChat: (chatId: string) => void;
  deleteChat: (chatId: string) => void;
  clearChats: () => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      chats: [],
      currentChatId: null,
      createChat: () => {
        const newChat: Chat = {
          id: nanoid(),
          title: 'New Chat',
          messages: [],
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        set((state) => ({
          chats: [newChat, ...state.chats],
          currentChatId: newChat.id,
        }));
      },
      addMessage: (chatId, message) => {
        const newMessage: Message = {
          id: nanoid(),
          ...message,
          timestamp: Date.now(),
        };
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === chatId
              ? {
                  ...chat,
                  messages: [...chat.messages, newMessage],
                  updatedAt: Date.now(),
                }
              : chat
          ),
        }));
      },
      setCurrentChat: (chatId) => set({ currentChatId: chatId }),
      deleteChat: (chatId) =>
        set((state) => ({
          chats: state.chats.filter((chat) => chat.id !== chatId),
          currentChatId:
            state.currentChatId === chatId
              ? state.chats[0]?.id || null
              : state.currentChatId,
        })),
      clearChats: () => set({ chats: [], currentChatId: null }),
    }),
    {
      name: 'chat-store',
    }
  )
);