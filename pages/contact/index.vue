<template>
  <div class="toolbar">
    <search-box></search-box>
    <div class="groups">
      <div class="option">
        <p>Request</p>
        <ul>
          <li class="option-click">
            <div>
              <img src="/img/option.png" alt="" />
              <ul class="menu">
                <li><a href="/">Cài đặt</a></li>
                <li><a href="/">Tùy chọn</a></li>
                <li><a href="/">Xóa</a></li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div class="group-contacts ctm-scroll-y">
        <div
          class="friend-item search-data"
          v-for="friend in getRequestFriend()"
          :key="friend.id"
          @click="setConversation(friend.from)"
        >
          <div class="search-user__thumbnail">
            <img
              :src="friend.from.thumbnail"
              alt=""
              referrerpolicy="no-referrer"
            />
          </div>
          <div class="search-user__fullName">{{ friend.from.fullName }}</div>
          <div class="search-user__addFriendBtn">
            <button
              type="button"
              class="m-btn m-btn-sm m-btn-with-icon primary-btn"
              @click.stop="acceptFriend"
            >
              <i class="btn-icon fi fi-rr-user-add"></i>
              Đồng ý
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="recents">
      <div class="option">
        <p>My friend</p>
        <ul>
          <li class="option-click">
            <img src="/img/option.png" alt="" />
            <ul class="menu">
              <li><a href="/">Cài đặt</a></li>
              <li><a href="/">Tùy chọn</a></li>
              <li><a href="/">Xóa</a></li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="recent-contacts ctm-scroll-y">
        <div
          class="friend-item search-data"
          v-for="friend in getAcceptedFriend()"
          :key="friend.id"
          @click="setConversation(friend.to)"
        >
          <div class="search-user__thumbnail">
            <img
              :src="friend.to.thumbnail"
              alt=""
              referrerpolicy="no-referrer"
            />
          </div>
          <div class="search-user__fullName">{{ friend.to.fullName }}</div>
          <div class="search-user__addFriendBtn"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BasePage from '~/components/base/BasePage.vue'

export default {
  name: 'ContactPage',
  extends: BasePage,
  layout: 'default',
  data() {
    return {
      friends: [],
    }
  },
  computed: {},
  watch: {
    '$store.state.friends'() {
      this.friends = this.$store.getters.getFriends
    },
  },
  mounted() {
    this.debug('Contact-page mounted.............................')
    this.getFriends()
  },
  methods: {
    async getFriends(page = 1, size = 20) {
      this.currentPage = page
      const params = {}
      this.$axios
        .get(this.$api.getFriends, { params })
        .then((res) => {
          this.$store.dispatch('setFriends', res.data.data)
        })
        .catch((err) => {
          this.log(err)
        })
    },
    getRequestFriend() {
      return this.friends.filter((friend) => {
        return friend.from.id != this.$auth.user.id
      })
    },
    getAcceptedFriend() {
      return this.friends.filter((friend) => {
        return friend.from.id == this.$auth.user.id
      })
    },
    acceptFriend() {},
    setConversation(friend) {
      this.$store.dispatch('setConversation', {
        targetId: friend.id,
        targetName: friend.fullName,
        targetThumbnail: friend.thumbnail,
        target: 'USER',
      })
    },
  },
}
</script>

<style></style>
