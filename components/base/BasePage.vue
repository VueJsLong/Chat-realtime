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
      this.listenFriendRequestEvent()
      this.listenMessageReceiveEvent()
      this.listenExceptionEvent()
      this.listenErrorEvent()
    },
    listenFriendRequestEvent() {
      const me = this
      me.socket.on(me.$socketEvent.friend.requestFriend, (payload) => {
        me.debug('Listen request friend', payload)
        me.appendFriends(payload)
        this.$snotify.success(me.$socketEvent.friend.requestFriend)
      })
    },
    listenMessageReceiveEvent() {
      const me = this
      me.socket.on(me.$socketEvent.chat.receiveMessages, (payload) => {
        me.debug('Listen message receive', payload)
        // this.$snotify.success(me.$socketEvent.chat.receiveMessages)
        me.appendChatMessages(payload)
      })
    },
    listenExceptionEvent() {
      const me = this
      me.socket.on('exceptions', (payload) => {
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
