<template>
  <div>
    <div class="message-page mess">
      <Header></Header>
      <Nuxt></Nuxt>
      <div class="chat" v-if="conversation">
        <div class="chat-box">
          <div class="chat-box__header">
            <div class="item">
              <img :src="conversation.targetThumbnail" alt="thumbnail" />
              <div class="content">
                <div class="friends-message"></div>
                <div>{{ conversation.targetName }}</div>
              </div>
            </div>
            <div class="icon-message">
              <button class="m-icon-btn">
                <i class="fi fi-rr-info"></i>
              </button>
            </div>
          </div>
          <div class="chat-box__content ctm-scroll-y">
            <Message v-for="item in chatMessages" :key="item.id"></Message>
          </div>
          <div class="chat-box__footer">
            <textarea
              type="text"
              class="chat-box__input ctm-scroll-y"
              placeholder="Aa"
            ></textarea>
            <div class="chat-box-footer__icon">
              <button class="m-icon-btn">
                <i class="fi fi-rs-paper-plane"></i>
              </button>
              <button class="m-icon-btn">
                <i class="fi fi-rr-picture"></i>
              </button>
              <button class="m-icon-btn">
                <i class="fi fi-rr-microphone"></i>
              </button>
              <button class="m-icon-btn">
                <i class="fi fi-rr-smile"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="chat-introduction" v-else>
        <h2>Chào mừng bạn đến với ứng dụng chat của chúng tôi</h2>
      </div>
    </div>

    <vue-snotify></vue-snotify>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chatMessages: [],
      conversation: null,
    }
  },
  watch: {
    '$store.state.conversation'() {
      this.conversation = this.$store.getters.getConversation
      this.getCurrentConversation()
    },
  },
  methods: {
    getCurrentConversation(page = 1, size = 10) {
      console.log('change conversation', this.conversation)
      const params = {
        target: this.conversation.target,
        page: page,
        size: size,
      }
      this.$axios
        .get(`${this.$api.conversation}/${this.conversation.targetId}`, {
          params,
        })
        .then((res) => {
          this.chatMessages = res.data.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>

<style></style>
