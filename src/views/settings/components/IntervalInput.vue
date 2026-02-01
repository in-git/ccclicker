<template>
  <li>
    <div class="label">
      <div>触发间隔</div>
      <div class="desc">每秒执行 <span class="text-blue-5 font-bold">{{ timesPerSecond }}</span> 次</div>
    </div>
    <div class="right">
      <div>
        <a-input-number :step="10" :min="10" v-model:value="value" class="w-[140px]">
          <template #addonAfter> ms </template>
        </a-input-number>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
const value = defineModel<number>()

const timesPerSecond = computed(() => {
  if (!value.value || value.value === 0) {
    return 0
  }
  return Math.round(1000 / value.value)
})
</script>

<style lang="scss" scoped></style>
