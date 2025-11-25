import express from 'express'
import { sendMessage } from '../controllers/chatController.js'

const router = express.Router()

// POST /api/chat - отправка сообщения
router.post('/chat', sendMessage)

export default router
