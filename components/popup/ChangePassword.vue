<template>
  <div class="create-group-modal">
    <b-modal
      :id="modalId"
      class="modal"
      ref="modal"
      centered
      title="Đổi mật khẩu"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <template #modal-header="{ close }">
        <div>
          <h5>Đổi mật khẩu</h5>
          <i class="" style="font-size: 12px"
            >(Không thể đổi mật khẩu nếu bạn đăng ký bằng tài khoản google /
            facebook)</i
          >
        </div>
        <button type="button" aria-label="Close" class="close" @click="close">
          ×
        </button>
      </template>
      <!-- Personal info form -->
      <b-form @submit.prevent="handleUpdateProfile">
        <b-container fluid>
          <b-row class="my-1">
            <b-col sm="3">
              <label for="form-1">Mật khẩu cũ</label>
            </b-col>
            <b-col sm="9">
              <b-form-input
                id="form-1"
                v-model="form.oldPassword"
                type="password"
                placeholder="Nhập mật khẩu cũ"
                autocomplete="on"
                required
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="3">
              <label for="form-2">Mật khẩu mới</label>
            </b-col>
            <b-col sm="9">
              <b-form-input
                id="form-2"
                v-model="form.newPassword"
                type="password"
                placeholder="Nhập mật khẩu mới"
                autocomplete="on"
                required
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="3">
              <label for="form-3">Nhập lại mật khẩu</label>
            </b-col>
            <b-col sm="9">
              <b-form-input
                id="form-3"
                v-model="form.rePassword"
                type="password"
                placeholder="Nhập lại mật khẩu"
                autocomplete="on"
                required
              ></b-form-input>
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
        <b-button variant="success" @click="ok()"> Đổi mật khẩu </b-button>
        <b-button variant="primary" @click="cancel()"> Hủy </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import ThumbnailCropper from '../ThumbnailCropper.vue'
export default {
  name: 'UpdateProfile',
  components: { Multiselect, ThumbnailCropper },
  data() {
    return {
      modalId: 'change-password',
      form: {
        oldPassword: null,
        newPassword: null,
        rePassword: null,
      },
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.resetModal()
  },
  methods: {
    resetModal() {
      this.form = {
        oldPassword: null,
        newPassword: null,
        rePassword: null,
      }
    },
    async handleUpdateProfile() {
      this.debug('Change password payload', this.form)
      const me = this

      // Call api
      const p = this.$axios
        .patch('/me/change-password', this.form)
        .then((res) => {
          // Mutation
          this.$auth.setUser(res.data.data)

          // Notify
          this.$snotify.success('Đổi mật khẩu thành công')

          // Hide the modal manually
          this.$nextTick(() => {
            this.$bvModal.hide(this.modalId)
          })
        })
      this.axiosLoadError(p)
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
