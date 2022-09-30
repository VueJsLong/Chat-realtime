<template>
  <div>
    <footer>footer</footer>
    <p>{{ $auth.user }}</p>
    <button @click="testAxios">Test Axios</button>
    <p>{{ axiosResponse }}</p>
    <button @click="logout">Logout</button>
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
  },
}
</script>

<style></style>
