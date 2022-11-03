<template>
  <div class="toolbar">
    <search-box></search-box>
    <div class="groups">
      <div class="option">
        <p>Groups</p>
        <ul>
          <li>
            <div class="option-click">
              <button class="option-btn --button-reset">
                <i class="fi fi-rs-menu-dots-vertical"></i>
              </button>
              <ul class="menu">
                <li><a href="/">Tạo nhóm</a></li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div class="group-contacts ctm-scroll-y">
        <div
          class="item"
          v-for="item in groupConversations"
          :key="item.id"
          @click="setConversation(item)"
        >
          <img
            :src="item.targetThumbnail"
            alt=""
            referrerpolicy="no-referrer"
          />
          <div class="content">
            <div class="friends">{{ item.targetName }}</div>
            <div class="preview-message --text-ellipsis">
              {{ item.content }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="recents">
      <div class="option">
        <p>Recents</p>
        <!-- <ul>
          <li class="option-click">
            <img src="/img/option.png" alt="" />
            <ul class="menu">
              <li><a href="/">Cài đặt</a></li>
              <li><a href="/">Tùy chọn</a></li>
              <li><a href="/">Xóa</a></li>
            </ul>
          </li>
        </ul> -->
      </div>
      <div class="recent-contacts ctm-scroll-y">
        <div
          class="item"
          v-for="item in userConversations"
          :key="item.id"
          @click="setConversation(item)"
        >
          <img
            :src="item.targetThumbnail"
            alt=""
            referrerpolicy="no-referrer"
          />
          <div class="content">
            <div class="friends">{{ item.targetName }}</div>
            <div class="preview-message --text-ellipsis">
              {{ item.content }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BasePage from '~/components/base/BasePage.vue'
export default {
  name: 'MessagePage',
  components: {},
  layout: 'default',
  extends: BasePage,
  data() {
    return {
      userConversations: [],
      groupConversations: [],
      currentPage: 1,
    }
  },
  watch: {
    '$store.state.userConversations'() {
      this.userConversations = this.$store.getters.getUserConversations
    },
    '$store.state.groupConversations'() {
      this.groupConversations = this.$store.getters.getGroupConversations
    },
  },
  created() {},
  mounted() {
    this.debug('Message-page mounted.............................')
    this.getUserConversations()
    this.getGroupConversations()
  },
  methods: {
    async getUserConversations(page = 1, size = 20) {
      this.currentPage = page
      const params = {
        target: 'USER',
        page: page,
        size: size,
      }
      this.$axios
        .get(this.$api.conversation, { params })
        .then((res) => {
          this.$store.dispatch('setUserConversations', res.data.data)
        })
        .catch((err) => {
          this.log(err)
        })
    },
    async getGroupConversations(page = 1, size = 20) {
      this.currentPage = page
      const params = {
        target: 'GROUP',
        page: page,
        size: size,
      }
      this.$axios
        .get(this.$api.conversation, { params })
        .then((res) => {
          this.$store.dispatch('setGroupConversations', res.data.data)
        })
        .catch((err) => {
          this.log(err)
        })
    },
    setConversation(conversation) {
      const { targetId, targetName, targetThumbnail, target } = conversation
      this.$store.dispatch('setConversation', {
        targetId,
        targetName,
        targetThumbnail,
        target,
      })
    },
  },
}
</script>

<style></style>
