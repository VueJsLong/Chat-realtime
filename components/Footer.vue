<template>
  <div>
    <footer>footer</footer>
    <button @click="testAxios">Test Axios</button>
    <p>{{ axiosResponse }}</p>
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
  },
}
</script>

<style></style>
