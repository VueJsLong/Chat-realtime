<template>
  <div class="chat" v-if="conversation">
    <div class="chat-box">
      <div class="chat-box__header">
        <div class="item">
          <img
            :src="conversation.targetThumbnail"
            alt=""
            class="m-thumbnail"
            referrerpolicy="no-referrer"
          />
          <div class="content">
            <div class="friends-message"></div>
            <div>{{ conversation.targetName }}</div>
          </div>
        </div>
        <div class="icon-message">
          <button class="m-icon-btn" title="chat info">
            <i class="fi fi-rr-info"></i>
          </button>
        </div>
      </div>
      <div ref="chatBoxContent" class="chat-box__content ctm-scroll-y">
        <ChatMessage
          v-for="(item, index) in chatMessages"
          :key="item.id"
          :data="item"
          :isSameSource="isMessagesSameSource(index)"
        ></ChatMessage>
      </div>
      <div class="chat-box__footer">
        <textarea
          type="text"
          class="chat-box__input ctm-scroll-y"
          placeholder="Aa"
          v-model="messageInput"
          @keyup.ctrl.enter="handleCtrlEnter"
        ></textarea>
        <div class="chat-box-footer__icon">
          <button class="m-icon-btn" title="send message" @click="sendMessage">
            <i class="fi fi-rs-paper-plane"></i>
          </button>
          <button class="m-icon-btn" title="send image">
            <i class="fi fi-rr-picture"></i>
          </button>
          <button class="m-icon-btn" title="send voice">
            <i class="fi fi-rr-microphone"></i>
          </button>
          <button class="m-icon-btn" title="send emoji">
            <i class="fi fi-rr-smile"></i>
          </button>
        </div>
      </div>
    </div>
    <chat-info></chat-info>
  </div>
  <div class="chat-introduction" v-else>
    <h2>Chào mừng bạn đến với ứng dụng chat của chúng tôi</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chatMessages: [],
      conversation: null,
      messageInput: '',
    }
  },
  watch: {
    '$store.state.conversation'() {
      this.conversation = this.$store.getters.getConversation
      this.getCurrentConversation()
    },
    '$store.state.chatMessages'() {
      this.chatMessages = this.$store.getters.getChatMessages
    },
  },
  mounted() {},
  updated() {
    this.chatBoxScrollBottom()
  },
  methods: {
    getCurrentConversation(page = 1, size = 20) {
      this.log('change conversation', this.conversation)
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
          this.$store.dispatch('setChatMessages', res.data.data)
        })
        .catch((err) => {
          this.log(err)
        })
    },
    async handleCtrlEnter() {
      await this.sendMessage()
    },
    async sendMessage() {
      const me = this
      const socket = this.$store.getters.getSocket
      this.log(socket)

      const payload = {
        from: me.$auth.user.id,
        to: this.conversation.targetId,
        content: this.messageInput,
        status: null,
        target: this.conversation.target,
      }
      socket.emit(me.$socketEvent.chat.sendMessages, payload, (res) => {
        // me.$snotify.success(me.$socketEvent.chat.sendMessages)
        me.debug(res)
        me.appendChatMessages(res)
        me.messageInput = ''
      })
    },
    isMessagesSameSource(index) {
      if (index == 0) return false
      return (
        this.chatMessages[index].from.id == this.chatMessages[index - 1].from.id
      )
    },
    chatBoxScrollBottom() {
      const chatBoxContent = this.$refs.chatBoxContent
      chatBoxContent.scrollTop = chatBoxContent.scrollHeight
      // this.log(chatBoxContent)
    },
  },
}
</script>

<style></style>
