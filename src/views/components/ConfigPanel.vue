<template>
  <div class="bg-slate-50 p-4 w-full">
    <div class="text-[18px]">配置</div>
    <div class="w-full gap-2 bg-gray-">
      <div class="item">
        <div class="label">触发</div>
        <KeySvg :modelValue="localConfig.shortcutKey" class="w-[200px]" />
      </div>

      <div class="flex justify-between">
        <div class="label">启停</div>
        <a-input
          v-model:value="localConfig.startKey"
          @change="handleConfigChange"
          class="w-[200px]"
        />
      </div>

      <div class="flex justify-between">
        <div class="label">间隔</div>
        <a-input-number
          v-model:value="localConfig.interval"
          class="w-[200px]"
          :step="50"
          :min="50"
          @change="handleIntervalChange"
        >
          <template #addonAfter>
            <span class="text-gray-600 text-xs!">毫秒</span>
          </template>
        </a-input-number>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

interface Config {
  shortcutKey: string;
  startKey: string;
  interval: number;
  mode: "longPress" | "auto";
}

const props = defineProps<{
  config: Config;
}>();

const emit = defineEmits<{
  "update:config": [config: Config];
}>();

const localConfig = ref<Config>({ ...props.config });

// 监听外部配置变化
watch(
  () => props.config,
  (newConfig) => {
    localConfig.value = { ...newConfig };
  },
  { deep: true },
);

function handleConfigChange() {
  emit("update:config", { ...localConfig.value });
}

function handleIntervalChange() {
  let value = localConfig.value.interval;

  if (value % 50 !== 0) {
    value = Math.round(value / 50) * 50;
    if (value < 50) value = 50;
  }

  if (value < 50) value = 50;

  localConfig.value.interval = value;
  handleConfigChange();
}
</script>

<style lang="scss" scoped>
.item {
  @apply flex items-center gap-2 justify-between w-full;
}

.label {
  @apply text-nowrap;
}
.ant-form-item {
  margin: 0;
}
</style>
