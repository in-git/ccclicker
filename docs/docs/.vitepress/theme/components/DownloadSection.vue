<template>
  <div class="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col items-center gap-4">
      <a
        href="https://github.com/in-git/ccclicker/releases"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-3 px-8 py-4 rounded-full no-underline text-base font-semibold transition-all duration-300 sm:px-6 sm:py-3 sm:text-sm xs:px-4 xs:py-2.5 xs:text-xs download-btn"
      >
        <span class="text-xl sm:text-lg xs:text-base">⬇</span>
        <span class="whitespace-nowrap">Windows 版下载</span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
// 暂时移除图标导入，使用简单符号替代
</script>

<style scoped>
.download-btn {
  background: rgba(255, 255, 255, 0.95);
  color: #333;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.download-btn:hover {
  background: white;
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
}
</style>