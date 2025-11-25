import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import chatService from '@/services/chatService'
import { MESSAGE_ROLES } from '@/constants'

/**
 * Chat Store
 * Управление состоянием чата (messages, loading, errors)
 */
export const useChatStore = defineStore('chat', () => {
  // State
  const messages = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  // Getters
  const hasMessages = computed(() => messages.value.length > 0)

  // Actions
  const addMessage = (role, content) => {
    messages.value.push({
      id: Date.now(),
      role,
      content,
      timestamp: new Date(),
    })
  }

  const sendMessage = async (userMessage) => {
    if (!userMessage.trim()) return

    error.value = null

    // Добавляем сообщение пользователя
    addMessage(MESSAGE_ROLES.USER, userMessage)

    isLoading.value = true

    try {
      // Готовим историю для API
      const messageHistory = messages.value.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }))

      // Отправляем запрос
      const response = await chatService.sendMessage(messageHistory)

      // Добавляем ответ ассистента
      if (response.success && response.message) {
        addMessage(MESSAGE_ROLES.ASSISTANT, response.message.content)
      } else {
        throw new Error('Некорректный ответ от сервера')
      }
    } catch (err) {
      error.value = err.message || 'Произошла ошибка при отправке сообщения'
      console.error('Chat error:', err)
    } finally {
      isLoading.value = false
    }
  }

  const clearMessages = () => {
    messages.value = []
    error.value = null
  }

  return {
    messages,
    isLoading,
    error,
    hasMessages,
    sendMessage,
    clearMessages,
  }
})
