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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  position: relative;
  overflow: auto;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
</style>