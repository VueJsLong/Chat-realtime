<template>
  <div class="toolbar">
    <search-box></search-box>
    <div class="groups">
      <div class="option">
        <p>Groups</p>
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
          class="chat-contact-item"
          v-for="item in groupConversations"
          :key="item.id"
        >
          <img :src="item.targetThumbnail" alt="" />
          <div class="content">
            <div class="friends">{{ item.targetName }}</div>
            <div>{{ item.content }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="recents">
      <div class="option">
        <p>Recents</p>
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
          class="chat-contact-item"
          v-for="item in userConversations"
          :key="item.id"
        >
          <img :src="item.targetThumbnail" alt="" />
          <div class="content">
            <div class="friends">{{ item.targetName }}</div>
            <div>{{ item.content }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BasePage from '~/components/BasePage.vue'
import Header from '~/components/Header.vue'
import Message from '~/components/Message.vue'
export default {
  name: 'MessagePage',
  components: { Header, Message },
  layout: 'default',
  extends: BasePage,
  data() {
    return {
      userConversations: [],
      groupConversations: [],
      currentPage: 1,
    }
  },
  created() {},
  mounted() {
    this.debug('Message-page mounted.............................')
    this.getUserConversations()
    this.getGroupConversations()
  },
  methods: {
    async getUserConversations(page = 1, size = 10) {
      this.currentPage = page
      const params = {
        page: page,
        size: size,
        target: 'USER',
      }
      this.$axios
        .get(this.$api.conversation, { params })
        .then((res) => {
          this.userConversations = res.data.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async getGroupConversations(page = 1, size = 10) {
      this.currentPage = page
      const params = {
        page: page,
        size: size,
        target: 'GROUP',
      }
      this.$axios
        .get(this.$api.conversation, { params })
        .then((res) => {
          this.groupConversations = res.data.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>

<style></style>
