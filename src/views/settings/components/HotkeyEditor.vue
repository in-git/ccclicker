<template>
  <HotkeyInput
    label="启停热键"
    v-model="configStore.config.startKey"
    @change="$emit('change')"
  >
    <template #default="{ value }">
      <KeySvg :modelValue="value" />
    </template>
  </HotkeyInput>
</template>

<script setup lang="ts">
import KeySvg from "@/components/KeySvg.vue";
import { useConfigStore } from '@/store/config';
import HotkeyInput from "./HotkeyInput.vue";
const configStore = useConfigStore();
defineEmits(['change']);
</script>