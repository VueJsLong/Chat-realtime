<template>
  <div class="create-group-modal">
    <b-modal
      :id="modalId"
      class="modal"
      ref="modal"
      centered
      title="Cập nhật hồ sơ"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <!-- Personal info form -->
      <b-form @submit.prevent="handleUpdateProfile">
        <b-container fluid>
          <b-row class="my-1">
            <b-col sm="3">
              <label for="form-1">Họ và tên</label>
            </b-col>
            <b-col sm="9">
              <b-form-input
                id="form-1"
                v-model="form.fullName"
                type="text"
                placeholder="Nhập họ tên"
                required
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="3">
              <label for="form-2">Giới tính</label>
            </b-col>
            <b-col sm="9">
              <b-form-radio
                id="form-2"
                v-model="form.gender"
                name="some-radios"
                :value="1"
                >Nam</b-form-radio
              >
              <b-form-radio v-model="form.gender" name="some-radios" :value="0"
                >Nữ</b-form-radio
              >
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="3">
              <label for="form-3">Ngày sinh</label>
            </b-col>
            <b-col sm="9">
              <b-form-input
                id="form-3"
                v-model="form.birthday"
                type="date"
                placeholder="Nhập ngày sinh"
                required
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="3">
              <label for="form-4">Số điện thoại</label>
            </b-col>
            <b-col sm="9">
              <b-form-input
                id="form-4"
                v-model="form.phoneNumber"
                type="number"
                placeholder="Nhập số điện thoại"
              ></b-form-input>
            </b-col>
          </b-row>
          <b-row class="my-1">
            <b-col sm="3">
              <label for="form-5">Ảnh đại diện</label>
            </b-col>
            <b-col sm="9">
              <b-input-group class="thumbnail-group">
                <b-form-input
                  id="form-5"
                  type="text"
                  placeholder="Url ảnh đại diện"
                  v-model="form.thumbnail"
                  required
                ></b-form-input>
                <b-input-group-append>
                  <thumbnail-cropper
                    v-model="form.thumbnail"
                  ></thumbnail-cropper>
                </b-input-group-append>
              </b-input-group>
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
        <b-button variant="success" @click="ok()"> Cập nhật </b-button>
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
      modalId: 'update-profile',
      form: {
        fullName: null,
        phoneNumber: null,
        birthday: null,
        gender: null,
        thumbnail: null,
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
      this.form = { ...this.$auth.user }
    },
    async handleUpdateProfile() {
      this.debug('Update profile payload', this.form)
      const me = this

      // Call api
      const p = this.$axios.patch('/me/update', this.form).then((res) => {
        // Mutation
        this.$auth.setUser(res.data.data)

        // Notify
        this.$snotify.success('Cập nhật thành công')

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
