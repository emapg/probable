'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserSettings } from '@/types/chat';
import { DEFAULT_SETTINGS } from '@/lib/constants';

interface SettingsStore {
  settings: UserSettings;
  updateSettings: (settings: Partial<UserSettings>) => void;
  resetSettings: () => void;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      settings: DEFAULT_SETTINGS,
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
      resetSettings: () => set({ settings: DEFAULT_SETTINGS }),
    }),
    {
      name: 'settings-store',
    }
  )
);