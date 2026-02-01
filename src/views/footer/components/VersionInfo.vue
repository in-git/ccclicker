<template>
  <a-tooltip :title="tips" placement="topRight">
    <div class="flex items-center text-xs text-gray-400">
      <span class="mr-1">v1.1.0</span>
    </div>
  </a-tooltip>
</template>

<script setup lang="ts">
const tips = ref(`当前版本仅有基础功能,免费且开源`)
</script>
