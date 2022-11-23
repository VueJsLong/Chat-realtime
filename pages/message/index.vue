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
                <li v-b-modal.create-group><a href="#">Tạo nhóm</a></li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div class="group-contacts scroll-y">
        <div
          class="item"
          :class="{ active: isActiveConversation(item.targetId, 'GROUP') }"
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
            <div class="friends --text-ellipsis">{{ item.targetName }}</div>
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
      </div>
      <div class="recent-contacts scroll-y">
        <div
          class="item"
          :class="{ active: isActiveConversation(item.targetId, 'USER') }"
          v-for="item in userConversations"
          :key="item.id"
          @click="setConversation(checkCloud(item))"
        >
          <div
            class="m-thumbnail"
            :class="{
              active: isActivating(isConversationActivating(item)?.status),
            }"
          >
            <img
              :src="checkCloud(item).targetThumbnail"
              alt=""
              referrerpolicy="no-referrer"
            />
          </div>
          <div class="content">
            <div class="friends --text-ellipsis">
              {{ checkCloud(item).targetName }}
            </div>
            <div class="preview-message --text-ellipsis">
              {{ checkCloud(item).content }}
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
      conversation: null,
    }
  },
  watch: {
    '$store.state.conversation'() {
      this.conversation = this.$store.getters.getConversation
    },
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
      const payload = {
        targetId,
        targetName,
        targetThumbnail,
        target,
        leaderId: conversation?.leaderId,
      }
      this.conversation = payload
      this.$store.dispatch('setConversation', payload)
    },
    isActiveConversation(id, target) {
      if (!this.conversation) return false
      return (
        this.conversation.target == target && this.conversation.targetId == id
      )
    },
    checkCloud(conversation) {
      // check cloud
      const userId = this.$auth.user.id
      if (conversation.targetId == userId) {
        return {
          ...conversation,
          targetName: 'Cloud',
          targetThumbnail: '/img/chat/cloud.jpg',
        }
      }
      return {
        ...conversation,
        targetThumbnail: this.thumbnail(conversation.targetThumbnail),
      }
    },
  },
}
</script>

<style></style>
