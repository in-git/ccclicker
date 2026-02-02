<template>
  <div class="hero-section">
    <!-- 背景装饰图标 -->
    <div class="bg-icon">
      <div class="star-icon">★</div>
    </div>

    <div class="hero-content">
      <!-- 主标题 -->
      <h1 class="hero-title">连点点 连点 超简单</h1>

      <!-- 下载区域 -->
      <DownloadSection />
    </div>
  </div>
</template>

<script setup lang="ts">
import DownloadSection from './DownloadSection.vue';
</script>

<style scoped>
.hero-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 80px 24px 120px;
  position: relative;
  width: 100%;
}

.bg-icon {
  position: absolute;
  top: 20%;
  right: 10%;
  opacity: 0.6;
  animation: float 6s ease-in-out infinite;
}

.star-icon {
  font-size: 80px;
  color: rgba(255,255,255,0.1);
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

.hero-content {
  text-align: center;
  z-index: 10;
}

.hero-title {
  font-size: 64px;
  font-weight: 300;
  margin: 0 0 48px 0;
  text-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  letter-spacing: 2px;
  line-height: 1.2;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero-title {
    font-size: 36px;
    margin-bottom: 32px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 28px;
    letter-spacing: 1px;
  }
}
</style>