<template>
  <div class="flex flex-col justify-center items-center min-h-screen px-6 relative w-full hero-section">
    <!-- 背景装饰图标 -->
    <div class="absolute opacity-60 bg-icon">
      <div class="star-icon">★</div>
    </div>

    <div class="text-center z-10 space-y-6">
      <!-- 主标题 -->
      <h1 class="text-6xl title main-title">连点点</h1>
      <h1 class="text-3xl title">
        连点 超简单
      </h1>
      <img src="../assets/software-home.png" alt="">
      <!-- 下载区域 -->
      <DownloadSection />
    </div>
  </div>
</template>

<script setup lang="ts">
import DownloadSection from './DownloadSection.vue';
</script>

<style scoped lang="scss">
.hero-section {
  padding: 80px 24px 120px;
}

.bg-icon {
  top: 20%;
  right: 10%;
  animation: float 6s ease-in-out infinite;
}

.star-icon {
  font-size: 80px;
  color: rgba(255, 255, 255, 0.1);
}

.title {
  @apply font-light m-0 mb-12 tracking-wider leading-tight md:text-4xl md:mb-8 sm:text-3xl sm:tracking-normal;
}

.main-title {
  text-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  letter-spacing: 12px;
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }

  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}
</style>