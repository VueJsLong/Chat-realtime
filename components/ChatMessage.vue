<template>
  <div
    class="chat-content__message"
    :class="{ host: isHost, guest: !isHost, '--same-source': isSameSource }"
  >
    <img
      class="chat-message__thumbnail m-thumbnail"
      :src="data.from.thumbnail"
      alt=""
      referrerpolicy="no-referrer"
    />
    <span class="chat-message__content"
      ><span :title="getCreateTime">
        {{ data.content }}
      </span>
      <div class="chat-message__context-menu">
        <div class="chat-context-menu__item">
          <button class="m-icon-btn">
            <i class="fi fi-rr-undo"></i>
          </button>
          <span class="context-menu-item__tooltip">Trả lời</span>
        </div>
        <div class="chat-context-menu__item">
          <button class="m-icon-btn">
            <i class="fi fi-rs-inbox-out"></i>
          </button>
          <span class="context-menu-item__tooltip">Chuyển tiếp</span>
        </div>
        <div class="chat-context-menu__item">
          <button class="m-icon-btn">
            <i class="fi fi-rr-menu-dots-vertical"></i>
          </button>
          <span class="context-menu-item__tooltip">Xem thêm</span>
          <div class="chat-context-menu__child-item">
            <div class="chat-context-menu__item">
              <button class="m-icon-btn">
                <i class="fi fi-rr-world"></i>
              </button>
              <span class="context-menu-item__tooltip">Dịch</span>
            </div>
            <div class="chat-context-menu__item recall_btn">
              <button class="m-icon-btn">
                <i class="fi fi-rr-trash"></i>
              </button>
              <span class="context-menu-item__tooltip">Thu hồi</span>
            </div>
          </div>
        </div>
      </div>
    </span>
  </div>
</template>

<script>
export default {
  name: 'ChatMessage',
  props: {
    data: {
      type: Object,
      required: true,
      default() {
        return {
          from: {
            id: null,
            fullName: null,
            thumbnail: null,
          },
          to: null,
          content: null,
          target: null,
          id: null,
          referTo: null,
          createdAt: null,
        }
      },
    },
    isSameSource: {
      type: Boolean,
      required: false,
      default() {
        return false
      },
    },
  },
  data() {
    return {}
  },
  computed: {
    isHost() {
      let currentUser = this.$auth.user
      if (this.data.target == 'GROUP') {
        return this.data.from.id == currentUser.id
      } else {
        return this.data.from.id == currentUser.id
      }
    },
    getCreateTime() {
      let createdTime = new Date(this.data.createdAt)
      return createdTime.toLocaleTimeString()
    },
  },
  methods: {},
}
</script>

<style></style>
