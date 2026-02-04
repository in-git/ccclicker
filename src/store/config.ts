import { defineStore } from 'pinia';
import { ProgramConfig } from '../views/types';

export const defaultConfig: ProgramConfig = {
  shortcutKey: "F4",
  startKey: "F9",
  interval: 500,
  mode: "auto",
  triggerKey: "left",
};

export const useConfigStore = defineStore('config', {
  state: () => ({
    config: { ...defaultConfig } as ProgramConfig,
  }),
  actions: {
    updateConfig(newConfig: Partial<ProgramConfig>) {
      this.config = { ...this.config, ...newConfig };
    },
    resetConfig() {
      this.config = { ...defaultConfig };
    },
  },
  persist: {
    key: 'ccclicker-config',
    storage: localStorage,
  },
});
