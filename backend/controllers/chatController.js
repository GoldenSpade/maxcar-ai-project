import OpenAI from 'openai'
import { loadSettings } from './settingsController.js'

/**
 * Chat Controller
 * Обработка запросов к OpenAI API
 */

// Ленивая инициализация OpenAI клиента
let openaiInstance = null

const getOpenAI = () => {
  if (!openaiInstance) {
    openaiInstance = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  }
  return openaiInstance
}

/**
 * Обработка сообщения от пользователя
 * @param {Request} req - Express request
 * @param {Response} res - Express response
 */
export const sendMessage = async (req, res) => {
  try {
    const { messages } = req.body

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        success: false,
        message: 'Messages array is required',
      })
    }

    // Загружаем настройки из файла
    const settings = await loadSettings()

    // Добавляем системный промпт в начало
    const systemPrompt = {
      role: 'system',
      content: settings.systemPrompt,
    }

    const openai = getOpenAI()

    const completion = await openai.chat.completions.create({
      model: settings.model,
      messages: [systemPrompt, ...messages],
      temperature: settings.temperature,
      max_tokens: settings.maxTokens,
    })

    const assistantMessage = completion.choices[0].message

    res.json({
      success: true,
      message: assistantMessage,
    })
  } catch (error) {
    console.error('OpenAI API Error:', error.message)

    res.status(500).json({
      success: false,
      message: error.message || 'Ошибка при обработке запроса',
    })
  }
}
