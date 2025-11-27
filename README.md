# MaxCar AI - Помощник по подбору автомобилей

Интеллектуальный чат-помощник для подбора автомобилей на базе OpenAI GPT с административной панелью управления настройками.

## Возможности

- Умный AI-консультант по подбору автомобилей
- Настраиваемая модель GPT через админ-панель
- Гибкая настройка поведения AI (temperature, max tokens, system prompt)
- Responsive дизайн для всех устройств
- REST API для интеграции

## Технологии

### Frontend
- Vue 3 (Composition API)
- Pinia (State Management)
- Vue Router
- Axios
- Bootstrap 5 + Bootstrap Icons
- Vite

### Backend
- Node.js + Express 5
- OpenAI API (GPT-4o / GPT-4o-mini / GPT-4 Turbo / GPT-3.5 Turbo)
- Dotenv для управления переменными окружения
- File-based конфигурация

## Структура проекта

```
maxcar-ai-project/
├── backend/
│   ├── config/
│   │   └── settings.json          # Настройки AI модели
│   ├── controllers/
│   │   ├── chatController.js      # Контроллер для работы с OpenAI
│   │   └── settingsController.js  # Контроллер настроек
│   ├── routes/
│   │   ├── chatRoutes.js          # API маршруты чата
│   │   └── settingsRoutes.js      # API маршруты настроек
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
│   │   ├── Home.vue               # Главная страница с чатом
│   │   └── Admin.vue              # Админ-панель настроек
│   ├── router/
│   │   └── index.js               # Vue Router конфигурация
│   ├── services/
│   │   ├── api.js                 # Axios instance с interceptors
│   │   └── chatService.js         # Сервис для работы с chat API
│   ├── stores/
│   │   └── chatStore.js           # Pinia store для чата
│   ├── App.vue
│   └── main.js
├── public/
│   └── .htaccess                  # Apache конфигурация
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

Создайте файл `.env` в корне проекта (используйте `.env.example` как шаблон):

```env
# OpenAI API Key
OPENAI_API_KEY=sk-your-openai-api-key-here

# Backend URL
# Для локальной разработки:
VITE_API_URL=http://localhost:3002

# Для production (раскомментируйте когда переносите на VPS):
# VITE_API_URL=https://api.yourdomain.com
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

- Frontend будет доступен на `http://localhost:5173`
- Backend API на `http://localhost:3002`

### 4. Production build

```bash
# Сборка frontend
npm run build

# Предпросмотр production сборки
npm run preview
```

## Использование

### Главная страница (/)

Основной интерфейс чата для взаимодействия с AI-помощником по подбору автомобилей.

### Админ-панель (/admin)

Доступ к настройкам модели через веб-интерфейс.

**Пароль по умолчанию:** `admin123`

**Доступные настройки:**
- **Модель OpenAI** - выбор между GPT-4o, GPT-4o-mini, GPT-4 Turbo, GPT-3.5 Turbo
- **Temperature** (0-2) - креативность ответов
- **Max Tokens** (100-4000) - максимальная длина ответа
- **System Prompt** - инструкции для AI о роли и поведении

Все изменения применяются сразу после сохранения, перезапуск backend не требуется.

## API Endpoints

### Chat API

#### POST `/api/chat`

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
    "content": "Конечно! Расскажите о ваших предпочтениях..."
  }
}
```

### Settings API

#### POST `/api/settings/check-password`

Проверка пароля администратора.

**Request:**
```json
{
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Доступ разрешен"
}
```

#### GET `/api/settings`

Получение текущих настроек модели.

**Response:**
```json
{
  "success": true,
  "settings": {
    "model": "gpt-4o-mini",
    "temperature": 0.7,
    "maxTokens": 1000,
    "systemPrompt": "Ты - эксперт-консультант..."
  }
}
```

#### POST `/api/settings`

Сохранение настроек модели.

**Request:**
```json
{
  "model": "gpt-4o-mini",
  "temperature": 0.7,
  "maxTokens": 1000,
  "systemPrompt": "Ты - эксперт-консультант..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Настройки успешно сохранены",
  "settings": { ... }
}
```

### Health Check

#### GET `/health`

Проверка работоспособности backend.

**Response:**
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

## Деплой на VPS

### 1. Подготовка сервера

```bash
# Установите Node.js (через NVM)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
nvm use 20

# Установите PM2
npm install -g pm2

# Установите Nginx
sudo apt update
sudo apt install nginx
```

### 2. Деплой приложения

```bash
# Клонируйте репозиторий
git clone <your-repo-url>
cd maxcar-ai-project

# Установите зависимости
npm install

# Настройте .env файл
nano .env
# Обновите VITE_API_URL на ваш домен API
# VITE_API_URL=https://api.yourdomain.com

# Соберите frontend
npm run build
```

### 3. Настройка Backend с PM2

```bash
# Запустите backend через PM2
cd backend
pm2 start server.js --name maxcar-api

# Сохраните конфигурацию PM2
pm2 save
pm2 startup
```

### 4. Настройка Nginx

#### Для API (api.yourdomain.com):

```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    client_max_body_size 50M;

    # Proxy settings
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;

    # WebSocket support
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";

    # Timeouts
    proxy_connect_timeout 60s;
    proxy_send_timeout 60s;
    proxy_read_timeout 60s;

    # Proxy to backend on port 3002
    location / {
        proxy_pass http://127.0.0.1:3002;
    }
}
```

#### Для Frontend (yourdomain.com):

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /path/to/maxcar-ai-project/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### 5. Настройка SSL с Certbot

```bash
# Установите Certbot
sudo apt install certbot python3-certbot-nginx

# Получите SSL сертификаты
sudo certbot --nginx -d yourdomain.com -d api.yourdomain.com
```

## Архитектурные решения

### Clean Code принципы:

1. **Single Responsibility Principle (SRP)**
   - Каждый файл отвечает за одну задачу
   - `chatService.js` - только HTTP запросы
   - `chatController.js` - только бизнес-логика OpenAI
   - `settingsController.js` - только управление настройками
   - `chatStore.js` - только state management

2. **DRY (Don't Repeat Yourself)**
   - Константы вынесены в `constants/index.js`
   - API client настроен один раз в `services/api.js`
   - Переиспользуемые компоненты
   - Единая функция `loadSettings()` для чтения настроек

3. **Separation of Concerns**
   - Четкое разделение Frontend/Backend
   - Services слой для API calls
   - Store для управления состоянием
   - Components для UI
   - Конфигурация отделена от кода (settings.json)

### Масштабируемость:

Проект структурирован для легкого расширения:

- Добавление новых страниц: `src/pages/`
- Новые API endpoints: `backend/routes/` + `backend/controllers/`
- Новые компоненты: `src/components/`
- Новые store: `src/stores/`
- Настройки модели изменяются без изменения кода

## Безопасность

- Пароль админ-панели хранится в backend
- API ключ OpenAI загружается из `.env` (не коммитится в Git)
- CORS настроен для защиты API
- Валидация всех входящих данных
- Используется HTTPS в production

## License

MIT
