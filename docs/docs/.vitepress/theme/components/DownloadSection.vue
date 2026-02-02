<template>
  <div class="download-section">
    <a
      href="https://github.com/in-git/ccclicker/releases"
      target="_blank"
      rel="noopener noreferrer"
      class="download-btn"
    >
      <span class="download-icon">⬇</span>
      Windows 版下载
    </a>

    <!-- 版本信息 -->
    <div class="version-info">
      <span class="version">v1.0.0</span>
      <span class="date">2024-01-16</span>
    </div>

  </div>
</template>

<script setup lang="ts">
// 暂时移除图标导入，使用简单符号替代
</script>

<style scoped>
.download-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.download-btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.95);
  color: #333;
  padding: 16px 32px;
  border-radius: 50px;
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.download-icon {
  font-size: 20px;
}

.arrow-icon {
  font-size: 16px;
}

.download-btn:hover {
  background: white;
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
}

.version-info {
  display: flex;
  gap: 16px;
  font-size: 14px;
}

.version {
  font-weight: 600;
}

.date {
  opacity: 0.7;
}



/* 响应式设计 */
@media (max-width: 480px) {
  .download-btn {
    padding: 14px 24px;
    font-size: 14px;
  }
}
</style>