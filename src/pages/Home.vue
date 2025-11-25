<template>
  <div class="home-page">
    <AppHeader />
    <main class="main-content">
      <div class="container">
        <ChatInterface />
      </div>
    </main>
  </div>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
import ChatInterface from '@/components/ChatInterface.vue'
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom, #f9fafb 0%, #ffffff 100%);
}

.main-content {
  flex: 1;
  display: flex;
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
}

@media (max-width: 768px) {
  .main-content {
    padding: 1rem 0;
  }
}
</style>
