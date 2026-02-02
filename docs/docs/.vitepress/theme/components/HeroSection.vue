<template>
  <div class="hero-section">
    <div class=" max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex-1">
      <div class="flex flex-col justify-center items-center relative">

        <div class="text-center z-10 space-y-6 w-full sm:translate-y-24">
          <!-- 主标题 -->
          <h1 class="text-4xl sm:text-5xl lg:text-6xl title main-title">连点点</h1>
          <h1 class="text-xl sm:text-2xl lg:text-3xl title">
            连点 超简单
          </h1>
          <!-- 下载区域 -->
          <DownloadSection />
          <!-- 连点测试区域 -->
          <ClickTestSection />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ClickTestSection from './ClickTestSection.vue';
import DownloadSection from './DownloadSection.vue';
</script>

<style lang="scss">
.hero-section {
  height: calc(100vh - 57px - 68px);
}


.bg-icon {
  top: 20%;
  right: 10%;
}

.star-icon {
  font-size: 60px;
  color: rgba(255, 255, 255, 0.1);

}

.title {
  @apply font-light m-0 mb-8 tracking-wider leading-tight;
}

.main-title {
  text-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  letter-spacing: 8px;
}
</style>