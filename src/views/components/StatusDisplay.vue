<template>
  <div class="space-y-2 h-full  flex-1 flex flex-col">

    <div class="bg-white py-3 px-4 w-full rounded-lg space-y-4 flex-[2] flex flex-col">
      <div class="background flex-1 w-full">
        <div class="slogan">
          <div class="text-4xl font-bold text-gray-800 mb-2">连点点</div>
          <div class="text-lg text-gray-600">
            连点点 连点 超简单
          </div>
        </div>
      </div>

      <StartButton :isStart="isRunning" />
    </div>

    <div class="bg-white py-3 px-4 w-full rounded-lg h-full flex-1">
      <div class="text-lg font-bold text-gray-800 mb-3">运行状态</div>
      <div class="space-y-3">
        <div class="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
          <span class="text-sm text-gray-600">运行状态</span>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full" :class="isRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-400'"></div>
            <span class="text-sm font-medium" :class="isRunning ? 'text-green-600' : 'text-gray-500'">
              {{ isRunning ? '运行中' : '已停止' }}
            </span>
          </div>
        </div>
        <div class="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
          <span class="text-sm text-gray-600">触发状态</span>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 rounded-full" :class="isTriggered ? 'bg-blue-500' : 'bg-gray-400'"></div>
            <span class="text-sm font-medium" :class="isTriggered ? 'text-blue-600' : 'text-gray-500'">
              {{ isTriggered ? '已触发' : '未触发' }}
            </span>
          </div>
        </div>
        <div class="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
          <span class="text-sm text-gray-600">当前模式</span>
          <span class="text-sm font-medium text-gray-800">{{ modeText }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { clickStatus, programConfig } from "../data";
import StartButton from './StartButton.vue';

const isRunning = computed(() => clickStatus.value.isRunning);
const isTriggered = computed(() => clickStatus.value.isTriggered || clickStatus.value.isLongPressKeyPressed);

const modeText = computed(() => {
  return programConfig.value.mode === "longPress" ? "长按模式" : "自动模式";
});
</script>

<style scoped lang="scss">
.background {
  background-image: url('@/assets/images/background.png');
  background-size: cover;
  background-position: center;
  border-radius: 10px;
  position: relative;
  .slogan{
    padding: 10px;
    @apply absolute bottom-4;
  }
}
</style>
