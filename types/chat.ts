export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}

export interface UserSettings {
  apiKey?: string; // Optional property
  theme: 'light' | 'dark' | 'system';
  fontSize: 'small' | 'medium' | 'large';
  enterToSend: boolean;
  showTimestamps: boolean;
  enableMarkdown: boolean;
}
