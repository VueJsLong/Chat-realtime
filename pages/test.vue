<template>
  <div>
    <div>
      <b-button variant="outline-primary" @click="refresh"
        >Refresh and see console log</b-button
      >
    </div>
    <div class="row">
      <div class="col-6 border">
        A
        <div v-for="(msg, index) in AMsg" :key="index">{{ msg }}</div>
      </div>
      <div class="col-6 border">
        B
        <div>
          <input
            class="border"
            type="text"
            placeholder="Nhập tin nhắn"
            v-model="BMsg"
          />
          <b-button variant="outline-primary" @click="sendMsg"
            >Gửi tin nhắn đến server, server tự gửi đến A</b-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'bodyOnly',
  mounted() {
    // connect socket
    var me = this
    me.socket = this.$nuxtSocket({
      name: 'main',
    })

    // listen event
    me.socket.on('receiveMessage', function (data) {
      me.AMsg.push(data.content)
      me.log('receiveMessage', data)
    })
  },
  data() {
    return {
      AMsg: [],
      BMsg: 'Hello A!',
    }
  },
  methods: {
    refresh() {
      this.log('Auth', this.$auth)
      this.log('Auth user', this.$auth.user)
      this.$auth.refreshTokens()
    },
    sendMsg() {
      var me = this
      // emit event
      me.log('sendMessage', this.BMsg)
      me.socket.emit('sendMessage', { content: this.BMsg })
    },
  },
}
</script>

<style></style>
