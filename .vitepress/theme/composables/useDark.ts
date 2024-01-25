import { watchEffect } from 'vue';
import { useData } from 'vitepress';
import { usePrimeVue } from 'primevue/config';

export const useDark = () => {
  const { isDark } = useData();
  const { changeTheme } = usePrimeVue();

  watchEffect(() => {
    changeTheme(
      `lara-${isDark.value ? 'light' : 'dark'}-purple`,
      `lara-${isDark.value ? 'dark' : 'light'}-purple`,
      'theme-link'
    );
  });
};
