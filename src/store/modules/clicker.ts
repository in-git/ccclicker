import { defineStore } from 'pinia';

export interface ClickerState {
  enabled: boolean;
  interval: number;
  mode: 'long-press' | 'toggle';
  hotkey: string;
}

export const useClickerStore = defineStore('clicker', {
  state: (): ClickerState => ({
    enabled: false,
    interval: 50,
    mode: 'long-press',
    hotkey: 'F3',
  }),
  persist: true,
  actions: {
    setEnabled(enabled: boolean) {
      this.enabled = enabled;
    },
    setInterval(interval: number) {
      this.interval = interval;
    },
    setMode(mode: 'long-press' | 'toggle') {
      this.mode = mode;
    },
    setHotkey(hotkey: string) {
      this.hotkey = hotkey;
    },
    toggle() {
      this.enabled = !this.enabled;
    },
  },
});
