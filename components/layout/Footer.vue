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
      const p = this.$axios
        .get('/error')
        .then((res) => (this.axiosResponse = res.data))
      this.axiosLoadError(p)
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
