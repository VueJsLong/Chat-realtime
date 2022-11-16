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
        console.log(...args)
      },
      warn(...args) {
        console.log(...args)
      },
      error(...args) {
        console.error(...args)
      },
      debug(...args) {
        console.debug(...args)
      },
      goBack() {
        if (window) {
          window.history.back()
        }
      },
      // append
      appendChatMessages(chatMessage) {
        const storedChatMessages = this.$store.getters.getChatMessages
        storedChatMessages.push(chatMessage)
        this.$store.dispatch('setChatMessages', storedChatMessages)
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
