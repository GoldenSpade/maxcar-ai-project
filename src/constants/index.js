// API configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002'

// Chat configuration
export const CHAT_CONFIG = {
  maxMessageLength: 500,
  placeholder: 'Напишите ваш вопрос про автомобили...',
}

// Message roles
export const MESSAGE_ROLES = {
  USER: 'user',
  ASSISTANT: 'assistant',
  SYSTEM: 'system',
}
