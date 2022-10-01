<template>
  <div>
    <footer>footer</footer>
    <p>{{ $auth.user }}</p>
    <button @click="testAxios">Test Axios</button>
    <p>{{ axiosResponse }}</p>
    <button @click="logout">Logout</button>
    <button @click="toggleLoading">Toggle Loading</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      axiosResponse: '',
    }
  },
  methods: {
    testAxios() {
      this.$axios.get('/').then((res) => (this.axiosResponse = res.data))
    },
    async logout() {
      await this.$auth.logout('local')
    },
    toggleLoading() {
      let currentLoadingState = this.$store.getters.getLoading
      this.$store.dispatch('setLoading', !currentLoadingState)
    },
  },
}
</script>

<style></style>
