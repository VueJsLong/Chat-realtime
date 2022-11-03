<template>
  <div id="login-page" class="page-middle-form">
    <section class="form-section">
      <div v-show="isShow(listForm.accountInfoForm, listForm.personalInfoForm)">
        <h1 class="text-center">Register to joining us right now</h1>
        <!-- Account info form -->
        <b-form v-show="isShow(listForm.accountInfoForm)">
          <b-form-group
            id="input-group-1"
            label="Email address:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="form.email"
              type="email"
              placeholder="Enter email"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Password:"
            label-for="input-2"
          >
            <b-form-input
              id="input-2"
              v-model="form.password"
              type="password"
              placeholder="Enter password"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-2"
            label="Re-password:"
            label-for="input-2"
          >
            <b-form-input
              id="input-2"
              v-model="form.rePassword"
              type="password"
              placeholder="Re-enter password"
              required
            ></b-form-input>
          </b-form-group>
          <b-button
            type="button"
            variant="primary"
            @click="setCurrentForm(listForm.personalInfoForm)"
            >Next</b-button
          >
        </b-form>

        <!-- Personal info form -->
        <b-form
          @submit.prevent="register"
          v-show="isShow(listForm.personalInfoForm)"
        >
          <b-form-group
            id="input-group-1"
            label="Fullname:"
            label-for="input-fullName"
          >
            <b-form-input
              id="input-fullName"
              v-model="form.fullName"
              type="text"
              placeholder="Enter your name"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Gender" v-slot="{ ariaDescribedby }">
            <b-form-radio
              v-model="form.gender"
              :aria-describedby="ariaDescribedby"
              name="some-radios"
              value="1"
              >Male</b-form-radio
            >
            <b-form-radio
              v-model="form.gender"
              :aria-describedby="ariaDescribedby"
              name="some-radios"
              value="0"
              >Female</b-form-radio
            >
          </b-form-group>

          <b-form-group
            id="input-group-1"
            label="Birthday:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="form.birthday"
              type="date"
              placeholder="Enter birthday"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-1"
            label="Phone number:"
            label-for="input-1"
          >
            <b-form-input
              id="input-1"
              v-model="form.phoneNumber"
              type="number"
              placeholder="Enter phone number"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-1"
            label="Thumbnail:"
            label-for="input-thumbnail"
          >
            <b-form-input
              id="input-thumbnail"
              v-model="form.thumbnail"
              type="text"
              placeholder="Enter your name"
              required
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary">Next</b-button>
        </b-form>
        <div class="row g-2">
          <div class="col-12 col-md-6">
            <b-button
              class="btn-sm w-100 h-100"
              variant="outline-secondary"
              @click="loginWithGoogle"
              >Continue with Google
              <img width="30" src="~/static/img/google.svg" />
            </b-button>
          </div>
          <div class="col-12 col-md-6">
            <b-button
              class="btn-sm w-100 h-100"
              variant="outline-secondary"
              @click="loginWithFacebook"
              >Continue with Facebook
              <img width="30" src="~/static/img/facebook.svg" />
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
        <h1 class="text-center">Please check mail box to get OTP</h1>
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
            >Hasn't received otp yet? Receive again.</a
          >
        </div>
        <div class="text-center">
          <a href="#" @click.prevent="goBack">Go back</a>
        </div>
        <b-button
          class="otp-submit-button"
          variant="primary"
          @click="submitOtp"
          :disabled="isSendOTPButtonDisable"
          >Register</b-button
        >
      </div>

      <!-- Register success -->
      <b-form v-show="isShow(listForm.registerSuccessForm)">
        <h1 class="text-center">Register account done</h1>
        <div class="text-center">
          <img src="/img/done.png" alt="" width="200" />
        </div>
        <nuxt-link to="/auth/login">
          <b-button type="button" variant="primary" class="w-100"
            >Back to login page</b-button
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
  layout: 'BodyOnly',
  extends: BaseAuth,
  data() {
    return {
      form: {
        fullName: 'fullname',
        email: 'mama7576277@gmail.com',
        password: 'examplePassword',
        rePassword: 'examplePassword',
        phoneNumber: '123123',
        birthday: '2000-05-20',
        gender: '1',
        thumbnail: '/img',
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
      window.location.href = process.env.googleLoginUrl
    },
    loginWithFacebook() {
      window.location.href = process.env.facebookLoginUrl
    },
    async register() {
      this.setCurrentForm('otp-form')
      this.$axios
        .post('/mail/otp', {
          email: this.form.email,
        })
        .then((res) => {
          this.log(res.data)
        })
        .catch()
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
