<template>
  <div class="forward-message-modal">
    <b-modal
      :id="modalId"
      class="modal"
      ref="modal"
      centered
      title="Thêm thành viên"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <b-form @submit.prevent="handleAddMembers">
        <b-container fluid>
          <b-row class="my-1">
            <b-col sm="3">
              <label for="content">Nhóm</label>
            </b-col>
            <b-col sm="9">
              <div class="item">
                <div class="m-thumbnail">
                  <img
                    :src="thumbnail(conversation?.targetThumbnail)"
                    alt=""
                    referrerpolicy="no-referrer"
                  />
                </div>
                <div class="content">
                  <div class="friend-name">{{ conversation?.targetName }}</div>
                </div>
              </div>
            </b-col>
          </b-row>
          <!-- <b-row class="my-1">
            <b-col sm="3">
              <label for="forward-to">Danh sách thành viên</label>
            </b-col>
            <b-col sm="9">
              <div class="forward-to__selector">
                <b-form-group>
                  <multiselect
                    placeholder="Tìm thành viên"
                    select-label=""
                    label="member.fullName"
                    track-by="id"
                    :options="groupMembers"
                    :searchable="true"
                    :multiple="true"
                    :hide-selected="true"
                  >
                  </multiselect>
                </b-form-group>
              </div>
            </b-col>
          </b-row> -->
          <b-row class="my-1">
            <b-col sm="3">
              <label for="forward-to">Người cần thêm</label>
            </b-col>
            <b-col sm="9">
              <div class="forward-to__selector">
                <b-form-group>
                  <multiselect
                    v-model="members"
                    placeholder="Chọn bạn bè"
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
        <b-button variant="success" @click="ok()"> Thêm </b-button>
        <b-button variant="primary" @click="cancel()"> Hủy </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Multiselect from 'vue-multiselect'

export default {
  name: 'AddGroupMember',
  components: { Multiselect },
  emits: ['addMembersDone'],
  props: {
    groupMembers: {
      type: Array,
      required: true,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      modalId: 'add-group-member',
      members: [],
    }
  },
  computed: {
    ...mapState({
      conversation: (state) => state.conversation,
      friends: (state) => state.friends,
      requests: (state) => state.requests,
    }),

    // Tạo dữ liệu cho select box
    // Format dữ liệu: id, fullName, thumbnail, key
    options() {
      const friendsData = [...this.friends, ...this.requests].map((item) => {
        const friend = this.getFriend(item)
        return {
          id: friend.id,
          fullName: friend.fullName,
          thumbnail: friend.thumbnail,
          key: friend.fullName,
        }
      })

      // Chuyển danh sách bạn bè thành map
      const map = new Map()
      friendsData.forEach((item) => {
        map.set(item.id, item)
      })

      // Loại bỏ những người đã là thành viên
      this.groupMembers.forEach((item) => {
        map.delete(item.member.id)
      })

      // Chuyển đổi map thành array và trả về
      return Array.from(map, ([key, value]) => ({ key, ...value })).sort(
        (a, b) => String(a.key).localeCompare(b.key)
      )
    },
  },
  watch: {},
  mounted() {},
  methods: {
    resetModal() {
      this.members = []
    },
    async handleAddMembers() {
      const me = this
      const socket = this.$store.getters.getSocket

      for (const item of this.members) {
        const payload = {
          groupId: this.conversation.targetId,
          memberId: item.id,
        }
        socket.emit(me.$socketEvent.group.addMember, payload, (res) => {
          me.debug(res)
          me.appendChatMessages(res)
          me.bubbleConversationUp(res)
          this.$snotify.success(res.content)
        })
      }
      this.$emit('addMembersDone')
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
        this.$bvModal.hide(this.modalId)
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
