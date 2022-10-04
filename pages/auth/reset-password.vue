<template>
  <div id="reset-password-page" class="page-middle-form">
    <section class="form-section">
      <!-- Email enter form -->
      <b-form
        @submit.prevent="sendResetEmail"
        v-show="isShow(listForm.emailEnterForm)"
      >
        <h1>Enter your email to get reset link</h1>
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
        <b-button type="submit" variant="primary">Send mail</b-button>
        <nuxt-link to="/auth/login" class="text-center"
          >Back to login page</nuxt-link
        >
      </b-form>

      <!-- Email sent form -->
      <b-form v-show="isShow(listForm.emailSentForm)">
        <h1>Please check your mail box</h1>
        <div class="text-center">
          <img src="/img/email-sent-icon.png" alt="" width="200" />
        </div>
        <nuxt-link to="/auth/login">
          <b-button type="button" variant="primary" class="w-100"
            >Back to login page</b-button
          >
        </nuxt-link>
      </b-form>

      <!-- Reset password form -->
      <b-form
        @submit.prevent="resetPassword"
        v-show="isShow(listForm.resetPasswordForm)"
      >
        <h1>Enter your new password</h1>
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

        <b-button type="submit" variant="primary">Save password</b-button>
      </b-form>

      <!-- Reset password done form -->
      <b-form v-show="isShow(listForm.resetPasswordDoneForm)">
        <h1>Your password has been saved</h1>
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
  </div>
</template>

<script>
export default {
  auth: 'guest',
  layout: 'bodyOnly',
  data() {
    return {
      form: {
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
    sendResetEmail() {
      this.setCurrentForm(this.listForm.emailSentForm)
    },
    resetPassword() {
      this.setCurrentForm(this.listForm.resetPasswordDoneForm)
    },
  },
}
</script>

<style></style>
