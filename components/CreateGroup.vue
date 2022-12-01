<template>
  <div class="create-group-modal">
    <b-modal
      id="create-group"
      ref="modal"
      centered
      title="Create group"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <b-form @submit.prevent="handleCreateGroup">
        <b-container fluid>
          <b-row class="my-1">
            <b-col sm="3">
              <label for="group-name">Name</label>
            </b-col>
            <b-col sm="9">
              <b-form-input
                id="group-name"
                type="text"
                placeholder="Group name"
                v-model="group.name"
                required
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="3">
              <label for="group-thumbnail">Thumbnail</label>
            </b-col>
            <b-col sm="9">
              <b-input-group>
                <b-form-input
                  id="group-thumbnail"
                  type="text"
                  placeholder="Thumbnail url"
                  v-model="group.thumbnail"
                  required
                ></b-form-input>
                <b-input-group-append>
                  <thumbnail-cropper
                    v-model="group.thumbnail"
                  ></thumbnail-cropper>
                </b-input-group-append>
              </b-input-group>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="3">
              <label for="group-members">Members</label>
            </b-col>
            <b-col sm="9">
              <div class="group-members__selector">
                <b-form-group>
                  <multiselect
                    v-model="group.members"
                    placeholder="Choose member"
                    select-label=""
                    label="fullName"
                    track-by="id"
                    :options="friendOptions"
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
    </b-modal>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import ThumbnailCropper from './ThumbnailCropper.vue'
export default {
  name: 'CreateGroup',
  components: { Multiselect, ThumbnailCropper },
  data() {
    return {
      friends: [],
      requests: [],
      group: {
        name: '',
        thumbnail: '',
        members: [],
      },
    }
  },
  computed: {
    friendOptions() {
      return [...this.friends, ...this.requests]
        .map((item) => this.getFriend(item))
        .sort((a, b) => String(a.fullName).localeCompare(b.fullName))
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
    this.getFriends()
    this.getRequests()
  },
  methods: {
    async getRequests() {
      if (this.$store.getters.getRequests.length > 0) {
        this.requests = this.$store.getters.getRequests
      }

      const params = {}
      this.$axios
        .get(this.$api.getRequests, { params })
        .then((res) => {
          this.$store.dispatch('setRequests', res.data.data)
        })
        .catch((err) => {
          this.log(err)
        })
    },
    async getFriends() {
      if (this.$store.getters.getFriends.length > 0) {
        this.friends = this.$store.getters.getFriends
      }

      const params = {}
      this.$axios
        .get(this.$api.getFriends, { params })
        .then((res) => {
          this.$store.dispatch('setFriends', res.data.data)
        })
        .catch((err) => {
          this.log(err)
        })
    },
    resetModal() {
      this.group = {
        name: '',
        thumbnail: '',
        members: [],
      }
    },
    async handleCreateGroup() {
      let params = {
        ...this.group,
        members: this.group.members.map((item) => item.id),
      }
      this.debug('Create group payload', params)
      const me = this
      const socket = me.$store.getters.getSocket

      // emit event
      socket.emit(me.$socketEvent.group.create, params, (res) => {
        me.debug(res)
        this.$snotify.success(me.$socketEvent.group.create)

        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide('create-group')
        })
      })
    },
    async handleOk(bvModalEvent) {
      // Prevent modal from closing
      bvModalEvent.preventDefault()
      // Trigger submit handler
      this.$refs.submitFormBtn.click()
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
