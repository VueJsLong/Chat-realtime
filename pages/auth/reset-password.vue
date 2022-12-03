<template>
  <div id="reset-password-page" class="page-middle-form">
    <section class="form-section">
      <!-- Email enter form -->
      <b-form
        @submit.prevent="sendResetEmail"
        v-show="isShow(listForm.emailEnterForm)"
      >
        <h1 class="text-center">Nhập email để nhận link làm mới mật khẩu</h1>
        <b-form-group id="input-group-1" label="Email:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            placeholder="Nhập email"
            required
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" :disabled="isProcessing" variant="primary"
          >Gửi mail</b-button
        >
        <nuxt-link to="/auth/login" class="text-center"
          >Quay trở lại trang đăng nhập</nuxt-link
        >
      </b-form>

      <!-- Email sent form -->
      <b-form v-show="isShow(listForm.emailSentForm)">
        <h1 class="text-center">Vui lòng kiểm tra Email</h1>
        <p class="text-center">{{ form.email }}</p>
        <div class="text-center">
          <img src="/img/auth/email-sent-icon.png" alt="" width="200" />
        </div>
        <div class="text-center">
          <a href="#" @click.prevent="sendResetEmail"
            >Chưa nhận được email? Gửi lại.</a
          >
        </div>
        <nuxt-link to="/auth/login">
          <b-button
            type="button"
            :disabled="isProcessing"
            variant="primary"
            class="w-100"
            >Quay trở lại trang đăng nhập</b-button
          >
        </nuxt-link>
      </b-form>

      <!-- Reset password form -->
      <b-form
        @submit.prevent="resetPassword"
        v-show="isShow(listForm.resetPasswordForm)"
      >
        <h1 class="text-center">Đặt mật khẩu mới</h1>
        <h4 class="text-center">{{ $route.query.email }}</h4>
        <b-form-group
          id="input-group-2"
          label="Mật khẩu mới"
          label-for="input-2"
        >
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

        <b-button type="submit" :disabled="isProcessing" variant="primary"
          >Lưu mật khẩu</b-button
        >
      </b-form>

      <!-- Reset password done form -->
      <b-form v-show="isShow(listForm.resetPasswordDoneForm)">
        <h1 class="text-center">Mật khẩu mới của bạn đã đuuợc lưu</h1>
        <div class="text-center">
          <img src="/img/auth/done.png" alt="" width="200" />
        </div>
        <nuxt-link to="/auth/login">
          <b-button
            type="button"
            :disabled="isProcessing"
            variant="primary"
            class="w-100"
            >Quay trở lại trang đăng nhập</b-button
          >
        </nuxt-link>
      </b-form>
    </section>
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
        email: null,
        password: null,
        rePassword: null,
      },
      listForm: {
        emailEnterForm: 'email-enter-form',
        emailSentForm: 'email-sent-form',
        resetPasswordForm: 'reset-password-form',
        resetPasswordDoneForm: 'reset-password-done-form',
      },
      currentForm: 'email-enter-form',
    }
  },
  mounted() {
    let query = this.$route.query
    if (query.email && query.verify_token) {
      this.setCurrentForm(this.listForm.resetPasswordForm)
    }
  },
  computed: {},
  methods: {
    isShow(form) {
      return this.currentForm === form
    },
    setCurrentForm(form) {
      this.currentForm = form
    },
    async sendResetEmail() {
      this.toggleProcessing()
      const p = this.$axios
        .post('/mail/reset-password', { email: this.form.email })
        .then((res) => {
          this.log(res.data)
          this.setCurrentForm(this.listForm.emailSentForm)
        })
        .finally(() => this.toggleProcessing())
      this.axiosLoadError(p)
    },
    async resetPassword() {
      this.toggleProcessing()
      let query = this.$route.query
      const payload = {
        ...this.form,
        email: query.email,
        verify_token: query.verify_token,
      }
      const p = this.$axios
        .patch('/me/reset-password', payload)
        .then((res) => {
          this.log(res.data)
          this.setCurrentForm(this.listForm.resetPasswordDoneForm)
        })
        .finally(() => this.toggleProcessing())
      this.axiosLoadError(p)
    },
  },
}
</script>

<style></style>
