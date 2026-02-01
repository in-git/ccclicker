<template>
  <div class="w-full text-xs px-2 rounded">
    <div class="text-xs  flex gap-2 items-center">
      连点触发
      <div class="w-[16px] h-[16px] inline-flex items-center justify-center">
        <div
          class="icon-base"
          :class="{ 'icon-loading': isTriggered, 'icon-default': !isTriggered }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isTriggered?: boolean;
}>();
</script>

<style lang="scss" scoped>
.icon-base {
  width: 14px;
  height: 14px;
  border-radius: 50%;
}
.icon-default {
  display: inline-block;
  vertical-align: middle;
  border: 3px solid #fdc4c4;
  background-color: #ff7777;
}

.icon-loading {
  background-color: #6acc5df3;
  display: inline-block;
  vertical-align: middle;
  position: relative;
  width: 8px;
  height: 8px;
  animation: pulse-scale 1.5s infinite ease-in-out;
}

.icon-loading::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #76f19bf3; /* 波纹颜色，和主色一致并透明 */
  border-radius: inherit;
  z-index: -1; /* 放在元素下层，不遮挡内容 */
  animation: pulse-wave 1.5s infinite ease-in-out; /* 波纹扩散动画 */
}

/* 动画1：元素自身轻微缩放 */
@keyframes pulse-scale {
  0%,
  100% {
    transform: scale(1); /* 初始/结束大小 */
    opacity: 1;
  }
  50% {
    transform: scale(1.5); /* 中间轻微缩小，更柔和 */
    opacity: 0.8;
  }
}

@keyframes pulse-wave {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}
</style>
