<template>
  <a-config-provider :locale="antdLocale">
    <a-layout style="min-height: 100vh">
      <a-layout-content>
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-config-provider>
</template>

<script setup lang="ts">
import enUS from "ant-design-vue/es/locale/en_US";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
const { locale } = useI18n();

const antdLocale = computed(() => {
  return locale.value === "zh-CN" ? zhCN : enUS;
});
</script>

<style scoped lang="scss"></style>
