<template>
  <div class="header">
    <img src="/img/Ellipse 1.png" alt="" class="thumnail" />
    <nav class="header-nav">
      <ul>
        <div>
          <li class="nav-item active">
            <i class="fi fi-rr-comment"></i>
            <span class="nav-item__tooltip">Tin nhắn</span>
          </li>
          <li class="nav-item">
            <i class="fi fi-rr-users"></i>
            <span class="nav-item__tooltip">Bạn bè</span>
          </li>
        </div>
        <div>
          <li class="nav-item">
            <i class="fi fi-rr-settings"></i>
            <span class="nav-item__tooltip">Cài đặt</span>
          </li>
          <li class="nav-item" @click="logout">
            <i class="fi fi-rr-sign-out-alt"></i>
            <span class="nav-item__tooltip">Đăng xuất</span>
          </li>
        </div>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    async logout() {
      await this.$auth.logout('local')
    },
  },
}
</script>

<style></style>
