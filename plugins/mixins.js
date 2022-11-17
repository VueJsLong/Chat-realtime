import Vue from 'vue'
import { ADMIN_ID } from './constants'

// Make sure to pick a unique name for the flag
// so it won't conflict with any other mixin.
if (!Vue.__my_mixin__) {
  Vue.__my_mixin__ = true

  Vue.mixin({
    computed: {
      isAdmin() {
        return this.$auth.user.id == ADMIN_ID
      },
    },
    methods: {
      axiosLoadError(p, callback = () => {}) {
        p.catch((error) => {
          if (error.response) {
            alert(error.response.data?.messages)
          } else if (error.request) {
            alert(error.request)
          } else {
            alert(error.message)
          }
          callback()
        })
      },
      // console
      log(...args) {
        if (process.env.environment == 'DEVELOPMENT') console.log(...args)
      },
      warn(...args) {
        if (process.env.environment == 'DEVELOPMENT') console.log(...args)
      },
      error(...args) {
        if (process.env.environment == 'DEVELOPMENT') console.error(...args)
      },
      debug(...args) {
        if (process.env.environment == 'DEVELOPMENT') console.debug(...args)
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
        if (
          message?.from?.id == conversation?.from &&
          message?.to == conversation?.to
        )
          return true
        else if (
          message?.from?.id == conversation?.to &&
          message?.to == conversation?.from
        )
          return true
        return false
      },
      compareMessageVsActiveConversation(chatMessage) {
        // check is conversation active
        const storedConversation = this.$store.getters.getConversation
        if (
          chatMessage.target == storedConversation.target &&
          chatMessage.from.id == storedConversation.targetId
        )
          return true
        return false
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
        if (!targetConv) {
          targetConv = {
            content: chatMessage.content,
            target: chatMessage.target,
            status: chatMessage.status,
            to: chatMessage.to,
            from: chatMessage.from.id,
            referTo: null,
            referToContent: null,
            targetId: chatMessage.from.id,
            targetName: chatMessage.from.fullName,
            targetThumbnail: chatMessage.thumbnail,
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
        return thumbnail ? thumbnail : '/img/chat/thumbnail-placeholder.jpg'
      },
    },
  })
}
