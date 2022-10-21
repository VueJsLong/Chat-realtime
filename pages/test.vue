<template>
  <div>
    <div>
      <b-button variant="outline-danger" @click="refresh">Refresh</b-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    refresh() {
      this.log('Auth', this.$auth)
      this.log('Auth user', this.$auth.user)
      this.$auth.refreshTokens()
    },
  },
}
</script>

<style></style>
