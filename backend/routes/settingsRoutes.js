import express from 'express'
import { checkPassword, getSettings, saveSettings } from '../controllers/settingsController.js'

const router = express.Router()

// POST /api/settings/check-password - проверка пароля
router.post('/check-password', checkPassword)

// GET /api/settings - получение настроек
router.get('/', getSettings)

// POST /api/settings - сохранение настроек
router.post('/', saveSettings)

export default router
