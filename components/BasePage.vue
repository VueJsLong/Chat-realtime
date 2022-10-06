<template></template>

<script>
export default {
  data() {
    return {
      socket: {},
    }
  },
  mounted() {
    this.$store.dispatch('setLoading', true)
    setTimeout(() => {
      this.$store.dispatch('setLoading', false)
    }, 500)
  },
}
</script>

<style></style>
