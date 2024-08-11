<script setup>
import ChatMessage from '@cordisjs/vitepress/client/components/chat-message.vue'

const avatarMap = {
  '海豹核心': 'https://docs.sealdice.com/images/avatar/dice.svg'
}
</script>

<template>
  <ChatMessage :avatar="avatarMap[$attrs.nickname]">
    <slot />
  </ChatMessage>
</template>
