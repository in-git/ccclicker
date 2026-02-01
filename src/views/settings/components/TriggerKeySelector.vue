<template>
  <li>
    <div class="label">
      <div>触发按键</div>
      <div class="desc">
        鼠标将会疯狂点击
        <span text-blue font-bold>
          {{ findOption(value!)?.label }}
        </span>
      </div>
    </div>
    <div class="right">
      <div class="space-x-2 text-slate">
        <a-segmented v-model:value="value" :options="options"></a-segmented>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
const value = defineModel<string>()



const options = [
  {
    label: "左键",
    value: "left",
  },
  {
    label: "中键",
    value: "middle",
  },
  {
    label: "右键",
    value: "right",
  },
];

const findOption = (value: string) => {
  return options.find((item) => item.value === value);
};
</script>

<style lang="scss" scoped></style>
