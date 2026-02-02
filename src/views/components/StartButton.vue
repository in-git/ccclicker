<template>
  <div class="text-center w-full">
    <button
      class="w-full rounded-xl h-12 text-white flex items-center text-xl justify-center shadow-md"
      :class="buttonClass"
    >
      {{ computedText }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { comIsTriggered, programConfig } from "../data";

const props = defineProps<{
  isStart: boolean;
}>();

const buttonClass = computed(() => {
  if (!props.isStart) {
    return "stopped";
  }
  return !comIsTriggered.value ? "running" : "warning";
});

const computedText = computed(() => {
  const { startKey, shortcutKey } = programConfig.value;
  if (!props.isStart) {
    return `按${startKey}启动连点器`;
  } else {
    if (!comIsTriggered.value) {
      return `按下${shortcutKey}启动连点`;
    } else {
      return `按${shortcutKey}停止连点`;
    }
  }
});
</script>

<style lang="scss" scoped>
.stopped {
  @apply bg-green-500 hover:bg-green-600;
}
.running {
  @apply bg-blue-500 hover:bg-blue-600;
}
.warning {
  @apply bg-yellow-500 hover:bg-yellow-600;
}
</style>
