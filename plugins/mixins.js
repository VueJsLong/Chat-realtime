import Vue from 'vue'

// Make sure to pick a unique name for the flag
// so it won't conflict with any other mixin.
if (!Vue.__my_mixin__) {
  Vue.__my_mixin__ = true

  Vue.mixin({
    computed: {
      isAdmin() {
        return this.$auth.user.id == this.$constants.ADMIN_ID
      },
    },
    methods: {
      /**
       * Kiểm tra trạng thái active của status
       * @param {*} status
       * @returns
       */
      isActivating(status) {
        return status == this.$constants.userStatus.online
      },

      /**
       * Kiểm tra conversation có active hay không, dựa vào danh sách bạn bè
       * @param {*} conversation
       * @returns bạn bè nếu tìm thấy, null nếu không tìm thấy
       */
      isConversationActivating(conversation) {
        const storedFriends = this.$store.getters.getFriends
        const storedRequests = this.$store.getters.getRequests
        const friendStore = [...storedFriends, ...storedRequests]

        // Tạo đối tượng bạn bè tạm thời, phục vụ tái sử dụng hàm compareTwoFriendRecord
        const conversationFriend = {
          from: {
            id: conversation.targetId,
          },
          to: {
            id: this.$auth.user.id,
          },
        }
        // Tìm kiếm conversation trong danh sách bạn bè
        const activeFriend = friendStore.find((friend) => {
          return this.compareTwoFriendRecord(friend, conversationFriend)
        })
        if (activeFriend) return this.getFriend(activeFriend)
        else return null
      },
      axiosLoadError(p, callback = () => {}) {
        p.catch((error) => {
          if (error.response) {
            this.$snotify.error(error.response.data?.messages)
          } else if (error.request) {
            this.$snotify.error(error.request)
          } else {
            this.$snotify.error(error.message)
          }
          callback()
        })
      },
      // console
      log(...args) {
        if (
          this.$config.environment == 'DEVELOPMENT' ||
          this.$config.environment == 'development'
        )
          console.log(...args)
      },
      warn(...args) {
        if (
          this.$config.environment == 'DEVELOPMENT' ||
          this.$config.environment == 'development'
        )
          console.warn(...args)
      },
      error(...args) {
        if (
          this.$config.environment == 'DEVELOPMENT' ||
          this.$config.environment == 'development'
        )
          console.error(...args)
      },
      debug(...args) {
        if (
          this.$config.environment == 'DEVELOPMENT' ||
          this.$config.environment == 'development'
        )
          console.debug(...args)
      },
      goBack() {
        if (window) {
          window.history.back()
        }
      },
      // compare
      compareTwoFriendRecord(friendA, friendB) {
        if (
          friendA.from.id == friendB.from.id &&
          friendA.to.id == friendB.to.id
        )
          return true
        else if (
          friendA.from.id == friendB.to.id &&
          friendA.to.id == friendB.from.id
        )
          return true
        return false
      },
      compareMessageVsConversation(message, conversation) {
        // this.debug('compareMessageVsConversation', message, conversation)
        if (message.target == 'USER') {
          if (
            message?.from?.id == conversation?.from &&
            message?.to?.id == conversation?.to
          )
            return true
          else if (
            message?.from?.id == conversation?.to &&
            message?.to?.id == conversation?.from
          )
            return true
          return false
        } else {
          if (message?.to?.id == conversation?.to) return true
          return false
        }
      },
      compareMessageVsActiveConversation(chatMessage) {
        // check is conversation active
        const storedConversation = this.$store.getters.getConversation
        if (chatMessage.target == 'USER') {
          if (
            chatMessage.target == storedConversation.target &&
            chatMessage.from.id == storedConversation.targetId
          )
            return true
          return false
        } else {
          if (
            chatMessage.target == storedConversation.target &&
            chatMessage.to.id == storedConversation.targetId
          )
            return true
          return false
        }
      },
      // append
      appendChatMessages(chatMessage) {
        // append chat
        const storedChatMessages = this.$store.getters.getChatMessages
        storedChatMessages.push(chatMessage)
        this.$store.dispatch('setChatMessages', storedChatMessages)
      },
      bubbleConversationUp(chatMessage) {
        // lấy ra danh sách tin nhắn
        let storedTargetConversation = []
        if (chatMessage.target == 'USER') {
          storedTargetConversation = [
            ...this.$store.getters.getUserConversations,
          ]
        } else {
          storedTargetConversation = [
            ...this.$store.getters.getGroupConversations,
          ]
        }
        // Xử lý đưa lên top
        // lấy ra conversation cần đưa lên top
        let targetConv = storedTargetConversation.find((current) => {
          return this.compareMessageVsConversation(chatMessage, current)
        })
        this.debug(targetConv)
        if (!targetConv) {
          targetConv = {
            content: chatMessage.content,
            target: chatMessage.target,
            status: chatMessage.status,
            to: chatMessage.to.id,
            from: chatMessage.from.id,
            targetId: this.getFriend(chatMessage).id,
            targetName: this.getFriend(chatMessage).name,
            targetThumbnail: this.thumbnail(
              this.getFriend(chatMessage).thumbnail
            ),
          }
        }
        // lấy ra cấc conversation còn lại
        let listConv = storedTargetConversation.filter(
          (current) => !this.compareMessageVsConversation(chatMessage, current)
        )
        // đưa lên top
        listConv.unshift({
          ...targetConv,
          content: chatMessage.content,
        })
        // lưu vào store
        if (chatMessage.target == 'USER') {
          this.$store.dispatch('setUserConversations', listConv)
        } else {
          this.$store.dispatch('setGroupConversations', listConv)
        }
      },
      appendRequests(friend) {
        const storedRequests = this.$store.getters.getRequests
        storedRequests.push(friend)
        this.$store.dispatch('setRequests', storedRequests)
      },
      appendFriends(friend) {
        const storedFriends = this.$store.getters.getFriends
        storedFriends.push(friend)
        this.$store.dispatch('setFriends', storedFriends)
      },
      removeFriends(removeFriend) {
        let newStoredFriends = [...this.$store.getters.getFriends]
        let newStoredRequest = [...this.$store.getters.getRequests]
        newStoredFriends = newStoredFriends.filter((friend) => {
          return !this.compareTwoFriendRecord(friend, removeFriend)
        })
        newStoredRequest = newStoredRequest.filter((friend) => {
          return !this.compareTwoFriendRecord(friend, removeFriend)
        })

        this.$store.dispatch('setFriends', newStoredFriends)
        this.$store.dispatch('setRequests', newStoredRequest)
      },
      getFriend(friend) {
        // check friend
        const userId = this.$auth.user.id
        if (friend.from.id == userId) return friend.to
        return friend.from
      },
      thumbnail(thumbnail) {
        // Nếu có thumbnail kiểm tra là ảnh ngoài backend hay ảnh trong backend
        if (thumbnail) {
          // Nếu là ảnh trong backend, nối apiUrl vào thumbnail
          // Nếu là ảnh ngoài backend, trả về thumbnail
          if (String(thumbnail).startsWith('/')) {
            return this.$config.apiUrl + thumbnail
          } else return thumbnail
        }
        // Nếu không có thumbnail trả về ảnh placeholder
        return '/img/chat/thumbnail-placeholder.jpg'
      },
    },
  })
}
