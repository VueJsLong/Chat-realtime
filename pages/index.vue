<template></template>

<script>
export default {
  name: 'IndexPage',
  layout: 'bodyOnly',
  // middleware: [
  //   function ({ redirect }) {
  //     redirect('/message')
  //   },
  // ],
  beforeMount() {
    // Nếu người đang đăng nhập là admin thì chuyển sang trang system
    if (this.$auth.user.id == this.$constants.ADMIN_ID) {
      this.$router.push({ path: '/system-chat-box' })
    } else {
      this.$router.push({ path: '/message' })
    }
  },
}
</script>

<style></style>
