<template>
  <div class="footer">
    <div class="flex text-nowrap gap-4">
      <ClickCounter />
    </div>

    <div class="flex items-center cursor-pointer gap-2">
      <a-tooltip v-for="link in footerLinks" :key="link.text" :title="link.title" placement="topRight">
        <span class="icon" @click="link.handler">
          {{ link.text }}
          <component :is="link.icon" />
        </span>
      </a-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Github, Help, TencentQq } from '@icon-park/vue-next';
import { openUrl } from '@tauri-apps/plugin-opener';
import { message } from 'ant-design-vue';
import ClickCounter from "./components/ClickCounter.vue";

const contact = "444891953";
const github = "https://github.com/in-git/ccclicker";
const docUrl = 'https://app.mx2d.cn/ccclicker'
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

const gotoDoc = async () => {
  await openUrl(docUrl);
};

const gotoGithub = async () => {
  await openUrl(github);
};

const footerLinks = [
  {
    text: '帮助',
    title: '帮助',
    icon: Help,
    handler: gotoDoc
  },
  {
    text: '反馈',
    title: '复制QQ号',
    icon: TencentQq,
    handler: copyFeedback
  },
  {
    text: '开源地址',
    title: '转到开源地址',
    icon: Github,
    handler: gotoGithub
  }
];
</script>

<style lang="scss" scoped>
.footer {
  border-top: 1px solid #dadada;
  @apply w-full text-sm flex justify-between items-center px-3 py-1 text-xs;
}

.icon {

  @apply flex items-center gap-1;
}
</style>
