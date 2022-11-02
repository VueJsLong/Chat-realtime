<template></template>

<script>
export default {
  name: 'IndexPage',
  layout: 'BodyOnly',
  middleware: [
    function ({ redirect }) {
      redirect('/message')
    },
  ],
  mounted() {},
}
</script>

<style></style>
