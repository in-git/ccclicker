<template>
  <HotkeyInput
    label="启停热键"
    v-model="programConfig.startKey"
    @change="$emit('change')"
  >
    <template #default="{ value }">
      <KeySvg :modelValue="value" />
    </template>
  </HotkeyInput>
</template>

<script setup lang="ts">
import KeySvg from "@/components/KeySvg.vue";
import { programConfig } from '@/views/data';
import HotkeyInput from "./HotkeyInput.vue";

defineEmits(['change']);
</script>