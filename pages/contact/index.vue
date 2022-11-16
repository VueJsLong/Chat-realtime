<template>
  <div class="toolbar">
    <search-box></search-box>
    <div class="groups">
      <div class="group-contacts scroll-y">
        <div class="scroll-y">
          <div class="accordion" role="tablist">
            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <p block v-b-toggle.accordion-1 variant="info">
                  My pending request ({{ myRequest.length }})
                </p>
              </b-card-header>
              <b-collapse
                id="accordion-1"
                accordion="my-accordion"
                role="tabpanel"
              >
                <div
                  class="friend-item search-data"
                  v-for="friend in myRequest"
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
                  <div class="search-user__fullName --text-ellipsis-2">
                    {{ friend.to.fullName }}
                  </div>
                  <div class="search-user__addFriendBtn">
                    <button
                      type="button"
                      class="m-icon-btn --danger"
                      @click.stop="removeFriend(friend.to.id)"
                      title="remove"
                    >
                      <i class="fi fi-rr-remove-user btn-icon"></i>
                    </button>
                  </div>
                </div>
              </b-collapse>
            </b-card>

            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="p-1" role="tab">
                <p block v-b-toggle.accordion-2 variant="info">
                  Request friend ({{ peopleRequest.length }})
                </p>
              </b-card-header>
              <b-collapse
                id="accordion-2"
                accordion="my-accordion"
                visible
                role="tabpanel"
              >
              </b-collapse>
              <div
                class="friend-item search-data"
                v-for="friend in peopleRequest"
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
                <div class="search-user__fullName --text-ellipsis-2">
                  {{ friend.from.fullName }}
                </div>
                <div class="search-user__addFriendBtn">
                  <button
                    type="button"
                    class="m-icon-btn --primary"
                    @click.stop="acceptFriend(friend.from.id)"
                    title="accept"
                  >
                    <i class="btn-icon fi fi-rr-user-add"></i>
                  </button>
                  <button
                    type="button"
                    class="m-icon-btn --danger"
                    @click.stop="removeFriend(friend.from.id)"
                    title="remove"
                  >
                    <i class="fi fi-rr-remove-user btn-icon"></i>
                  </button>
                </div>
              </div>
            </b-card>
          </div>
        </div>
      </div>
    </div>
    <div class="recents">
      <div class="option">
        <p>My friend</p>
      </div>
      <div class="recent-contacts scroll-y">
        <div
          class="friend-item search-data"
          v-for="friend in friends"
          :key="friend.id"
          @click="setConversation(getFriend(friend))"
        >
          <div class="search-user__thumbnail">
            <img
              :src="getFriend(friend).thumbnail"
              alt=""
              referrerpolicy="no-referrer"
            />
          </div>
          <div class="search-user__fullName">
            {{ getFriend(friend).fullName }}
          </div>
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
  computed: {
    myRequest() {
      let currentUserId = this.$auth.user.id
      return this.requests.filter((friend) => friend.from.id == currentUserId)
    },
    peopleRequest() {
      let currentUserId = this.$auth.user.id
      return this.requests.filter((friend) => friend.to.id == currentUserId)
    },
  },
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
          this.debug(err)
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
          this.debug(err)
        })
    },
    acceptFriend(fromId) {
      const me = this
      const socket = me.$store.getters.getSocket

      // emit event
      const payload = {
        from: me.$auth.user.id,
        to: fromId,
      }
      socket.emit(me.$socketEvent.friend.acceptFriend, payload, (res) => {
        me.debug(res)
        me.removeFriends(res)
        me.appendFriends(res)
        this.$snotify.success(me.$socketEvent.friend.acceptFriend)
      })
    },
    removeFriend(fromId) {
      const me = this
      const socket = me.$store.getters.getSocket

      // emit event
      const payload = {
        from: me.$auth.user.id,
        to: fromId,
      }
      socket.emit(me.$socketEvent.friend.removeFriend, payload, (res) => {
        // me.debug(res)
        me.removeFriends(res)
        this.$snotify.success(me.$socketEvent.friend.removeFriend)
      })
    },
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
