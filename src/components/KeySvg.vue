<template>
  <div>
    <div
      class="key-button"
      :style="{ height: height + 'px', fontSize: fontSize + 'px' }"
      v-if="!edit"
    >
      {{ inputValue }}
    </div>
    <input
      type="text"
      v-model="text"
      placeholder="请输入按键"
      class="w-full h-[32px] text-center"
      v-else
    />
  </div>
</template>

<script setup lang="ts">
const inputValue = defineModel();

const text = ref();
// 定义props，支持动态传参+样式自定义
withDefaults(
  defineProps<{
    height?: number;
    fontSize?: number;
    edit?: boolean;
  }>(),
  {
    height: 32,
    fontSize: 14,
    edit: false,
  },
);
</script>

<style scoped>
/* 键盘按键核心样式：白色主体+立体质感 */
.key-button {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  /* 轻微阴影，模拟键盘按键的立体效果 */
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  /* 文本绝对居中 */
  display: flex;
  align-items: center;
  justify-content: center;
  /* 字体样式 */
  font-weight: 500;
  color: #333333;
  padding: 0 4px;
  line-height: 1;
  width: fit-content;
  padding: 0 8px;
}
</style>
