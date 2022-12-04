<template></template>

<script>
export default {
  data() {
    return {
      isProcessing: false,
      socket: {},
    }
  },
  watch: {
    $auth() {
      this.initSocket()
    },
  },
  mounted() {
    this.debug('Base-page mounted.............................')
    this.initSocket()
  },
  methods: {
    toggleProcessing() {
      this.isProcessing = !this.isProcessing
    },
    setProcessing(newState) {
      this.isProcessing = newState
    },
    initSocket() {
      let storedSocket = this.$store.getters.getSocket
      this.debug('Stored socket', storedSocket)
      if (storedSocket) return

      // create socket
      var me = this
      me.socket = this.$nuxtSocket({
        name: 'main',
        query: {
          bearerToken: me.$auth.strategy.token.get(),
        },
        persist: true, // specifies whether to save this socket in vuex
      })
      this.$store.dispatch('setSocket', me.socket)
      this.debug('Socket created', me.socket)

      // listen events
      this.listenRequestFriendEvent()
      this.listenAcceptFriendEvent()
      this.listenRemoveFriendEvent()

      this.listenAddMemberEvent()
      this.listenRemoveMemberEvent()

      this.listenReceiveMessageEvent()
      this.listenUpdateMessageEvent()
      this.listenTypingStartEvent()
      this.listenTypingEndEvent()

      this.listenExceptionEvent()
      this.listenErrorEvent()
    },
    listenRequestFriendEvent() {
      const me = this
      me.socket.on(me.$socketEvent.friend.requestFriend, (payload) => {
        me.debug('Listen request friend', payload)
        me.appendRequests(payload)
        // notify
        this.$snotify.success(
          me.$socketEvent.friend.requestFriend,
          payload.from.fullName
        )
      })
    },
    listenAcceptFriendEvent() {
      const me = this
      me.socket.on(me.$socketEvent.friend.acceptFriend, (payload) => {
        me.debug('Listen accept friend', payload)
        me.removeFriends(payload)
        me.appendFriends(payload)
        // notify
        this.$snotify.success(
          me.$socketEvent.friend.acceptFriend,
          me.getFriend(payload).fullName
        )
      })
    },
    listenRemoveFriendEvent() {
      const me = this
      me.socket.on(me.$socketEvent.friend.removeFriend, (payload) => {
        me.debug('Listen remove friend', payload)
        me.removeFriends(payload)
        // notify
        this.$snotify.success(
          me.$socketEvent.friend.removeFriend,
          me.getFriend(payload).fullName
        )
      })
    },
    listenAddMemberEvent() {
      const me = this
      me.socket.on(me.$socketEvent.group.addMember, (payload) => {
        me.debug('Listen add member', payload)
        // notify
        // this.$snotify.success(me.$socketEvent.group.addMember, payload?.content)
        if (me.compareMessageVsActiveConversation(payload))
          me.appendChatMessages(payload)
        me.bubbleConversationUp(payload)
      })
    },
    listenRemoveMemberEvent() {
      const me = this
      me.socket.on(me.$socketEvent.group.removeMember, (payload) => {
        me.debug('Listen remove member', payload)
        // notify
        // this.$snotify.success(
        //   me.$socketEvent.group.removeMember,
        //   payload?.content
        // )
        if (me.compareMessageVsActiveConversation(payload))
          me.appendChatMessages(payload)
        me.bubbleConversationUp(payload)
      })
    },
    listenReceiveMessageEvent() {
      const me = this
      me.socket.on(me.$socketEvent.chat.receiveMessages, (payload) => {
        me.debug('Listen message receive', payload)
        this.$store.dispatch('setEvent', me.$socketEvent.chat.receiveMessages)
        // notify
        // this.$snotify.success(me.$socketEvent.chat.receiveMessages)
        if (me.compareMessageVsActiveConversation(payload))
          me.appendChatMessages(payload)
        me.bubbleConversationUp(payload)
      })
    },
    listenUpdateMessageEvent() {
      const me = this
      me.socket.on(me.$socketEvent.chat.updateMessages, (payload) => {
        me.debug('Listen update message', payload)
        // notify
        // this.$snotify.success(me.$socketEvent.chat.updateMessages)
        if (me.compareMessageVsActiveConversation(payload))
          me.updateChatMessages(payload)
        me.bubbleConversationUp(payload)
      })
    },
    listenTypingStartEvent() {
      const me = this
      me.socket.on(me.$socketEvent.chat.typingStart, (payload) => {
        me.debug('Listen typing start', payload)
        this.$store.dispatch('setEvent', me.$socketEvent.chat.typingStart)
        this.$store.dispatch('startTyping', payload)
      })
    },
    listenTypingEndEvent() {
      const me = this
      me.socket.on(me.$socketEvent.chat.typingEnd, (payload) => {
        me.debug('Listen typing end', payload)
        this.$store.dispatch('endTyping', payload)
      })
    },
    listenExceptionEvent() {
      const me = this
      me.socket.on('exception', (payload) => {
        me.debug('Listen exception', payload)
        this.$snotify.error(payload.message)
      })
    },
    listenErrorEvent() {
      const me = this
      me.socket.on(me.$socketEvent.error, (payload) => {
        me.debug('Listen error', payload)
        this.$snotify.error(payload.message)
      })
    },
  },
}
</script>

<style></style>
