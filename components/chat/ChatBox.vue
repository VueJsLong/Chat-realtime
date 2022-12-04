<template>
  <div class="chat" v-if="conversation">
    <div class="chat-box">
      <!-- header start -->
      <div class="chat-box__header">
        <div class="item">
          <div
            class="m-thumbnail"
            :class="{ active: isActivating(conversationTarget?.status) }"
          >
            <img
              :src="thumbnail(conversation.targetThumbnail)"
              alt=""
              referrerpolicy="no-referrer"
            />
          </div>
          <div class="content">
            <div class="friend-name">{{ conversation.targetName }}</div>
            <div class="last-active" v-if="conversation.target == 'USER'">
              <span v-if="isActivating(conversationTarget?.status)">
                đang hoạt động
              </span>
              <span v-else-if="conversationTarget?.updatedAt">
                {{ $moment(conversationTarget?.updatedAt).fromNow() }}
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
        :id="conversation?.targetId"
        class="chat-box__content"
        @scroll="handleScroll"
      >
        <div class="d-flex justify-content-center mb-3" v-if="loadingChat">
          <b-spinner label=""></b-spinner>
        </div>
        <chat-message
          v-for="(item, index) in chatMessages"
          :key="item.id"
          :data="item"
          :isSameSource="isMessagesSameSource(index)"
          :isTimeMilestone="isMessagesTimeMilestone(index)"
          @referTo="setReferTo(item)"
          @forwardMessage="setForwardMessage(item)"
        ></chat-message>
        <chat-typing
          v-for="item in typing"
          :key="`${item.from}_${item.to}`"
          :data="item"
        ></chat-typing>
      </div>
      <!-- content end -->

      <!-- footer start -->
      <div class="chat-box__footer">
        <div class="chat-refer-to" v-if="messageInput.referTo">
          <div class="refer-to-content --text-ellipsis">
            {{ this.messageInput.referTo?.content }}
          </div>
          <button class="m-icon-btn" @click="setReferTo(null)">
            <i class="fi fi-rr-cross-small refer-to-close"></i>
          </button>
        </div>
        <textarea
          ref="chatInput"
          type="text"
          class="chat-box__input scroll-y"
          placeholder="Aa"
          v-model="messageInput.content"
          @keydown.exact.enter.prevent="sendMessage"
          @keyup.ctrl.enter="handleCtrlEnter"
        ></textarea>
        <div class="chat-box-footer__icon">
          <button class="m-icon-btn" title="send message" @click="sendMessage">
            <i class="fi fi-rs-paper-plane"></i>
          </button>
          <label for="send-image"> </label>
          <div class="image-upload">
            <label for="file-input" class="m-icon-btn" title="send image">
              <i class="fi fi-rr-picture"></i>
            </label>
            <input
              id="file-input"
              type="file"
              style="display: none"
              accept=".jpg, .jpeg, .png, .webp, .gif"
              multiple
              ref="imagesInput"
              @input="handleChooseImages"
            />
          </div>
          <emoji-box @input="(emoji) => insertEmoji(emoji)"></emoji-box>
        </div>
      </div>
      <!-- footer end -->
    </div>

    <!-- chat info start -->
    <chat-info v-if="isInfoShow" @hideChatInfo="toggleChatInfo"></chat-info>
    <!-- chat info end -->

    <!-- forward message modal -->
    <forward-message :data="forwardContent"></forward-message>
  </div>

  <!-- chat introduction start -->
  <div class="chat-introduction" v-else>
    <chat-introduction></chat-introduction>
  </div>
  <!-- chat introduction end -->
</template>

<script>
import { mapGetters } from 'vuex'
import ForwardMessage from '../popup/ForwardMessage.vue'
import ChatTyping from './ChatTyping.vue'
import EmojiBox from './EmojiBox.vue'

export default {
  components: { EmojiBox, ChatTyping, ForwardMessage },
  data() {
    return {
      chatMessages: [],
      conversation: null,
      messageInput: {
        content: '',
        referTo: null,
      },
      forwardContent: {
        content: null,
        type: null,
      },
      typing: [],
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
    // Lấy đối tượng của cuộc trò truyện, phục vụ hiển thị trạng thái hoạt động
    conversationTarget() {
      return this.conversation.target == 'USER'
        ? this.isConversationActivating(this.conversation)
        : this.conversation
    },
  },
  watch: {
    /**
     * Xử lý khi thay đổi cuộc trò truyện
     */
    '$store.state.conversation'() {
      this.conversation = this.$store.getters.getConversation
      this.resetChat()

      // Gọi api lấy danh sách tin nhắn
      this.getCurrentConversation()

      // Xử lý cuộn xuống dưới
      this.$nextTick(() => {
        this.chatBoxScrollBottom()
      })
    },

    /**
     * Lắng nghe danh sách tin nhắn
     */
    '$store.state.chatMessages'() {
      this.chatMessages = this.$store.getters.getChatMessages
    },

    /**
     * Lắng nghe danh sách typing
     */
    '$store.state.typing': {
      handler() {
        this.typing = this.$store.getters.getTyping()
      },
      deep: true,
    },

    /**
     * Xử lý phát, dừng phát sự kiện typing
     */
    'messageInput.content'(newValue, oldValue) {
      // Chuẩn bị payload
      const me = this
      const socket = this.$store.getters.getSocket
      const payload = {
        ...this.$auth.user,
        from: this.$auth.user.id,
        to: this.conversation.targetId,
        target: this.conversation.target,
      }

      // Nếu bây giờ có giá trị và trước đó không có giá trị => phát sự kiện typing
      // Nếu bây giờ không có giá trị và trước đó có giá trị => dừng phát sự kiện typing
      if (newValue && !oldValue) {
        socket.emit(me.$socketEvent.chat.typingStart, payload, (res) => {
          // this.debug(res)
        })
      } else if (!newValue && oldValue) {
        socket.emit(me.$socketEvent.chat.typingEnd, payload, (res) => {
          // this.debug(res)
        })
      }
    },
  },
  mounted() {},
  updated() {},
  methods: {
    /**
     * Xử lý lấy danh sách tin nhắn dựa vào cuộc trò chuyện
     * @param {*} page
     * @param {*} size
     */
    getCurrentConversation(page = 1, size = 20) {
      this.log('change conversation', this.conversation)
      const params = {
        target: this.conversation.target,
        page: page,
        size: size,
      }
      const p = this.$axios
        .get(`${this.$api.conversation}/${this.conversation.targetId}`, {
          params,
        })
        .then((res) => {
          this.$store.dispatch('setChatMessages', res.data.data)
          if (res.data.data.length < 20) {
            this.sizeCheck = true
          }
        })
      this.axiosLoadError(p)
    },
    insertEmoji(emoji) {
      this.messageInput.content += emoji
    },
    handleCtrlEnter() {
      this.messageInput.content += `
`
    },
    /**
     * Xử lý gửi tin nhắn
     * @param {*} event
     */
    async sendMessage(event) {
      if (String(this.messageInput.content).trim() == '') return

      const me = this
      const socket = this.$store.getters.getSocket

      const payload = {
        from: me.$auth.user.id,
        to: this.conversation.targetId,
        content: this.messageInput.content,
        status: null,
        type: 'TEXT',
        target: this.conversation.target,
        referTo: this.messageInput.referTo?.id,
      }
      socket.emit(me.$socketEvent.chat.sendMessages, payload, (res) => {
        // me.$snotify.success(me.$socketEvent.chat.sendMessages)
        // me.debug(res)
        me.appendChatMessages(res)
        me.bubbleConversationUp(res)
        me.messageInput.content = ''
        me.setReferTo(null)
        me.chatBoxScrollBottom()
      })
    },
    /**
     * Xử lý chọn ảnh hình ảnh
     */
    handleChooseImages(event) {
      // Lấy file
      const files = event.target.files

      // Kiểm tra kích thước file
      for (const file of files) {
        if (file.size > 1 * 1024 * 1024) {
          this.$snotify.error(`${file.name} phải nhỏ hơn 1MB.`)
          return
        }
      }

      // Thêm file vào form data
      const fd = new FormData()
      for (const file of files) {
        fd.append('files', file)
      }

      // Gọi api upload ảnh
      const p = this.$axios
        .post(this.$api.uploadMultipleImage, fd)
        .then((res) => this.sendImages(res.data.data))
      this.axiosLoadError(p)
    },

    /**
     * Gửi ảnh
     */
    sendImages(filePaths) {
      const me = this
      const socket = this.$store.getters.getSocket

      // Lặp qua từng path và gửi tin nhắn
      for (const item of filePaths) {
        const payload = {
          from: me.$auth.user.id,
          to: this.conversation.targetId,
          content: item.filePath,
          status: null,
          type: 'IMAGE',
          target: this.conversation.target,
        }
        // this.log({ item, payload })
        socket.emit(me.$socketEvent.chat.sendMessages, payload, (res) => {
          me.appendChatMessages(res)
          me.bubbleConversationUp(res)
          me.chatBoxScrollBottom()
        })
      }
    },

    /**
     * Kiểm tra 2 tin nhắn liền kề có cùng nguồn hay không
     * Nếu cùng nguồn, ẩn thumbnail
     * @param {*} index
     */
    isMessagesSameSource(index) {
      if (index == 0) return false
      return (
        this.chatMessages[index].from.id == this.chatMessages[index - 1].from.id
      )
    },
    /**
     * Kiểm tra 2 tin nhắn liền kề có lệch giờ nhau nhiều hay không
     * Nếu lệch nhiều, hiển thị info ngày giờ
     * @param {*} index
     */
    isMessagesTimeMilestone(index) {
      if (index == 0) return true
      const thisMessage = this.chatMessages[index]
      const previousMessage = this.chatMessages[index - 1]

      const thisMoment = this.$moment(thisMessage.createdAt)
      const previousMoment = this.$moment(previousMessage.createdAt)

      // Nếu khác ngày
      if (thisMoment.date() - previousMoment.date() > 0) return true

      // Nếu cùng ngày và cách nhau hơn 30 phút
      return thisMoment.diff(previousMoment, 'minutes') > 30
    },
    /**
     * Xử lý cuộn chuột xuống dưới
     */
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
            this.getData()
          }
        }
      }
      this.lastScrollTop = nowScrollTop
    },
    getData(size = 20) {
      this.page = this.page + 1
      const params = {
        target: this.conversation.target,
        page: this.page,
        size: size,
      }

      // Tính toán scrollTop
      const scrollHeight = this.$refs.chatBoxContent.scrollHeight
      const scrollTop = (0.2 / this.page) * scrollHeight
      // this.log(this.page, scrollTop, scrollHeight)

      const p = this.$axios
        .get(`${this.$api.conversation}/${this.conversation.targetId}`, {
          params,
        })
        .then((res) => {
          this.chatMessages = res.data.data.concat(this.chatMessages)
          this.loadingChat = false
          if (res.data.data.length < 20) {
            this.sizeCheck = true
          }
          $('.chat-box__content').scrollTop(scrollTop)
        })
      this.axiosLoadError(p)
    },
    resetChat() {
      this.sizeCheck = false
      this.page = 1
      this.messageInput = {
        content: '',
        referTo: null,
      }
    },
    setReferTo(message) {
      this.messageInput.referTo = message
    },
    setForwardMessage(message) {
      this.forwardContent = {
        content: message.content,
        type: message.type,
      }
      this.$bvModal.show('forward-message')
    },
  },
}
</script>

<style>
.chat-box__content {
  -webkit-animation-name: fade;
  -webkit-animation-duration: 0.5s;
  animation-name: fade;
  animation-duration: 0.5s;
}
@-webkit-keyframes fade {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes fade {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
