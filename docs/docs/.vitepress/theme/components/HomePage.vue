<template>
  <div class="homepage">
    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="nav-container">
        <div class="nav-logo">
          <span>连点点</span>
        </div>
        <div class="nav-links">
          <a href="#" class="nav-link">产品介绍</a>
          <a href="#" class="nav-link">使用指南</a>
          <a href="#" class="nav-link">技术支持</a>
        </div>
      </div>
    </nav>

    <!-- 主要内容区域 -->
    <div class="hero-section">
      <!-- 背景装饰图标 -->
      <div class="bg-icon">
        <Star theme="outline" size="80" fill="rgba(255,255,255,0.1)"/>
      </div>

      <div class="hero-content">
        <!-- 主标题 -->
        <h1 class="hero-title">连点点 轻松做自己</h1>

        <!-- 下载按钮 -->
        <div class="download-section">
          <a
            href="https://github.com/in-git/ccclicker/releases"
            target="_blank"
            rel="noopener noreferrer"
            class="download-btn"
          >
            <Download theme="outline" size="20" fill="currentColor"/>
            Windows 版下载
          </a>

          <!-- 版本信息 -->
          <div class="version-info">
            <span class="version">v1.0.0</span>
            <span class="date">2024-01-16</span>
          </div>

          <!-- 更多下载选项 -->
          <div class="more-downloads">
            <span>更多 Windows 版本下载</span>
            <Right theme="outline" size="16" fill="currentColor"/>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部信息 -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-links">
          <span>服务条款</span>
          <span>合作伙伴</span>
        </div>
        <div class="copyright">
          <span>Copyright © 2024 连点点. All Rights Reserved. 保留所有权利</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import {
    Download,
    Right,
    Star
} from '@icon-park/vue-next';
</script>

<style scoped>
.homepage {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  position: relative;
  overflow: hidden;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

/* 导航栏 */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

.nav-logo span {
  font-size: 24px;
  font-weight: bold;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.nav-links {
  display: flex;
  gap: 32px;
}

.nav-link {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;
}

.nav-link:hover {
  color: white;
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

/* 主要内容区域 */
.hero-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 80px 24px 120px;
  position: relative;
}

.bg-icon {
  position: absolute;
  top: 20%;
  right: 10%;
  opacity: 0.6;
  animation: float 6s ease-in-out infinite;
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
  color: white;
  margin: 0 0 48px 0;
  text-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  letter-spacing: 2px;
  line-height: 1.2;
}

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

.download-btn:hover {
  background: white;
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
}

.version-info {
  display: flex;
  gap: 16px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
}

.version {
  font-weight: 600;
}

.date {
  opacity: 0.7;
}

.more-downloads {
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.more-downloads:hover {
  color: white;
}




/* 底部信息 */
.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
}

.footer-links {
  display: flex;
  gap: 24px;
}

.footer-links span {
  cursor: pointer;
  transition: color 0.3s ease;
}

.footer-links span:hover {
  color: white;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-links {
    display: none;
  }

  .hero-title {
    font-size: 36px;
    margin-bottom: 32px;
  }

  .platform-icons {
    flex-wrap: wrap;
    gap: 16px;
    max-width: 300px;
  }

  .footer-content {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }

  .footer-links {
    gap: 16px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 28px;
    letter-spacing: 1px;
  }

  .download-btn {
    padding: 14px 24px;
    font-size: 14px;
  }

  .platform-icons {
    position: static;
    margin-top: 40px;
    transform: none;
  }
}
</style>