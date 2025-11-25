import OpenAI from 'openai'

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

    // Добавляем системный промпт в начало
    const systemPrompt = {
      role: 'system',
      content: `Ты - эксперт-консультант по подбору автомобилей.
Твоя задача - помогать новичкам, которые не разбираются в автомобилях.
Отвечай просто, понятно и дружелюбно.
Задавай уточняющие вопросы о бюджете, целях использования, предпочтениях.
Объясняй технические термины простым языком.
Отвечай на русском или украинском языке, в зависимости от языка вопроса.`,
    }

    const openai = getOpenAI()

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [systemPrompt, ...messages],
      temperature: 0.7,
      max_tokens: 1000,
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
