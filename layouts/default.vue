<template>
  <div>
    <div class="message-page mess">
      <Header></Header>
      <Nuxt></Nuxt>
      <ChatBox></ChatBox>
    </div>

    <vue-snotify></vue-snotify>
    <audio ref="receiveMessageSound" src="/sound/receive-message.mp3"></audio>
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
    '$store.state.userConversations'() {
      this.playReceiveMessageSound()
    },
    '$store.state.groupConversations'() {
      this.playReceiveMessageSound()
    },
    '$store.state.chatMessages'() {
      this.playReceiveMessageSound()
    },
  },
  methods: {
    playReceiveMessageSound() {
      // this.$refs.receiveMessageSound.play()
    },
  },
}
</script>

<style></style>
