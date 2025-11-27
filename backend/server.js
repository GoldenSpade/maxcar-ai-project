import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import chatRoutes from './routes/chatRoutes.js'
import settingsRoutes from './routes/settingsRoutes.js'

// Получаем путь к текущему файлу
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Загружаем .env из корня проекта
dotenv.config({ path: join(__dirname, '../.env') })

const app = express()
const PORT = 3002

app.use(cors())
app.use(express.json())

// Подключение роутов
app.use('/api/chat', chatRoutes)
app.use('/api/settings', settingsRoutes)

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Server is running' })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
