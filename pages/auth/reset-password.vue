<template>
  <div id="reset-password-page" class="page-middle-form">
    <section class="form-section">
      <!-- Email enter form -->
      <b-form
        @submit.prevent="sendResetEmail"
        v-show="isShow(listForm.emailEnterForm)"
      >
        <h1 class="text-center">Enter your email to get reset link</h1>
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
        <b-button type="submit" :disabled="isProcessing" variant="primary"
          >Send mail</b-button
        >
        <nuxt-link to="/auth/login" class="text-center"
          >Back to login page</nuxt-link
        >
      </b-form>

      <!-- Email sent form -->
      <b-form v-show="isShow(listForm.emailSentForm)">
        <h1 class="text-center">Please check your mail box</h1>
        <div class="text-center">
          <img src="/img/auth/email-sent-icon.png" alt="" width="200" />
        </div>
        <div class="text-center">
          <a href="#" @click.prevent="sendResetEmail"
            >Hasn't received reset password email? Receive again.</a
          >
        </div>
        <nuxt-link to="/auth/login">
          <b-button
            type="button"
            :disabled="isProcessing"
            variant="primary"
            class="w-100"
            >Back to login page</b-button
          >
        </nuxt-link>
      </b-form>

      <!-- Reset password form -->
      <b-form
        @submit.prevent="resetPassword"
        v-show="isShow(listForm.resetPasswordForm)"
      >
        <h1 class="text-center">Enter your new password</h1>
        <h4 class="text-center">{{ $route.query.email }}</h4>
        <b-form-group id="input-group-2" label="Password:" label-for="input-2">
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

        <b-button type="submit" :disabled="isProcessing" variant="primary"
          >Save password</b-button
        >
      </b-form>

      <!-- Reset password done form -->
      <b-form v-show="isShow(listForm.resetPasswordDoneForm)">
        <h1 class="text-center">Your password has been saved</h1>
        <div class="text-center">
          <img src="/img/auth/done.png" alt="" width="200" />
        </div>
        <nuxt-link to="/auth/login">
          <b-button
            type="button"
            :disabled="isProcessing"
            variant="primary"
            class="w-100"
            >Back to login page</b-button
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
        .patch('/auth/reset-password', payload)
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
