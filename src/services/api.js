import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002'

// Создаем экземпляр axios с базовой конфигурацией
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // 60 секунд для AI ответов
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor для логирования
apiClient.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor для обработки ошибок
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage = error.response?.data?.message || error.message || 'Произошла ошибка'

    console.error('API Error:', errorMessage)

    return Promise.reject({
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data,
    })
  }
)

export default apiClient
