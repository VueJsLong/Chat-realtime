<template>
  <div class="message-container" :class="{ '--same-source': isSameSource }">
    <p class="time-milestone" v-if="isTimeMilestone">{{ getCreateTime }}</p>
    <div
      class="message"
      :class="{
        host: isHost,
        guest: !isHost,

        info: isInfo,
      }"
    >
      <img
        class="chat-message__thumbnail m-thumbnail"
        :src="thumbnail(data.from?.thumbnail)"
        alt=""
        referrerpolicy="no-referrer"
        :title="getCreateTime"
      />
      <span class="chat-message__content">
        <div class="content-container" :title="getCreateTime">
          <p class="refer-to-message" v-if="data.referTo">
            {{ data?.referTo?.content }}
          </p>
          <p class="main-message">
            {{ data.content }}
          </p>
        </div>
        <div class="chat-message__context-menu">
          <div class="chat-context-menu__item">
            <button class="m-icon-btn" @click="handleReferTo">
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
              <!-- <div class="chat-context-menu__item">
              <button class="m-icon-btn">
                <i class="fi fi-rr-world"></i>
              </button>
              <span class="context-menu-item__tooltip">Dịch</span>
            </div> -->
              <div class="chat-context-menu__item recall_btn">
                <button class="m-icon-btn" @click="handleRecall">
                  <i class="fi fi-rr-trash"></i>
                </button>
                <span class="context-menu-item__tooltip">Thu hồi</span>
              </div>
            </div>
          </div>
        </div>
      </span>
    </div>
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
    isTimeMilestone: {
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
    isInfo() {
      return this.data.type == this.$constants.messagesType.info
    },
    getCreateTime() {
      let now = this.$moment()
      let messageDate = this.$moment(this.data.createdAt)

      // Nếu không cùng ngày
      if (now.date() - messageDate.date() != 0) {
        return this.$moment(this.data.createdAt).format('DD/MM/YYYY, HH:mm')
      } else {
        return this.$moment(this.data.createdAt).format('HH:mm')
      }
    },
  },
  methods: {
    handleReferTo() {
      this.$emit('referTo')
    },
    handleRecall() {
      const params = {
        from: 10,
        to: 20,
      }
      this.$store.dispatch('setModal', {
        isShow: true,
        title: 'Bạn có chắc chắn muốn thu hồi tin nhắn?',
        description: 'Mọi người sẽ không thể nhìn thấy tin nhắn này nữa',

        callback: async () => {
          const p = this.$axios
            .post(`${this.$api.uploadSingleImage}`, params)
            .then((res) => {
              this.log(res)
            })
          this.axiosLoadError(p)
        },
      })
    },
  },
}
</script>

<style></style>
