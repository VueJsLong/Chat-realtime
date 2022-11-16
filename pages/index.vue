<template></template>

<script>
export default {
  name: 'IndexPage',
  layout: 'bodyOnly',
  middleware: [
    function ({ redirect }) {
      redirect('/message')
    },
  ],
  mounted() {},
}
</script>

<style></style>
