<template>
  <div>
    <b-modal
      id="modal-sm"
      size="sm"
      title="Thông tin cá nhân"
      hide-footer
      v-model="showmodal"
    >
      <div class="profile modal-content">
        <div class="profile-introduct center">
          <h3>Thông tin tài khoản</h3>
        </div>
        <div class="profile-image center">
          <img src="image/Ellipse 1.png" alt="" />
          <p>{{ item.fullName }}</p>
        </div>
        <div class="profile-infor">
          <p>Thông tin cá nhân</p>
          <div class="profile-infor-detail">
            <div>
              <p>Số điện thoại</p>
              <span>{{ item.phoneNumber }}</span>
            </div>
            <div>
              <p>Giới tính</p>
              <span>{{ item.gender }}</span>
            </div>
            <div>
              <p>Ngày sinh</p>
              <span>{{ item.birthday }}</span>
            </div>
          </div>
        </div>
      </div>
      <b-button class="mt-3" block @click="showUpdate"
        >cập nhập thông tin tài khoản</b-button
      >
    </b-modal>
    <b-modal
      id="modal-sm-update"
      size="sm"
      title="Cập nhập thông tin cá nhân"
      hide-footer
      v-model="showModalUpdate"
    >
      <div class="profile-update modal-content">
        <div class="profile-introduct center">
          <h3>Cập nhập thông tin</h3>
        </div>
        <div class="profile-image center">
          <img src="image/Ellipse 1.png" alt="" />
          <p>tên hiển thị</p>
          <form action="">
            <input type="text" />
          </form>
        </div>
        <div class="profile-infor">
          <p>Thông tin cá nhân</p>

          <div class="profile-infor-detail">
            <div>
              <p>Giới tính</p>
              <input type="checkbox" name="male" />Nam
              <input type="checkbox" name="male" />Nữ
            </div>
            <div>
              <p>Ngày sinh</p>
              <input type="date" />
            </div>
          </div>
          <div class="profile-change"></div>
        </div>
      </div>
      <b-button class="mt-3" block>Hoàn thành</b-button>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'profile',
  data() {
    return {
      showmodal: false,
      showModalUpdate: false,
      item: {},
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    show() {
      this.showmodal = true
    },
    showUpdate() {
      this.showModalUpdate = true
    },
    loadData() {
      let p = this.$axios.get(`/me/profile`).then((response) => {
        this.item = response.data.data
      })
    },
  },
}
</script>

<style></style>
