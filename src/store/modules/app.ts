import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => ({
    title: 'Auto Clicker',
    theme: 'light' as 'light' | 'dark',
    sidebarCollapsed: false,
  }),
  getters: {
    pageTitle: (state) => state.title,
  },
  actions: {
    setTitle(title: string) {
      this.title = title;
    },
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
    },
    toggleSidebar() {
      this.sidebarCollapsed = !this.sidebarCollapsed;
    },
  },
  persist: {
    key: 'app-store',
    storage: localStorage,
  },
});
