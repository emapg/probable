'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings } from 'lucide-react';
import { useSettingsStore } from '@/hooks/use-settings-store';

export function SettingsDialog() {
  const { settings, updateSettings, resetSettings } = useSettingsStore();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Customize your chat experience. Changes are saved automatically.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="apiKey">Gemini API Key</Label>
            <Input
              id="apiKey"
              type="password"
              value={settings.apiKey || ''}
              onChange={(e) =>
                updateSettings({ apiKey: e.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label>Theme</Label>
            <Select
              value={settings.theme}
              onValueChange={(value) =>
                updateSettings({ theme: value as any })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Font Size</Label>
            <Select
              value={settings.fontSize}
              onValueChange={(value) =>
                updateSettings({ fontSize: value as any })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <Label>Enter to send</Label>
            <Switch
              checked={settings.enterToSend}
              onCheckedChange={(checked) =>
                updateSettings({ enterToSend: checked })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label>Show timestamps</Label>
            <Switch
              checked={settings.showTimestamps}
              onCheckedChange={(checked) =>
                updateSettings({ showTimestamps: checked })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label>Enable markdown</Label>
            <Switch
              checked={settings.enableMarkdown}
              onCheckedChange={(checked) =>
                updateSettings({ enableMarkdown: checked })
              }
            />
          </div>
          <Button
            variant="outline"
            onClick={resetSettings}
            className="mt-2"
          >
            Reset to Defaults
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}