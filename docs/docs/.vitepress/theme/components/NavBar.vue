<template>
  <nav class="fixed top-0 left-0 right-0 z-1000 navbar">
    <div class="max-w-6xl mx-auto px-6 flex justify-between items-center nav-container">
      <div class="flex gap-1.5 items-center nav-logo">
        <img src="/logo.png" width="42" alt="">
        <span class="text-2xl font-bold">连点点</span>
      </div>
      <div class="flex gap-8 md:hidden nav-links">
        <a href="#" class="nav-link">产品介绍</a>
        <a href="#" class="nav-link">使用指南</a>
        <a href="#" class="nav-link">技术支持</a>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-container {
  height: 60px;
}

.nav-logo span {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.nav-link {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: white;
  transition: width 0.3s ease;
}

.nav-link:hover::after {
  width: 100%;
}
</style>