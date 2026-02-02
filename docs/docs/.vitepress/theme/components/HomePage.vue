<template>
  <div class="homepage">
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
  @apply min-h-screen bg-cover bg-center relative overflow-auto;
  background-image: url('../assets/background.webp');
  background-position: center;
  background-size: cover;
}
</style>