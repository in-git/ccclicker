<template>
  <div class="homepage">
    <div class="background"></div>
    <!-- 导航栏 -->
    <NavBar />

    <!-- 主要内容区域 -->
    <HeroSection />

    <!-- 底部信息 -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Footer from './Footer.vue';
import HeroSection from './HeroSection.vue';
import NavBar from './NavBar.vue';
</script>

<style lang="scss" scoped>
.homepage {
  @apply min-h-screen ! bg-cover bg-center overflow-auto flex flex-col;

  .background {
    background-image: url('../assets/background.webp');
    background-position: center;
    background-size: cover;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
}
</style>