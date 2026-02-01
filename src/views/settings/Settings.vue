<template>
  <div class="bg-white py-3 px-4 w-full rounded-lg">
    <div class="flex items-center gap-4">
      <div class="text-lg font-bold text-gray-800">设置</div>
      <ul flex gap-4>
        <li v-for="item in navList" @click="onChange(item.value)" :key="item.value"
          :class="{ 'active': active === item.value }" class="text-gray-5 cursor-pointer">
          {{ item.label }}
        </li>
      </ul>
    </div>
    <ul class="settings-list">
      <template v-if="active === 'common'">
        <ToggleRunningRunning :clickStatus="clickStatus" />
        <TriggerKeySelector v-model="config.triggerKey" @change="emit('change')" />

        <IntervalInput v-model="config.interval" @change="emit('change')" />
      </template>
      <template v-if="active === 'hotkey'">
        <ShortcutKeyEditor v-model="config.shortcutKey" @change="emit('change')" />
        <HotkeyEditor v-model="config.startKey" @change="emit('change')" />
      </template>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ClickStatus, ProgramConfig } from "../types";
import HotkeyEditor from "./components/HotkeyEditor.vue";
import IntervalInput from "./components/IntervalInput.vue";
import ShortcutKeyEditor from './components/ShortcutKeyEditor.vue';
import ToggleRunningRunning from "./components/ToggleRunningRunning.vue";
import TriggerKeySelector from "./components/TriggerKeySelector.vue";
const navList = [
  {
    label: "常用配置",
    value: "common",
  },
  {
    label: "快捷键配置",
    value: "hotkey",
  },
]
const onChange = (value: string) => {
  active.value = value
}
const active = ref(navList[0].value)
defineProps<{
  config: ProgramConfig;
  clickStatus: ClickStatus;
}>();

const emit = defineEmits(["change"]);
</script>
<style lang="scss">
.settings-list {
  li {
    border-bottom: 1px solid #eeeeee;
    @apply w-full flex justify-between hover:bg-slate-1 rounded items-center px-2 h-[58px];
    cursor: pointer;

    .label {
      @apply text-gray-6 text-sm;

      .desc {
        @apply text-xs text-gray-4 mt-2;
      }
    }
  }

  li:last-child {
    border: none !important;
  }
}

.active {
  @apply text-blue-500 font-bold;
}
</style>
