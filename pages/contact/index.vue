<template>
  <div class="toolbar">
    <search-box></search-box>
    <div class="groups">
      <div class="option">
        <p>Request</p>
        <ul>
          <li class="option-click">
            <!-- <div>
              <img src="/img/option.png" alt="" />
              <ul class="menu">
                <li><a href="/">Cài đặt</a></li>
                <li><a href="/">Tùy chọn</a></li>
                <li><a href="/">Xóa</a></li>
              </ul>
            </div> -->
          </li>
        </ul>
      </div>
      <div class="group-contacts scroll-y">
        <div
          class="friend-item search-data"
          v-for="friend in requests"
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
              class="m-icon-btn --primary"
              @click.stop="acceptFriend"
              title="accept"
            >
              <i class="btn-icon fi fi-rr-user-add"></i>
            </button>
            <button
              type="button"
              class="m-icon-btn --danger"
              @click.stop="removeRequest"
              title="remove"
            >
              <i class="fi fi-rr-remove-user btn-icon"></i>
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
            <!-- <img src="/img/option.png" alt="" />
            <ul class="menu">
              <li><a href="/">Cài đặt</a></li>
              <li><a href="/">Tùy chọn</a></li>
              <li><a href="/">Xóa</a></li>
            </ul> -->
          </li>
        </ul>
      </div>
      <div class="recent-contacts scroll-y">
        <div
          class="friend-item search-data"
          v-for="friend in friends"
          :key="friend.id"
          @click="setConversation(friend.friend)"
        >
          <div class="search-user__thumbnail">
            <img
              :src="friend.friend.thumbnail"
              alt=""
              referrerpolicy="no-referrer"
            />
          </div>
          <div class="search-user__fullName">{{ friend.friend.fullName }}</div>
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
      requests: [],
      friends: [],
    }
  },
  computed: {},
  watch: {
    '$store.state.requests'() {
      this.requests = this.$store.getters.getRequests
    },
    '$store.state.friends'() {
      this.friends = this.$store.getters.getFriends
    },
  },
  mounted() {
    this.debug('Contact-page mounted.............................')
    this.getRequests()
    this.getFriends()
  },
  methods: {
    async getRequests() {
      const params = {}
      this.$axios
        .get(this.$api.getRequests, { params })
        .then((res) => {
          this.$store.dispatch('setRequests', res.data.data)
        })
        .catch((err) => {
          this.log(err)
        })
    },
    async getFriends() {
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
      // return this.friends.filter((friend) => {
      //   return friend.from.id != this.$auth.user.id
      // })
    },
    getAcceptedFriend() {
      // return this.friends.filter((friend) => {
      //   return friend.from.id == this.$auth.user.id
      // })
    },
    acceptFriend() {},
    removeRequest() {},
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
