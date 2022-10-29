<template>
  <div class="header">
    <div class="option">
      <ul class="option-thumbnail">
        <li class="option-click">
          <img :src="thumbnail" alt="" class="thumbnail" :title="fullName" />
          <ul class="menu">
            <li><a href="#" @click="modalProfile">Hồ sơ của bạn</a></li>
            <li><a href="/">Cài đặt</a></li>
            <li><a href="/">Đăng xuất</a></li>
          </ul>
        </li>
      </ul>
      <Profile ref="profile" />
    </div>
    <nav class="header-nav">
      <ul>
        <div>
          <nuxt-link to="/message" tag="li" class="nav-item">
            <i class="fi fi-rr-comment"></i>
            <span class="nav-item__tooltip">Tin nhắn</span>
          </nuxt-link>
          <nuxt-link to="/contact" tag="li" class="nav-item">
            <i class="fi fi-rr-users"></i>
            <span class="nav-item__tooltip">Bạn bè</span>
          </nuxt-link>
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
import Profile from './Profile'
export default {
  name: 'Header',
  components: { Profile },
  computed: {
    thumbnail() {
      return this.$auth.user.thumbnail
        ? this.$auth.user.thumbnail
        : '/img/thumbnail-placeholder.png'
    },
    fullName() {
      return this.$auth.user.fullName ? this.$auth.user.fullName : 'profile'
    },
  },
  methods: {
    async logout() {
      await this.$auth.logout('local')
    },
    modalProfile() {
      this.$refs.profile.show()
    },
  },
}
</script>

<style>
.modal.fade .modal-dialog {
  -webkit-animation-name: zoom;
  -webkit-animation-duration: 0.5s;
  animation-name: zoom;
  animation-duration: 0.5s;
}

@-webkit-keyframes zoom {
  from {
    -webkit-transform: scale(0);
  }

  to {
    -webkit-transform: scale(1);
  }
}

@keyframes zoom {
  from {
    transform: scale(0);
  }

  to {
    transform: scale(1);
  }
}
</style>
