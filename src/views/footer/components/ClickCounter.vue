<template>
  <div cursor-pointer @click="clickCount++" @contextmenu.prevent="clickCount++" @mousedown.middle="clickCount++">
    点我测试 <span class="ml-1 text-blue font-bold">{{ clickCount }}</span>
  </div>
</template>

<script setup lang="ts">
const clickCount = ref(0);
</script>
