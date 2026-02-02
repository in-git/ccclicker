import { ProgramConfig } from "./types";

export const defaultConfig: ProgramConfig = {
  shortcutKey: "F4", // 长按触发快捷键
  startKey: "F3", // 开始按键
  interval: 500, // 点击间隔
  mode: "auto",
  triggerKey: "left", // 触发按键
};
export const defClickStatus = {
  /* 是否正在运行 */
  isRunning: true,
  // 是否正在点击
  isClicking: false,
  // 是否触发点击
  isTriggered: false,
  // 是否按下长按键
  isLongPressKeyPressed: false,
};

// 统一的配置对象
export const programConfig = ref({
  ...defaultConfig,
});

/* 点击的状态 */
export const clickStatus = ref({
  ...defClickStatus,
});
export const comIsTriggered = computed(() => {
  return (
    clickStatus.value.isTriggered || clickStatus.value.isLongPressKeyPressed
  );
});