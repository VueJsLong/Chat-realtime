<template>
  <div id="error-page">
    <div class="error-container">
      <h1>Có lỗi xảy ra</h1>
      <h2 v-if="error.statusCode">Mã lỗi {{ error.statusCode }}</h2>
      <hr class="w-100" />
      <NuxtLink to="/">Quay về trang chủ</NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'error',
}
</script>

<style scoped>
#error-page {
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  width: 100vw;
  height: 100vh;

  background-color: #fff;
  z-index: 1000;
}

.error-container {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
}
</style>
