<template>
  <div class="chat" v-if="conversation">
    <div class="chat-box">
      <!-- header start -->
      <div class="chat-box__header">
        <div class="item">
          <div
            class="m-thumbnail"
            :class="{ active: isActivating(conversationUser?.status) }"
          >
            <img
              :src="conversation.targetThumbnail"
              alt=""
              referrerpolicy="no-referrer"
            />
          </div>
          <div class="content">
            <div class="friend-name">{{ conversation.targetName }}</div>
            <div class="last-active" v-if="conversation.target == 'USER'">
              <span v-if="isActivating(conversationUser?.status)">
                đang hoạt động
              </span>
              <span v-else-if="conversationUser?.updatedAt">
                {{ $moment(conversationUser?.updatedAt).fromNow() }}
              </span>
              <span v-else></span>
            </div>
          </div>
        </div>
        <div class="chat-box-header__icons">
          <button
            class="m-icon-btn"
            :class="{ active: isSearchShow }"
            @click="toggleSearchTool"
            title="search"
            v-if="false"
          >
            <i class="fi fi-rr-search"></i>
          </button>
          <button
            class="m-icon-btn"
            :class="{ active: isInfoShow }"
            @click="toggleChatInfo"
            title="chat info"
          >
            <i class="fi fi-rr-info"></i>
          </button>
        </div>
      </div>
      <!-- header end -->

      <!-- tool start-->
      <div class="chat-box__tool" v-if="isSearchShow">
        <div class="search-tool">
          <div class="m-textfield --no-border">
            <div class="m-input-container">
              <input
                class="m-input-container__input"
                type="text"
                name="input"
                placeholder="Search message"
              />
              <button
                type="button"
                class="m-input-container__icon m-icon m-icon-btn"
                tabindex="-1"
              >
                <i class="fi fi-rr-search input-search-icon"></i>
              </button>
            </div>
          </div>
          <div class="search-tool__paging">
            <button class="m-icon-btn">
              <i class="fi fi-rs-angle-up"></i>
            </button>
            <span>1/7</span>
            <button class="m-icon-btn">
              <i class="fi fi-rs-angle-down"></i>
            </button>
          </div>
        </div>
      </div>
      <!-- tool end -->

      <!-- content start -->
      <div
        ref="chatBoxContent"
        class="chat-box__content"
        @scroll="handleScroll"
      >
        <div class="d-flex justify-content-center mb-3" v-if="loadingChat">
          <b-spinner label=""></b-spinner>
        </div>
        <ChatMessage
          v-for="(item, index) in chatMessages"
          :key="item.id"
          :data="item"
          :isSameSource="isMessagesSameSource(index)"
        ></ChatMessage>
      </div>
      <!-- content end -->

      <!-- footer start -->
      <div class="chat-box__footer">
        <textarea
          type="text"
          class="chat-box__input scroll-y"
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
    <chat-info v-if="isInfoShow" @hideChatInfo="toggleChatInfo"></chat-info>
  </div>
  <div class="chat-introduction" v-else>
    <chat-introduction></chat-introduction>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chatMessages: [],
      conversation: null,
      messageInput: '',
      referTo: null,
      isInfoShow: false,
      isSearchShow: false,
      searchInput: '',
      lastScrollTop: 0,
      loadingChat: false,
      page: 1,
      sizeCheck: false,
    }
  },
  computed: {
    conversationUser() {
      return this.isConversationActivating(this.conversation)
    },
  },
  watch: {
    '$store.state.conversation'() {
      this.conversation = this.$store.getters.getConversation
      this.resetChat()
      this.getCurrentConversation()
    },
    '$store.state.chatMessages'() {
      this.chatMessages = this.$store.getters.getChatMessages
    },
  },
  mounted() {},
  updated() {
    //
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
          if (res.data.data.length < 20) {
            this.sizeCheck = true
          }
        })
        .catch((err) => {
          this.log(err)
        })
    },
    async handleCtrlEnter() {
      await this.sendMessage()
    },
    async sendMessage() {
      if (String(this.messageInput).trim() == '') return

      const me = this
      const socket = this.$store.getters.getSocket
      // this.log(socket)

      const payload = {
        from: me.$auth.user.id,
        to: this.conversation.targetId,
        content: this.messageInput,
        status: null,
        type: 'TEXT',
        target: this.conversation.target,
        referTo: this.referTo,
      }
      socket.emit(me.$socketEvent.chat.sendMessages, payload, (res) => {
        // me.$snotify.success(me.$socketEvent.chat.sendMessages)
        // me.debug(res)
        me.appendChatMessages(res)
        me.bubbleConversationUp(res)
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
    toggleChatInfo() {
      this.isInfoShow = !this.isInfoShow
    },
    toggleSearchTool() {
      this.isSearchShow = !this.isSearchShow
    },
    searchMessage() {
      this.debug('search message', this.searchInput)
    },
    handleScroll(e) {
      var nowScrollTop = e.srcElement.scrollTop
      if (nowScrollTop < this.lastScrollTop) {
        if (nowScrollTop == 0) {
          if (!this.sizeCheck) {
            this.loadingChat = true
            this.getdata()
          }
        }
      }
      this.lastScrollTop = nowScrollTop
    },
    getdata(size = 20) {
      this.page = this.page + 1
      const params = {
        target: this.conversation.target,
        page: this.page,
        size: size,
      }
      this.$axios
        .get(`${this.$api.conversation}/${this.conversation.targetId}`, {
          params,
        })
        .then((res) => {
          this.chatMessages = res.data.data.concat(this.chatMessages)
          this.loadingChat = false
          if (res.data.data.length < 20) {
            this.sizeCheck = true
          }
          $('.chat-box__content').scrollTop(50)
        })
        .catch((err) => {
          this.log(err)
        })
    },
    resetChat() {
      this.sizeCheck = false
      this.page = 1
    },
  },
}
</script>

<style></style>
