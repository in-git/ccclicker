<template>
  <div class="bg-white py-3 px-4 w-full rounded-lg">
    <div class="text-lg font-bold text-gray-800 mb-2">模式</div>
    <div class="flex gap-4">
      <div
        v-for="mode in modes"
        :key="mode.value"
        class="mode-card flex items-center py-3 px-4 flex-1 bg-white rounded shadow hover:shadow-md cursor-pointer"
        :class="{ 'ring-2 ring-blue-500': activeMode === mode.value }"
        @click="$emit('change', mode.value)"
      >
        <div class="text-3xl">{{ mode.icon }}</div>
        <div class="w-full">
          <div class="mb-1 font-bold text-gray-800">{{ mode.title }}</div>
          <div class="text-xs text-gray-500">{{ mode.description }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { programConfig } from "../data";
const activeMode = defineModel();

defineEmits(["change"]);
const modes = computed(() => {
  const {  shortcutKey } = programConfig.value;

  return [
    {
      value: "longPress" as const,
      icon: "🖱️",
      title: "长按",
      description: `按住${shortcutKey}连点，松开停止`,
    },
    {
      value: "auto" as const,
      icon: "⚙️",
      title: "自动",
      description: `按下${shortcutKey},自动点击,再按停止`,
    },
  ];
});
</script>
