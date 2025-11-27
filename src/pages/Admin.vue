<template>
  <div class="admin-page">
    <!-- Форма авторизации -->
    <div v-if="!isAuthenticated" class="auth-wrapper">
      <div class="auth-card">
        <h2><i class="bi bi-shield-lock"></i> Админ-панель</h2>
        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label>Пароль:</label>
            <input
              v-model="password"
              type="password"
              class="form-control"
              placeholder="Введите пароль"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary w-100" :disabled="isLoading">
            <span v-if="isLoading" class="spinner-border spinner-border-sm me-2"></span>
            Войти
          </button>
          <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
        </form>
      </div>
    </div>

    <!-- Админ-панель настроек -->
    <div v-else class="settings-wrapper">
      <div class="container">
        <div class="settings-header">
          <h2><i class="bi bi-gear"></i> Настройки модели</h2>
          <button @click="handleLogout" class="btn btn-outline-secondary">
            <i class="bi bi-box-arrow-right"></i> Выйти
          </button>
        </div>

        <form @submit.prevent="handleSaveSettings" class="settings-form">
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label>Модель OpenAI:</label>
                <select v-model="settings.model" class="form-control" required>
                  <option value="gpt-4o">GPT-4o (мощная)</option>
                  <option value="gpt-4o-mini">GPT-4o-mini (быстрая)</option>
                  <option value="gpt-4-turbo">GPT-4 Turbo</option>
                  <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                </select>
              </div>
            </div>

            <div class="col-md-3">
              <div class="form-group">
                <label>Temperature (0-2):</label>
                <input
                  v-model.number="settings.temperature"
                  type="number"
                  step="0.1"
                  min="0"
                  max="2"
                  class="form-control"
                  required
                />
                <small class="form-text">Креативность ответов</small>
              </div>
            </div>

            <div class="col-md-3">
              <div class="form-group">
                <label>Max Tokens:</label>
                <input
                  v-model.number="settings.maxTokens"
                  type="number"
                  min="100"
                  max="4000"
                  class="form-control"
                  required
                />
                <small class="form-text">Макс. длина ответа</small>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label>Системный промпт:</label>
            <textarea
              v-model="settings.systemPrompt"
              class="form-control"
              rows="10"
              required
              placeholder="Введите системный промпт для модели..."
            ></textarea>
            <small class="form-text"
              >Описание роли и поведения AI-ассистента</small
            >
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-success" :disabled="isSaving">
              <span v-if="isSaving" class="spinner-border spinner-border-sm me-2"></span>
              <i v-else class="bi bi-check-circle me-2"></i>
              Сохранить настройки
            </button>
            <button type="button" @click="loadSettings" class="btn btn-secondary">
              <i class="bi bi-arrow-clockwise me-2"></i>
              Сбросить
            </button>
          </div>

          <div v-if="successMessage" class="alert alert-success mt-3">
            {{ successMessage }}
          </div>
          <div v-if="error" class="alert alert-danger mt-3">{{ error }}</div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002'

const isAuthenticated = ref(false)
const password = ref('')
const isLoading = ref(false)
const isSaving = ref(false)
const error = ref(null)
const successMessage = ref(null)

const settings = ref({
  model: 'gpt-4o-mini',
  temperature: 0.7,
  maxTokens: 1000,
  systemPrompt: '',
})

const handleLogin = async () => {
  error.value = null
  isLoading.value = true

  try {
    const response = await axios.post(`${API_BASE_URL}/api/settings/check-password`, {
      password: password.value,
    })

    if (response.data.success) {
      isAuthenticated.value = true
      sessionStorage.setItem('admin_auth', 'true')
      await loadSettings()
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Ошибка авторизации'
  } finally {
    isLoading.value = false
  }
}

const handleLogout = () => {
  isAuthenticated.value = false
  sessionStorage.removeItem('admin_auth')
  password.value = ''
}

const loadSettings = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/settings`)
    if (response.data.success) {
      settings.value = response.data.settings
    }
  } catch (err) {
    error.value = 'Ошибка загрузки настроек'
  }
}

const handleSaveSettings = async () => {
  error.value = null
  successMessage.value = null
  isSaving.value = true

  try {
    const response = await axios.post(`${API_BASE_URL}/api/settings`, settings.value)

    if (response.data.success) {
      successMessage.value = 'Настройки успешно сохранены!'
      setTimeout(() => {
        successMessage.value = null
      }, 3000)
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Ошибка сохранения настроек'
  } finally {
    isSaving.value = false
  }
}

onMounted(() => {
  // Проверяем сохраненную авторизацию
  if (sessionStorage.getItem('admin_auth') === 'true') {
    isAuthenticated.value = true
    loadSettings()
  }
})
</script>

<style scoped>
.admin-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.auth-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
}

.auth-card {
  background: white;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 400px;
}

.auth-card h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #1f2937;
}

.auth-card h2 i {
  color: #667eea;
  margin-right: 0.5rem;
}

.settings-wrapper {
  padding: 2rem 0;
}

.container {
  max-width: 900px;
  background: white;
  padding: 2rem;
  border-radius: 16px;
  margin: 0 auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.settings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e5e7eb;
}

.settings-header h2 {
  margin: 0;
  color: #1f2937;
}

.settings-header h2 i {
  color: #667eea;
  margin-right: 0.5rem;
}

.settings-form {
  margin-top: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #374151;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
}

.form-control:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

textarea.form-control {
  font-family: 'Courier New', monospace;
  resize: vertical;
}

.form-text {
  display: block;
  margin-top: 0.25rem;
  color: #6b7280;
  font-size: 0.875rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-success {
  background: #10b981;
  color: white;
}

.btn-success:hover:not(:disabled) {
  background: #059669;
}

.btn-secondary {
  background: #6b7280;
  color: white;
}

.btn-secondary:hover {
  background: #4b5563;
}

.btn-outline-secondary {
  background: transparent;
  color: #6b7280;
  border: 1px solid #d1d5db;
}

.btn-outline-secondary:hover {
  background: #f3f4f6;
}

.w-100 {
  width: 100%;
}

.alert {
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
}

.alert-danger {
  background: #fee;
  color: #c00;
  border: 1px solid #fcc;
}

.alert-success {
  background: #d1fae5;
  color: #065f46;
  border: 1px solid #6ee7b7;
}

@media (max-width: 768px) {
  .form-actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
</style>
