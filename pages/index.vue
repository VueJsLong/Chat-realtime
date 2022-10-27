<template></template>

<script>
export default {
  name: 'Index page',
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
