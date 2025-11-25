# MaxCar - AI Помощник по подбору автомобилей

Минималистичный чат-сайт для помощи новичкам в подборе автомобилей с использованием OpenAI GPT.

## Технологии

### Frontend
- Vue 3 (Composition API)
- Pinia (State Management)
- Vue Router
- Axios
- Bootstrap 5 + Bootstrap Icons
- Vite

### Backend
- Node.js
- Express 5
- OpenAI API (GPT-4o-mini)

## Структура проекта

```
maxcar-ai-project/
├── backend/
│   ├── controllers/
│   │   └── chatController.js      # Контроллер для работы с OpenAI
│   ├── routes/
│   │   └── chatRoutes.js          # API маршруты
│   └── server.js                  # Express сервер
├── src/
│   ├── assets/
│   │   └── main.css               # Глобальные стили
│   ├── components/
│   │   ├── AppHeader.vue          # Header компонент
│   │   └── ChatInterface.vue      # Чат интерфейс
│   ├── constants/
│   │   └── index.js               # Константы приложения
│   ├── pages/
│   │   └── Home.vue               # Главная страница
│   ├── router/
│   │   └── index.js               # Vue Router конфигурация
│   ├── services/
│   │   ├── api.js                 # Axios instance с interceptors
│   │   └── chatService.js         # Сервис для работы с chat API
│   ├── stores/
│   │   └── chatStore.js           # Pinia store для чата
│   ├── App.vue
│   └── main.js
├── .env                           # Переменные окружения
├── .env.example                   # Пример .env файла
└── package.json
```

## Установка и запуск

### 1. Установка зависимостей

```bash
npm install
```

### 2. Настройка переменных окружения

Создайте файл `.env` в корне проекта:

```env
# OpenAI API Key
OPENAI_API_KEY=your_openai_api_key_here

# Backend URL
# Для локальной разработки:
VITE_API_URL=http://localhost:3002

# Для production (раскомментируйте когда переносите на VPS):
# VITE_API_URL=https://your-vps-domain.com
```

### 3. Запуск в режиме разработки

**Терминал 1 - Frontend:**
```bash
npm run dev
```

**Терминал 2 - Backend:**
```bash
npm run server
```

Frontend будет доступен на `http://localhost:5173`
Backend API на `http://localhost:3002`

### 4. Production build

```bash
npm run build
npm run preview
```

## Архитектурные решения

### Clean Code принципы:

1. **Single Responsibility Principle (SRP)**
   - Каждый файл отвечает за одну задачу
   - `chatService.js` - только HTTP запросы
   - `chatController.js` - только бизнес-логика
   - `chatStore.js` - только state management

2. **DRY (Don't Repeat Yourself)**
   - Константы вынесены в `constants/index.js`
   - API client настроен один раз в `services/api.js`
   - Переиспользуемые компоненты

3. **Separation of Concerns**
   - Четкое разделение Frontend/Backend
   - Services слой для API calls
   - Store для управления состоянием
   - Components для UI

### Масштабируемость:

Проект структурирован для легкого расширения:

- Добавление новых страниц: `src/pages/`
- Новые API endpoints: `backend/routes/` + `backend/controllers/`
- Новые компоненты: `src/components/`
- Новые store: `src/stores/`

## API Endpoints

### POST `/api/chat`

Отправка сообщения в чат.

**Request:**
```json
{
  "messages": [
    {
      "role": "user",
      "content": "Помоги подобрать автомобиль"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": {
    "role": "assistant",
    "content": "Конечно! Расскажите..."
  }
}
```

### GET `/health`

Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

## Деплой на VPS

1. Установите Node.js на VPS
2. Склонируйте репозиторий
3. Обновите `.env` файл (замените `VITE_API_URL` на домен VPS)
4. Соберите frontend: `npm run build`
5. Настройте PM2 или systemd для запуска backend
6. Настройте Nginx как reverse proxy

## License

MIT
