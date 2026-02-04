export const defClickStatus = {
  isRunning: true,
  isClicking: false,
  isTriggered: false,
  isLongPressKeyPressed: false,
};

export const clickStatus = ref({
  ...defClickStatus,
});
export const comIsTriggered = computed(() => {
  return (
    clickStatus.value.isTriggered || clickStatus.value.isLongPressKeyPressed
  );
});