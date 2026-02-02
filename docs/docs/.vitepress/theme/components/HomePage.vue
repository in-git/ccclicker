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

<style scoped>
.homepage {
  min-height: 100vh;
  background-image: url('../assets/background.webp');
  background-size: cover;
  background-position: center;
  position: relative;
  overflow: auto;
}


</style>