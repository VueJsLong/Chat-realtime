<template>
  <div v-if="isLoading" class="loading-page">
    <div class="img-loading">
      <img src="/favicon.png" width="70" />
    </div>
    <div class="loading"></div>
  </div>
</template>
<script>
export default {
  data: () => ({
    isLoading: false,
  }),
  watch: {
    '$store.state.isLoading'(value, oldValue) {
      this.isLoading = value
    },
  },
  created() {
    //this.loading = this.$store.state.loading
  },
}
</script>
<style scoped>
.loading-page {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1000;
  padding: 1rem;
  text-align: center;
  font-family: sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  width: 100%;
  height: 100%;
}
.img-loading {
  position: absolute;
  /* filter: brightness(0) invert(1); */
  overflow: hidden;
  /* border-radius: 50%; */
}
.loading {
  display: inline-block;
  width: 8rem;
  height: 8rem;
  border: 8px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
}
@keyframes spin {
  to {
    -webkit-transform: rotate(360deg);
  }
}
</style>
