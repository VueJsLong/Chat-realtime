<template>
  <div class="forward-message-modal">
    <b-modal
      id="forward-message"
      class="modal"
      ref="modal"
      centered
      title="Chuyển tiếp tin nhắn"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <b-form @submit.prevent="handleForwardMessage">
        <b-container fluid>
          <b-row class="my-1">
            <b-col sm="3">
              <label for="content">Nội dung</label>
            </b-col>
            <b-col sm="9">
              <b-form-textarea
                id="content"
                size="md"
                type="text"
                placeholder="Nhập nội dung"
                v-model="data.content"
                disabled
              ></b-form-textarea>
              <!-- <b-form-input
                id="content"
                type="text"
                placeholder="Nhập nội dung"
                v-model="group.name"
                required
              ></b-form-input> -->
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="3">
              <label for="forward-to">Gửi đến</label>
            </b-col>
            <b-col sm="9">
              <div class="forward-to__selector">
                <b-form-group>
                  <multiselect
                    v-model="forwardTargets"
                    placeholder="Chọn người nhận"
                    select-label=""
                    label="key"
                    track-by="key"
                    :options="options"
                    :searchable="true"
                    :multiple="true"
                    :hide-selected="true"
                  >
                  </multiselect>
                </b-form-group>
              </div>
            </b-col>
          </b-row>
          <b-button
            ref="submitFormBtn"
            type="submit"
            variant="primary"
            v-show="false"
            >Submit</b-button
          >
        </b-container>
      </b-form>
      <template #modal-footer="{ ok, cancel }">
        <b-button variant="success" @click="ok()"> Gửi </b-button>
        <b-button variant="primary" @click="cancel()"> Hủy </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Multiselect from 'vue-multiselect'

export default {
  name: 'ForwardMessage',
  components: { Multiselect },
  props: {
    data: {
      type: Object,
      required: true,
      default() {
        return {
          content: null,
          type: null,
        }
      },
    },
  },
  data() {
    return {
      forwardTargets: [],
    }
  },
  computed: {
    ...mapState({
      conversation: (state) => state.conversation,
      friends: (state) => state.friends,
      requests: (state) => state.requests,
      userConversations: (state) => state.userConversations,
      groupConversations: (state) => state.groupConversations,
    }),

    // Tạo dữ liệu cho select box
    // Format dữ liệu: target, targetId, targetName, targetThumbnail
    options() {
      const friendsData = [...this.friends, ...this.requests].map((item) => {
        const friend = this.getFriend(item)
        return {
          target: 'USER',
          targetId: friend.id,
          targetName: friend.fullName,
          targetThumbnail: friend.thumbnail,
        }
      })

      const tempResult = [
        ...friendsData,
        ...this.userConversations,
        ...this.groupConversations,
      ]

      // Loại bỏ trùng lặp
      const map = new Map()
      tempResult.forEach((item) => {
        map.set(`${item.target}_${item.targetName}`, item)
      })

      // Loại bỏ this conversation
      const key = `${this.conversation.target}_${this.conversation.targetName}`
      map.delete(key)

      // Chuyển đổi map thành array và trả về
      return Array.from(map, ([key, value]) => ({ key, ...value })).sort(
        (a, b) => String(a.key).localeCompare(b.key)
      )
    },
  },
  watch: {
    data() {
      this.log(this.friends)
    },
  },
  mounted() {},
  methods: {
    resetModal() {
      this.forwardTargets = []
    },
    async handleForwardMessage() {
      const me = this
      const socket = this.$store.getters.getSocket

      for (const item of this.forwardTargets) {
        const payload = {
          from: me.$auth.user.id,
          to: item.targetId,
          content: this.data.content,
          status: null,
          type: this.data.type,
          target: item.target,
        }
        socket.emit(me.$socketEvent.chat.sendMessages, payload, (res) => {
          // me.debug(res)
          me.bubbleConversationUp(res)
        })
      }
      this.hideModal()
    },
    async handleOk(bvModalEvent) {
      // Prevent modal from closing
      bvModalEvent.preventDefault()
      // Trigger submit handler
      this.$refs.submitFormBtn.click()
    },
    hideModal() {
      this.$nextTick(() => {
        this.$bvModal.hide('forward-message')
      })
    },
  },
}
</script>

<style scoped>
.multiselect__tag {
  background: #63c2de;
}
.multiselect__option {
  font-size: 0.875rem;
  border-bottom: 1px solid #f0f0f0;
}
.multiselect__option--highlight {
  background: #e0e0e0;
  color: #35495e;
}
</style>
