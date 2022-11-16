<template>
  <div class="header">
    <img
      :src="thumbnail($auth.user.thumbnail)"
      alt=""
      class="thumbnail"
      :title="fullName"
      referrerpolicy="no-referrer"
    />
    <nav class="header-nav">
      <ul>
        <div>
          <nuxt-link to="/message" tag="li" class="nav-item" v-if="!isAdmin">
            <i class="fi fi-rr-comment"></i>
            <span class="nav-item__tooltip">Tin nhắn</span>
          </nuxt-link>
          <nuxt-link to="/contact" tag="li" class="nav-item" v-if="!isAdmin">
            <i class="fi fi-rr-users"></i>
            <span class="nav-item__tooltip">Bạn bè</span>
          </nuxt-link>
          <nuxt-link
            to="/system-chat-box"
            tag="li"
            class="nav-item"
            v-if="isAdmin"
          >
            <i class="fi fi-rr-envelope"></i>
            <span class="nav-item__tooltip">Hòm thư hệ thống</span>
          </nuxt-link>
        </div>
        <div>
          <li class="nav-item" @click="setConversation">
            <i class="fi fi-rr-cloud-upload-alt"></i>
            <span class="nav-item__tooltip">Cloud</span>
          </li>
          <nuxt-link to="/setting" tag="li" class="nav-item">
            <i class="fi fi-rr-settings"></i>
            <span class="nav-item__tooltip">Cài đặt</span>
          </nuxt-link>
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
  name: 'Header',
  computed: {
    fullName() {
      return this.$auth.user.fullName ? this.$auth.user.fullName : 'profile'
    },
  },
  methods: {
    async logout() {
      this.$store.dispatch('resetStore')
      await this.$auth.logout('local')
    },
    setConversation() {
      const payload = {
        targetId: this.$auth.user.id,
        targetName: 'Cloud',
        targetThumbnail: '/img/chat/cloud.jpg',
        target: 'USER',
      }
      this.$store.dispatch('setConversation', payload)
    },
  },
}
</script>

<style></style>
