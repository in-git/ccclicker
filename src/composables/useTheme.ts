import { computed, ref, watch } from 'vue';

export function useTheme() {
  const theme = ref<'light' | 'dark'>('light');

  const isDark = computed(() => theme.value === 'dark');

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
  };

  watch(isDark, (dark) => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, { immediate: true });

  return {
    isDark,
    toggleTheme,
  };
}
