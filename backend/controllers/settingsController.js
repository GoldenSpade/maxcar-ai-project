import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const SETTINGS_FILE = path.join(__dirname, '../config/settings.json')
const ADMIN_PASSWORD = 'admin123' // Статичный пароль

/**
 * Проверка пароля администратора
 */
export const checkPassword = (req, res) => {
  const { password } = req.body

  if (password === ADMIN_PASSWORD) {
    return res.json({ success: true, message: 'Доступ разрешен' })
  }

  res.status(401).json({ success: false, message: 'Неверный пароль' })
}

/**
 * Получение текущих настроек
 */
export const getSettings = async (req, res) => {
  try {
    const data = await fs.readFile(SETTINGS_FILE, 'utf-8')
    const settings = JSON.parse(data)
    res.json({ success: true, settings })
  } catch (error) {
    console.error('Error reading settings:', error.message)
    res.status(500).json({ success: false, message: 'Ошибка при чтении настроек' })
  }
}

/**
 * Сохранение настроек
 */
export const saveSettings = async (req, res) => {
  try {
    const { model, temperature, maxTokens, systemPrompt } = req.body

    // Валидация
    if (!model || temperature === undefined || !maxTokens || !systemPrompt) {
      return res.status(400).json({ success: false, message: 'Все поля обязательны' })
    }

    const settings = {
      model,
      temperature: parseFloat(temperature),
      maxTokens: parseInt(maxTokens),
      systemPrompt,
    }

    await fs.writeFile(SETTINGS_FILE, JSON.stringify(settings, null, 2), 'utf-8')

    res.json({ success: true, message: 'Настройки успешно сохранены', settings })
  } catch (error) {
    console.error('Error saving settings:', error.message)
    res.status(500).json({ success: false, message: 'Ошибка при сохранении настроек' })
  }
}

/**
 * Получение настроек для использования в chatController
 */
export const loadSettings = async () => {
  try {
    const data = await fs.readFile(SETTINGS_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error loading settings:', error.message)
    // Возвращаем дефолтные настройки если файл не найден
    return {
      model: 'gpt-4o-mini',
      temperature: 0.7,
      maxTokens: 1000,
      systemPrompt: 'Ты - эксперт-консультант по подбору автомобилей.',
    }
  }
}
