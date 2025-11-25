import apiClient from './api'

/**
 * Chat Service - работа с чат API
 * Следует принципу Single Responsibility
 */
class ChatService {
  /**
   * Отправка сообщения в чат
   * @param {Array} messages - История сообщений [{role: 'user'|'assistant', content: string}]
   * @returns {Promise<Object>} - Ответ от API
   */
  async sendMessage(messages) {
    try {
      const response = await apiClient.post('/api/chat', { messages })
      return response.data
    } catch (error) {
      throw error
    }
  }
}

export default new ChatService()
