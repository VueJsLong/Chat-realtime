<template>
  <div>
    <div class="message-page mess">
      <Header></Header>
      <Nuxt keep-alive></Nuxt>
      <ChatBox></ChatBox>
    </div>

    <!-- Popup -->
    <vue-snotify></vue-snotify>
    <base-modal></base-modal>
    <create-group></create-group>

    <!-- Audio -->
    <audio ref="receiveMessageSound" src="/sound/receive-message.mp3"></audio>
    <audio ref="startTypingSound" src="/sound/start-typing-2.mp3"></audio>
  </div>
</template>

<script>
import Header from '~/components/layout/Header.vue'
export default {
  components: { Header },
  watch: {
    $store() {},
  },
  watch: {
    '$store.state.event'(value) {
      if (String(value).startsWith(this.$socketEvent.chat.receiveMessages)) {
        this.playReceiveMessageSound()
      } else if (String(value).startsWith(this.$socketEvent.chat.typingStart)) {
        this.playStartTypingSound()
      }
    },
  },
  methods: {
    playReceiveMessageSound() {
      this.$refs.receiveMessageSound.play()
    },
    playStartTypingSound() {
      this.$refs.startTypingSound.play()
    },
  },
}
</script>

<style></style>
