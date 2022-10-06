<template>
  <div>
    <Header></Header>
    <Nuxt />
    <Footer></Footer>
  </div>
</template>

<script>
export default {
  watch: {
    '$i18n.locale'() {
      this.locale = this.$i18n.locale
    },
  },
  mounted() {
    this.locale = this.$i18n.locale
  },
}
</script>

<style></style>
