<template>
  <HotkeyInput
    label="触发热键"
    v-model="modelValue"
    @change="$emit('change')"
  >
    <template #default="{ value }">
      <KeySvg :modelValue="value" />
    </template>
  </HotkeyInput>
</template>

<script setup lang="ts">
import KeySvg from "@/components/KeySvg.vue";
import HotkeyInput from "./HotkeyInput.vue";

const modelValue = defineModel<string>();
defineEmits(['change']);
</script>