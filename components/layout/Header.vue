<template>
  <div class="header">
    <div class="option">
      <div class="option-click">
        <button class="option-btn --button-reset">
          <img
            :src="thumbnail($auth.user?.thumbnail)"
            alt=""
            class="thumbnail"
            :title="fullName"
            referrerpolicy="no-referrer"
          />
        </button>
        <ul class="menu">
          <li v-b-modal.update-profile><a href="#">Hồ sơ cá nhân</a></li>
          <li v-b-modal.change-password><a href="#">Đổi mật khẩu</a></li>
        </ul>
        <update-profile></update-profile>
        <change-password></change-password>
      </div>
    </div>
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
          <nuxt-link to="/setting" tag="li" class="nav-item" v-if="false">
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
import UpdateProfile from '../popup/UpdateProfile.vue'
import ChangePassword from '../popup/ChangePassword.vue'
export default {
  name: 'Header',
  components: { UpdateProfile, ChangePassword },
  computed: {
    fullName() {
      return this.$auth.user.fullName ? this.$auth.user.fullName : 'profile'
    },
  },
  methods: {
    async logout() {
      this.$store.dispatch('resetStore')
      await this.$auth.logout('local')
      let storedSocket = this.$store.getters.getSocket
      if (storedSocket) storedSocket.disconnect()
    },
    setConversation() {
      const payload = {
        targetId: this.$auth.user.id,
        targetName: 'Cloud',
        targetThumbnail: this.$config.baseUrl + '/img/chat/cloud.jpg',
        target: 'USER',
      }
      this.$store.dispatch('setConversation', payload)
    },
    modalProfile() {
      this.$refs.profile.show()
    },
  },
}
</script>

<style></style>
