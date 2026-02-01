<template>
  <div class="footer">
    <div class="flex text-nowrap gap-4">
      <Running :isTriggered="isTriggered" />
      <ClickCounter />
    </div>

    <div class="flex items-center gap-3">
      <Feedback />
      <VersionInfo />
    </div>
  </div>
</template>

<script setup lang="ts">
import ClickCounter from "./components/ClickCounter.vue";
import Feedback from "./components/Feedback.vue";
import Running from "./components/Running.vue";
import VersionInfo from "./components/VersionInfo.vue";

defineProps<{
  isTriggered?: boolean;
}>();
</script>

<style lang="scss" scoped>
.footer {
  border-top: 1px solid #dadada;
  @apply w-full text-sm flex justify-between items-center px-3 bg-slate-2 py-1 text-xs;
}
</style>
