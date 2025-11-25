<template>
  <header class="app-header">
    <div class="container">
      <div class="header-content">
        <div class="logo">
          <i class="bi bi-car-front-fill"></i>
          <span class="logo-text">MaxCar</span>
        </div>
        <p class="tagline">Помощник в подборе вашего идеального автомобиля</p>
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3rem 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.header-content {
  text-align: center;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.logo i {
  font-size: 3rem;
}

.logo-text {
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.tagline {
  font-size: 1.125rem;
  opacity: 0.95;
  margin: 0;
  font-weight: 300;
}

@media (max-width: 768px) {
  .app-header {
    padding: 2rem 0;
  }

  .logo i {
    font-size: 2rem;
  }

  .logo-text {
    font-size: 1.75rem;
  }

  .tagline {
    font-size: 1rem;
  }
}
</style>
