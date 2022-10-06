<template>
  <Nuxt />
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
