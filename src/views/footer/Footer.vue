<template>
  <div class="footer">
    <div class="flex text-nowrap gap-4">
      <Running :isTriggered="isTriggered" />
      <ClickCounter />
    </div>

    <div class="flex items-center cursor-pointer gap-2">
      <a-tooltip title="复制QQ号" placement="topRight">
        <span class="flex items-center gap-1" @click="copyFeedback">
          反馈
          <TencentQq />
        </span>
      </a-tooltip>
      <a-tooltip title="转到开源地址" placement="topRight">
        <span class="flex items-center gap-1" @click="gotoGithub">
          开源地址
          <Github />
        </span>
      </a-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Github, TencentQq } from '@icon-park/vue-next';
import { openUrl } from '@tauri-apps/plugin-opener';
import { message } from 'ant-design-vue';
import ClickCounter from "./components/ClickCounter.vue";
import Running from "./components/Running.vue";

const contact = "444891953";
const github = "https://github.com/in-git/ccclicker"
defineProps<{
  isTriggered?: boolean;
}>();

const copyFeedback = async () => {
  try {
    await navigator.clipboard.writeText(contact);
    message.success("已复制到剪贴板");
  } catch (error) {
    message.error("复制失败");
  }
};

const gotoGithub = async () => {
  await openUrl(github);
};
</script>

<style lang="scss" scoped>
.footer {
  border-top: 1px solid #dadada;
  @apply w-full text-sm flex justify-between items-center px-3 bg-slate-2 py-1 text-xs;
}
</style>
