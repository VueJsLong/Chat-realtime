<template>
  <div>
    <div class="modal hide update">
      <div class="profile-update modal-content">
        <div class="profile-introduct center">
          <h3>Cập nhập thông tin</h3>
          <button class="modal-close">Đóng</button>
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
          <div class="profile-change">
            <!-- <button id="update-infor">Hoàn thành</button> -->
          </div>
        </div>
      </div>
    </div>

    <div class="modal hide">
      <div class="profile modal-content">
        <div class="profile-introduct center">
          <h3>Thông tin tài khoản</h3>
          <button class="modal-close">Đóng</button>
        </div>
        <div class="profile-image center">
          <img src="image/Ellipse 1.png" alt="" />
          <p>Nguyễn văn long</p>
        </div>
        <div class="profile-infor">
          <p>Thông tin cá nhân</p>
          <div class="profile-infor-detail">
            <div>
              <p>Số điện thoại</p>
              <span>0123456789</span>
            </div>
            <div>
              <p>Giới tính</p>
              <span>Nam</span>
            </div>
            <div>
              <p>Ngày sinh</p>
              <span>1/2/2022</span>
            </div>
          </div>
        </div>
        <div class="profile-change">
          <button id="update-infor">Cập nhập thông tin</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
