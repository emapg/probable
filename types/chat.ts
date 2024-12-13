export interface Message {
  id: string; // Unique identifier for the message
  role: 'user' | 'assistant'; // Define roles
  content: string; // The message content
  timestamp: Date; // The timestamp of the message
  pending?: boolean; // Optional property to indicate if the message is pending
  error?: boolean; // Optional property to indicate if there was an error
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
