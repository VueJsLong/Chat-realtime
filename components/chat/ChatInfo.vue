<template>
  <!-- chat user info -->
  <div class="chat-info" v-if="conversation.target == 'USER'">
    <div class="chat-info-header">
      <div class="chat-info-header__back-btn m-icon-btn">
        <i class="fi fi-rs-arrow-circle-left"></i>
        Back
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
      <div class="chat-info-main__toolbar">
        <div
          class="main-toolbar__notify m-icon-btn d-flex g-2 flex-column align-items-center"
          title="notify"
        >
          <i class="fi fi-rs-bell"></i>
          <!-- <i class="fi fi-rs-bell-ring"></i> -->
          Notify
        </div>
        <div
          class="main-toolbar__search m-icon-btn d-flex g-2 flex-column align-items-center"
          title="search"
        >
          <i class="fi fi-rr-search"></i>
          Search
        </div>
      </div>

      <!-- toolbar accordion  -->
      <div class="toolbar-accordion">
        <div class="accordion" role="tablist">
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <div block v-b-toggle.user-accordion-1 variant="info">
                Actions
              </div>
            </b-card-header>
            <b-collapse
              id="user-accordion-1"
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <button
                  class="chat-info-footer__ban-message m-btn m-btn-with-icon primary-btn --warning"
                >
                  <i class="fi fi-rr-comment-xmark btn-icon"></i>
                  Ban message
                </button>
                <button
                  class="chat-info-footer__remove-friend m-btn m-btn-with-icon primary-btn --danger"
                >
                  <i class="fi fi-rr-remove-user btn-icon"></i>
                  Unfriend
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
      <div class="chat-info-header__back-btn m-icon-btn">
        <i class="fi fi-rs-arrow-circle-left"></i>
        Back
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
      <div class="chat-info-main__toolbar">
        <div
          class="main-toolbar__notify m-icon-btn d-flex g-2 flex-column align-items-center"
          title="notify"
        >
          <i class="fi fi-rs-bell"></i>
          <!-- <i class="fi fi-rs-bell-ring"></i> -->
          Notify
        </div>
        <div
          class="main-toolbar__search m-icon-btn d-flex g-2 flex-column align-items-center"
          title="search"
        >
          <i class="fi fi-rr-search"></i>
          Search
        </div>
      </div>

      <!-- toolbar accordion -->
      <div class="toolbar-accordion">
        <div class="accordion" role="tablist">
          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <div block v-b-toggle.accordion-1 variant="info">Members</div>
            </b-card-header>
            <b-collapse
              id="accordion-1"
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <div class="item" v-for="item in groupMembers" :key="item.id">
                  <img
                    :src="item.member.thumbnail"
                    alt=""
                    referrerpolicy="no-referrer"
                  />
                  <div class="content">
                    <div class="friends">{{ item.member.fullName }}</div>
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
                  >
                    <i class="fi fi-rr-remove-user btn-icon"></i>
                  </button>
                </div>
              </b-card-body>
            </b-collapse>
          </b-card>

          <b-card no-body class="mb-1">
            <b-card-header header-tag="header" class="p-1" role="tab">
              <div block v-b-toggle.accordion-2 variant="info">Actions</div>
            </b-card-header>
            <b-collapse
              id="accordion-2"
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-card-body>
                <button
                  class="chat-info-footer__ban-message m-btn m-btn-with-icon primary-btn"
                >
                  <i class="btn-icon fi fi-rr-user-add"></i>
                  Add member
                </button>
                <button
                  class="chat-info-footer__remove-friend m-btn m-btn-with-icon primary-btn --danger"
                >
                  <i class="fi fi-rr-remove-user btn-icon"></i>
                  Delete group
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
  data() {
    return {
      conversation: {
        target: null,
        targetId: null,
        targetName: null,
        targetThumbnail: null,
      },
      text: 'lorem',
      groupMembers: [],
    }
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
      this.$axios
        .get(`${this.$api.getGroupMembers}/${this.conversation.targetId}`)
        .then((res) => {
          this.groupMembers = res.data.data.groupMembers
        })
        .catch()
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
    removeGroupMember(member) {
      console.log(member)
    },
  },
}
</script>

<style></style>
