import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import ChatPanel from '@cordisjs/vitepress/client/components/chat-panel.vue'
import ChatMessage from './components/chat-message.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ChatPanel', ChatPanel)
    app.component('ChatMessage', ChatMessage)
  }
} satisfies Theme
