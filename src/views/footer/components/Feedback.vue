<template>
  <div class="flex items-center cursor-pointer" @click="copyFeedback">
    <span class="text-blue-400 mr-2">💬</span>
    <span>反馈 {{ contact }}</span>
  </div>
</template>

<script setup lang="ts">
import { message } from "ant-design-vue";

const contact = "444891953";

const copyFeedback = async () => {
  try {
    await navigator.clipboard.writeText(contact);
    message.success("已复制到剪贴板");
  } catch (error) {
    message.error("复制失败");
  }
};
</script>
