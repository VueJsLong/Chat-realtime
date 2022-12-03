<template>
  <div id="login-page" class="page-middle-form">
    <section class="form-section">
      <div v-show="isShow(listForm.accountInfoForm, listForm.personalInfoForm)">
        <h1 class="text-center">
          Đăng ký tài khoản và trải nghiệm ngay hôm nay
        </h1>
        <!-- Account info form -->
        <b-form v-show="isShow(listForm.accountInfoForm)">
          <b-form-group id="input-group-1" label="Email" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="form.email"
              type="email"
              placeholder="Nhập email"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Mật khẩu" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="form.password"
              type="password"
              placeholder="Nhập mật khẩu"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Nhập lại mật khẩu"
            label-for="input-2"
          >
            <b-form-input
              id="input-2"
              v-model="form.rePassword"
              type="password"
              placeholder="Nhập lại mật khẩu"
              required
            ></b-form-input>
          </b-form-group>
          <b-button
            type="button"
            variant="primary"
            @click="setCurrentForm(listForm.personalInfoForm)"
            >Tiếp tục</b-button
          >
        </b-form>

        <!-- Personal info form -->
        <b-form
          @submit.prevent="register"
          v-show="isShow(listForm.personalInfoForm)"
        >
          <b-form-group
            id="input-group-1"
            label="Họ và tên:"
            label-for="input-fullName"
          >
            <b-form-input
              id="input-fullName"
              v-model="form.fullName"
              type="text"
              placeholder="Nhập họ tên"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Giới tính" v-slot="{ ariaDescribedby }">
            <b-form-radio
              v-model="form.gender"
              :aria-describedby="ariaDescribedby"
              name="some-radios"
              value="1"
              >Nam</b-form-radio
            >
            <b-form-radio
              v-model="form.gender"
              :aria-describedby="ariaDescribedby"
              name="some-radios"
              value="0"
              >Nữ</b-form-radio
            >
          </b-form-group>

          <b-form-group
            id="input-group-1"
            label="Ngày sinh:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="form.birthday"
              type="date"
              placeholder="Nhập ngày sinh"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-1"
            label="Số điện thoại:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="form.phoneNumber"
              type="number"
              placeholder="Nhập số điện thoại"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-1"
            label="Ảnh đại diện:"
            label-for="input-thumbnail"
          >
            <b-input-group class="thumbnail-group">
              <b-form-input
                type="text"
                placeholder="Url ảnh đại diện"
                v-model="form.thumbnail"
                required
              ></b-form-input>
              <b-input-group-append>
                <thumbnail-cropper v-model="form.thumbnail"></thumbnail-cropper>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>

          <b-button type="submit" variant="primary">Tiếp tục</b-button>
        </b-form>
        <div class="row g-2">
          <div class="col-12 col-md-6">
            <b-button
              class="btn-sm w-100 h-100"
              variant="outline-success"
              @click="loginWithGoogle"
              >Tiếp tục với Google
              <img width="30" src="~/static/img/auth/google.svg" />
            </b-button>
          </div>
          <div class="col-12 col-md-6">
            <b-button
              class="btn-sm w-100 h-100"
              variant="outline-success"
              @click="loginWithFacebook"
              >Tiếp tục với Facebook
              <img width="30" src="~/static/img/auth/facebook.svg" />
            </b-button>
          </div>
        </div>
        <div class="text-center">
          <nuxt-link to="/auth/login"
            >Already had account? Login here.</nuxt-link
          >
        </div>
      </div>

      <!-- OTP -->
      <div class="otp-container" v-show="isShow(listForm.otpForm)">
        <h1 class="text-center">Vui lòng kiểm tra email để lấy OTP</h1>
        <h2 class="text-center">{{ form.email }}</h2>
        <div class="userInput">
          <div>
            <input
              type="number"
              v-model="otp.otpDigit1"
              class="otp-digit-1"
              maxlength="1"
              @keyup="(e) => nextDigit(e, 1)"
              autofocus
            />
            <input
              type="number"
              v-model="otp.otpDigit2"
              class="otp-digit-2"
              maxlength="1"
              @keyup="(e) => nextDigit(e, 2)"
            />
            <input
              type="number"
              v-model="otp.otpDigit3"
              class="otp-digit-3"
              maxlength="1"
              @keyup="(e) => nextDigit(e, 3)"
            />
          </div>
          <h1 class="text-center">-</h1>
          <div>
            <input
              type="number"
              v-model="otp.otpDigit4"
              class="otp-digit-4"
              maxlength="1"
              @keyup="(e) => nextDigit(e, 4)"
            />
            <input
              type="number"
              v-model="otp.otpDigit5"
              class="otp-digit-5"
              maxlength="1"
              @keyup="(e) => nextDigit(e, 5)"
            />
            <input
              type="number"
              v-model="otp.otpDigit6"
              class="otp-digit-6"
              maxlength="1"
              @keyup="(e) => nextDigit(e, 6)"
            />
          </div>
        </div>
        <div class="text-center">
          <a href="#" @click.prevent="register"
            >Chưa nhận được email? Gửi lại</a
          >
        </div>
        <div class="text-center">
          <a href="#" @click.prevent="goBack">Quay về</a>
        </div>
        <b-button
          class="otp-submit-button"
          variant="primary"
          @click="submitOtp"
          :disabled="isSendOTPButtonDisable"
          >Đăng ký</b-button
        >
      </div>

      <!-- Register success -->
      <b-form v-show="isShow(listForm.registerSuccessForm)">
        <h1 class="text-center">Chúc mừng bạn đã đăng ký thành công</h1>
        <div class="text-center">
          <img src="/img/auth/done.png" alt="" width="200" />
        </div>
        <nuxt-link to="/auth/login">
          <b-button type="button" variant="primary" class="w-100"
            >Quay trở lại trang đăng nhập</b-button
          >
        </nuxt-link>
      </b-form>
    </section>
    <button></button>
  </div>
</template>

<script>
import BaseAuth from '~/components/base/BaseAuth.vue'
export default {
  auth: 'guest',
  layout: 'bodyOnly',
  extends: BaseAuth,
  data() {
    return {
      form: {
        fullName: null,
        email: null,
        password: null,
        rePassword: null,
        phoneNumber: null,
        birthday: null,
        gender: null,
        thumbnail: null,
      },
      otp: {
        otpDigit1: null,
        otpDigit2: null,
        otpDigit3: null,
        otpDigit4: null,
        otpDigit5: null,
        otpDigit6: null,
      },
      listForm: {
        accountInfoForm: 'account-info-form',
        personalInfoForm: 'personal-info-form',
        otpForm: 'otp-form',
        registerSuccessForm: 'register-success',
      },
      currentForm: 'account-info-form',
    }
  },
  mounted() {},
  computed: {
    concatOTP() {
      return (
        this.otp.otpDigit1 +
        this.otp.otpDigit2 +
        this.otp.otpDigit3 +
        this.otp.otpDigit4 +
        this.otp.otpDigit5 +
        this.otp.otpDigit6
      )
    },
    isRegisterButtonDisable() {
      return true
    },
    isSendOTPButtonDisable() {
      let isEnable =
        this.otp.otpDigit1 &&
        this.otp.otpDigit2 &&
        this.otp.otpDigit3 &&
        this.otp.otpDigit4 &&
        this.otp.otpDigit5 &&
        this.otp.otpDigit6
      return !isEnable
    },
  },
  methods: {
    isShow(...forms) {
      let isShow = false
      forms.forEach((form) => {
        if (this.currentForm === form) isShow = true
      })
      return isShow
    },
    setCurrentForm(form) {
      this.currentForm = form
    },
    loginWithGoogle() {
      window.location.href = this.$config.googleLoginUrl
    },
    loginWithFacebook() {
      window.location.href = this.$config.facebookLoginUrl
    },
    async register() {
      this.setCurrentForm('otp-form')
      const p = this.$axios
        .post('/mail/otp', {
          email: this.form.email,
        })
        .then((res) => {
          this.log(res.data)
        })
      this.axiosLoadError(p)
    },
    nextDigit(event, current) {
      this.log(event)
      if (!Number(event.key) && Number(event.key) != 0) return
      this.otp[`otpDigit${current}`] = event.key
      if (current < 6) {
        $(`.otp-digit-${++current}`).focus()
      } else {
        $(`.otp-submit-button`).focus()
      }
    },
    submitOtp() {
      const responsePromise = this.$axios
        .post('/auth/register', { ...this.form, otp: this.concatOTP })
        .then((res) => {
          this.log(res.data)
          this.setCurrentForm(this.listForm.registerSuccessForm)
        })
      this.axiosLoadError(responsePromise)
    },
    reSendOTP() {},
  },
}
</script>

<style></style>
