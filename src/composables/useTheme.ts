import { useAppStore } from '@store/modules/app';
import { computed, watch } from 'vue';

export function useTheme() {
  const appStore = useAppStore();

  const isDark = computed(() => appStore.theme === 'dark');

  watch(isDark, (dark) => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, { immediate: true });

  return {
    isDark,
    toggleTheme: () => appStore.toggleTheme(),
  };
}
