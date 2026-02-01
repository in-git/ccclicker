<template>
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
</template>

<style scoped>
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
  .footer-content {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }

  .footer-links {
    gap: 16px;
  }
}
</style>