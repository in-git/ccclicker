<template>
  <nav class="navbar">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center nav-container">
        <div class="flex gap-1.5 items-center nav-logo">
          <img src="/logo.png" width="32" height="32" alt="" class="sm:w-10 sm:h-10">
          <span class="text-lg sm:text-xl lg:text-2xl font-bold">连点点</span>
        </div>
        <div class="hidden md:flex gap-6 lg:gap-8 nav-links">
          <a href="#" class="nav-link">产品介绍</a>
          <a href="#" class="nav-link">使用指南</a>
          <a href="#" class="nav-link">技术支持</a>
        </div>
        <!-- 移动端菜单按钮 -->
        <button class="md:hidden text-white p-2" aria-label="菜单">
          <span class="text-xl">☰</span>
        </button>
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
  height: 56px;
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
  white-space: nowrap;
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