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
            ></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="3">
            <label for="group-thumbnail">Thumbnail</label>
          </b-col>
          <b-col sm="9">
            <b-form-input
              id="group-thumbnail"
              type="text"
              placeholder="Thumbnail url"
              v-model="group.thumbnail"
            ></b-form-input>
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
      </b-container>
    </b-modal>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
export default {
  name: 'CreateGroup',
  components: { Multiselect },
  data() {
    return {
      friends: [],
      group: {
        name: '',
        thumbnail: '',
        members: [],
      },
    }
  },
  computed: {
    friendOptions() {
      return this.friends.map((item) => item.from)
    },
  },
  watch: {
    '$store.state.friends'() {
      this.friends = this.$store.getters.getFriends
    },
  },
  mounted() {
    this.getFriends()
  },
  methods: {
    async getFriends() {
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
      this.log(params)
    },
    async handleOk(bvModalEvent) {
      // Prevent modal from closing
      bvModalEvent.preventDefault()
      // Trigger submit handler
      await this.handleCreateGroup()
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('create-group')
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
