<template></template>

<script>
export default {
  data() {
    return {
      isProcessing: false,
      socket: {},
    }
  },
  mounted() {
    this.debug('Base-page mounted.............................')
    let storedSocket = this.$store.getters.getSocket
    if (storedSocket) return

    // create socket
    var me = this
    me.socket = this.$nuxtSocket({
      name: 'main',
      query: {
        bearerToken: me.$auth.strategy.token.get(),
      },
    })
    this.$store.dispatch('setSocket', me.socket)
    this.debug('Socket created', me.socket)
    this.listenFriendRequestEvent()
  },
  methods: {
    toggleProcessing() {
      this.isProcessing = !this.isProcessing
    },
    setProcessing(newState) {
      this.isProcessing = newState
    },
    listenFriendRequestEvent() {
      const me = this
      me.socket.on(me.$socketEvent.friend.requestFriend, (payload) => {
        me.debug('Listen request friend', payload)
        this.$snotify.success(me.$socketEvent.friend.requestFriend)
      })
    },
  },
}
</script>

<style></style>
