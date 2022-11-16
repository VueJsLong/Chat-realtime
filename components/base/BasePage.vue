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
      this.listenReceiveMessageEvent()
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
    listenReceiveMessageEvent() {
      const me = this
      me.socket.on(me.$socketEvent.chat.receiveMessages, (payload) => {
        me.debug('Listen message receive', payload)
        // notify
        // this.$snotify.success(me.$socketEvent.chat.receiveMessages)
        me.appendChatMessages(payload)
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
