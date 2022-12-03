<template>
  <!-- chat user info -->
  <div class="chat-info" v-if="conversation.target == 'USER'">
    <div class="chat-info-header">
      <div
        class="chat-info-header__back-btn m-icon-btn"
        @click="hideChatInfo"
        v-show="false"
      >
        <i class="fi fi-rs-arrow-circle-left"></i>
        Quay lại
      </div>
    </div>
    <div class="chat-info-main">
      <div class="chat-info-main__conversation-info">
        <img
          class="chat-info__thumbnail m-thumbnail"
          :src="thumbnail(conversation.targetThumbnail)"
          alt=""
        />
        <span class="chat-info__name">{{ conversation.targetName }}</span>
      </div>
      <div class="chat-info-main__toolbar" v-if="false">
        <div
          class="main-toolbar__notify m-icon-btn d-flex g-2 flex-column align-items-center"
          title="notify"
        >
          <i class="fi fi-rs-bell"></i>
          <!-- <i class="fi fi-rs-bell-ring"></i> -->
          Thông báo
        </div>
        <div
          class="main-toolbar__search m-icon-btn d-flex g-2 flex-column align-items-center"
          title="search"
        >
          <i class="fi fi-rr-search"></i>
          Tìm kiếm
        </div>
      </div>

      <!-- toolbar accordion  -->
      <div class="toolbar-accordion">
        <div class="accordion" role="tablist">
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <div block v-b-toggle.user-accordion-1 variant="info">
                Hành động
              </div>
            </b-card-header>
            <b-collapse
              id="user-accordion-1"
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <!-- <button
                  class="chat-info-footer__ban-message m-btn m-btn-with-icon primary-btn --warning"
                >
                  <i class="fi fi-rr-comment-xmark btn-icon"></i>
                  Ban message
                </button> -->
                <button
                  class="chat-info-footer__remove-friend m-btn m-btn-with-icon primary-btn --danger"
                  @click="removeFriend"
                >
                  <i class="fi fi-rr-remove-user btn-icon"></i>
                  Xóa bạn
                </button>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>
      </div>
    </div>
    <div class="chat-info-footer"></div>
  </div>

  <!-- chat group info -->
  <div class="chat-info" v-else>
    <div class="chat-info-header">
      <div
        class="chat-info-header__back-btn m-icon-btn"
        @click="hideChatInfo"
        v-show="false"
      >
        <i class="fi fi-rs-arrow-circle-left"></i>
        Quay lại
      </div>
    </div>
    <div class="chat-info-main">
      <div class="chat-info-main__conversation-info">
        <img
          class="chat-info__thumbnail m-thumbnail"
          :src="thumbnail(conversation.targetThumbnail)"
          alt=""
        />
        <span class="chat-info__name">{{ conversation.targetName }}</span>
      </div>
      <div class="chat-info-main__toolbar" v-if="false">
        <div
          class="main-toolbar__notify m-icon-btn d-flex g-2 flex-column align-items-center"
          title="notify"
        >
          <i class="fi fi-rs-bell"></i>
          <!-- <i class="fi fi-rs-bell-ring"></i> -->
          Thông báo
        </div>
        <div
          class="main-toolbar__search m-icon-btn d-flex g-2 flex-column align-items-center"
          title="search"
        >
          <i class="fi fi-rr-search"></i>
          Tìm kiếm
        </div>
      </div>

      <!-- toolbar accordion -->
      <div class="toolbar-accordion">
        <div class="accordion" role="tablist">
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <div block v-b-toggle.accordion-1 variant="info">
                Thành viên ({{ groupMembers.length }})
              </div>
            </b-card-header>
            <b-collapse
              id="accordion-1"
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <div class="item" v-for="item in groupMembers" :key="item.id">
                  <img
                    :src="thumbnail(item.member?.thumbnail)"
                    alt=""
                    referrerpolicy="no-referrer"
                  />
                  <div class="content">
                    <div class="friends --text-ellipsis-2">
                      {{ item.member.fullName }}
                    </div>
                  </div>

                  <button
                    class="member__send-message m-icon-btn --primary"
                    title="Send message"
                    @click="setConversation(item.member)"
                  >
                    <i class="fi fi-rr-comment"></i>
                  </button>
                  <button
                    class="member__remove-member m-icon-btn --danger"
                    title="Remove"
                    @click.stop="removeGroupMember(item)"
                    v-if="isLeader"
                  >
                    <i class="fi fi-rr-remove-user btn-icon"></i>
                  </button>
                </div>
              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <div block v-b-toggle.accordion-2 variant="info">Hành động</div>
            </b-card-header>
            <b-collapse
              id="accordion-2"
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <button
                  class="chat-info-footer__ban-message m-btn m-btn-with-icon primary-btn"
                  v-if="isLeader"
                >
                  <i class="btn-icon fi fi-rr-user-add"></i>
                  Thêm thành viên
                </button>
                <button
                  class="chat-info-footer__remove-friend m-btn m-btn-with-icon primary-btn --danger"
                  v-if="isLeader"
                  @click="deleteGroup"
                >
                  <i class="fi fi-rr-remove-user btn-icon"></i>
                  Xóa nhóm
                </button>
                <button
                  class="chat-info-footer__remove-friend m-btn m-btn-with-icon primary-btn --danger"
                  v-if="!isLeader"
                  @click="outGroup"
                >
                  <i class="fi fi-rr-remove-user btn-icon"></i>
                  Rời nhóm
                </button>
              </b-card-body>
            </b-collapse>
          </b-card>
        </div>
      </div>
    </div>
    <div class="chat-info-footer"></div>
  </div>
</template>

<script>
export default {
  emits: ['hideChatInfo'],
  data() {
    return {
      conversation: {
        target: null,
        targetId: null,
        targetName: null,
        targetThumbnail: null,
        leaderId: null,
      },
      text: 'lorem',
      groupMembers: [],
    }
  },
  computed: {
    isLeader() {
      return this.conversation.leaderId == this.$auth.user.id
    },
  },
  watch: {
    '$store.state.conversation'() {
      this.conversation = this.$store.getters.getConversation
    },
    conversation() {
      if (this.conversation.target == 'GROUP') this.getGroupMembers()
    },
  },
  mounted() {
    this.conversation = this.$store.getters.getConversation
  },
  methods: {
    getGroupMembers() {
      const p = this.$axios
        .get(`${this.$api.getGroupMembers}/${this.conversation.targetId}`)
        .then((res) => {
          this.groupMembers = res.data.data.groupMembers
        })
      this.axiosLoadError(p)
    },
    setConversation(member) {
      const { id, fullName, thumbnail } = member
      this.$store.dispatch('setConversation', {
        targetId: id,
        targetName: fullName,
        targetThumbnail: thumbnail,
        target: 'USER',
      })
    },
    handleRemoveGroupMember(member) {
      const p = this.$axios
        .post(`${this.$api.uploadSingleImage}`)
        .then((res) => {
          this.log(res)
        })
      this.axiosLoadError(p)
    },
    hideChatInfo() {
      this.log('click')
      this.$emit('hideChatInfo')
    },
    handleRemoveFriend() {
      const me = this
      const socket = me.$store.getters.getSocket

      // emit event
      const payload = {
        from: me.$auth.user.id,
        to: this.conversation.targetId,
      }
      socket.emit(me.$socketEvent.friend.removeFriend, payload, (res) => {
        // me.debug(res)
        me.removeFriends(res)
        this.$snotify.success(me.$socketEvent.friend.removeFriend)
      })
    },
    removeFriend() {
      this.$store.dispatch('setModal', {
        isShow: true,
        title: 'Bạn có chắc chắn muốn xóa bạn bè?',
        description: 'Hành động này không thể khôi phục',

        callback: () => this.handleRemoveFriend(),
      })
    },
    removeGroupMember(member) {
      this.$store.dispatch('setModal', {
        isShow: true,
        title: 'Bạn có chắc chắn muốn xóa thành viên này?',
        description: 'Hành động này không thể khôi phục',

        callback: () => this.handleRemoveGroupMember(member),
      })
    },
    outGroup() {
      this.$store.dispatch('setModal', {
        isShow: true,
        title: 'Bạn có chắc chắn muốn rời nhóm?',
        description: 'Hành động này không thể khôi phục',

        callback: async () => {
          const p = this.$axios
            .post(`${this.$api.uploadSingleImage}`)
            .then((res) => {
              this.log(res)
            })
          this.axiosLoadError(p)
        },
      })
    },
    deleteGroup() {
      this.$store.dispatch('setModal', {
        isShow: true,
        title: 'Bạn có chắc chắn muốn xóa nhóm?',
        description: 'Hành động này không thể khôi phục',

        callback: async () => {
          const p = this.$axios
            .post(`${this.$api.uploadMultipleImage}`)
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
