<template>
  <div class="chat-interface">
    <div class="chat-messages" ref="messagesContainer">
      <div v-if="!chatStore.hasMessages" class="welcome-message">
        <i class="bi bi-chat-dots"></i>
        <h3>Здравствуйте!</h3>
        <p>Я помогу вам подобрать идеальный автомобиль.</p>
        <p class="hint">Расскажите о ваших предпочтениях, бюджете или просто спросите совет</p>
      </div>

      <div v-else class="messages-list">
        <div
          v-for="message in chatStore.messages"
          :key="message.id"
          :class="['message', `message-${message.role}`]"
        >
          <div class="message-icon">
            <i v-if="message.role === 'user'" class="bi bi-person-circle"></i>
            <i v-else class="bi bi-robot"></i>
          </div>
          <div class="message-content">
            <p>{{ message.content }}</p>
          </div>
        </div>

        <div v-if="chatStore.isLoading" class="message message-assistant">
          <div class="message-icon">
            <i class="bi bi-robot"></i>
          </div>
          <div class="message-content">
            <div class="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="chatStore.error" class="error-message">
        <i class="bi bi-exclamation-triangle"></i>
        {{ chatStore.error }}
      </div>
    </div>

    <div class="chat-input-wrapper">
      <form @submit.prevent="handleSubmit" class="chat-input-form">
        <input
          v-model="userInput"
          type="text"
          :placeholder="CHAT_CONFIG.placeholder"
          :maxlength="CHAT_CONFIG.maxMessageLength"
          :disabled="chatStore.isLoading"
          class="chat-input"
          ref="inputField"
        />
        <button
          type="submit"
          :disabled="!userInput.trim() || chatStore.isLoading"
          class="send-button"
        >
          <i class="bi bi-send-fill"></i>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, watch } from 'vue'
import { useChatStore } from '@/stores/chatStore'
import { CHAT_CONFIG } from '@/constants'

const chatStore = useChatStore()
const userInput = ref('')
const messagesContainer = ref(null)
const inputField = ref(null)

const handleSubmit = async () => {
  if (!userInput.value.trim() || chatStore.isLoading) return

  const message = userInput.value
  userInput.value = ''

  await chatStore.sendMessage(message)
  scrollToBottom()
}

const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

watch(() => chatStore.messages.length, scrollToBottom)
</script>

<style scoped>
.chat-interface {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
}

.welcome-message {
  text-align: center;
  padding: 3rem 1rem;
  color: #6b7280;
}

.welcome-message i {
  font-size: 4rem;
  color: #667eea;
  margin-bottom: 1rem;
}

.welcome-message h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #1f2937;
}

.welcome-message p {
  margin: 0.5rem 0;
}

.welcome-message .hint {
  font-size: 0.875rem;
  color: #9ca3af;
}

.messages-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.message {
  display: flex;
  gap: 1rem;
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message-icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 1.5rem;
}

.message-user .message-icon {
  background: #e0e7ff;
  color: #667eea;
}

.message-assistant .message-icon {
  background: #f3e8ff;
  color: #9333ea;
}

.message-content {
  flex: 1;
  background: #f9fafb;
  padding: 1rem;
  border-radius: 12px;
  line-height: 1.6;
}

.message-user .message-content {
  background: #e0e7ff;
}

.message-content p {
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.typing-indicator {
  display: flex;
  gap: 0.25rem;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  background: #9ca3af;
  border-radius: 50%;
  animation: typing 1.4s infinite;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%,
  60%,
  100% {
    transform: translateY(0);
    opacity: 0.7;
  }
  30% {
    transform: translateY(-10px);
    opacity: 1;
  }
}

.error-message {
  background: #fee;
  color: #c00;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
}

.chat-input-wrapper {
  padding: 1.5rem;
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
}

.chat-input-form {
  display: flex;
  gap: 0.75rem;
}

.chat-input {
  flex: 1;
  padding: 0.875rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 24px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}

.chat-input:focus {
  border-color: #667eea;
}

.chat-input:disabled {
  background: #f3f4f6;
  cursor: not-allowed;
}

.send-button {
  width: 48px;
  height: 48px;
  border: none;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  transition: transform 0.2s, opacity 0.2s;
}

.send-button:hover:not(:disabled) {
  transform: scale(1.05);
}

.send-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .chat-messages {
    padding: 1rem;
  }

  .welcome-message {
    padding: 2rem 1rem;
  }

  .welcome-message i {
    font-size: 3rem;
  }

  .chat-input-wrapper {
    padding: 1rem;
  }
}
</style>
