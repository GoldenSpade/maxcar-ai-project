import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import chatRoutes from './routes/chatRoutes.js'

dotenv.config()

const app = express()
const PORT = 3002

app.use(cors())
app.use(express.json())

// Подключение роутов
app.use('/api', chatRoutes)

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Server is running' })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
