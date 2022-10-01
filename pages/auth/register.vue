<template>
  <div id="login-page" class="page-middle-form">
    <section class="form-section">
      <!-- Register -->
      <b-form @submit.prevent="register">
        <h1>Register to joining us right now</h1>
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

        <b-form-group id="input-group-1" label="Birthday:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.birthday"
            type="date"
            placeholder="Enter birthday"
            required
          ></b-form-input>
        </b-form-group>

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

        <b-button type="submit" variant="primary">Register</b-button>
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
      </b-form>
      <!-- <b-card class="mt-3" header="Form Data Result">
        <pre class="m-0">{{ form }}</pre>
      </b-card> -->
    </section>
    <button></button>
  </div>
</template>

<script>
export default {
  auth: 'guest',
  layout: 'bodyOnly',
  data() {
    return {
      form: {
        email: '',
        password: '',
        rePassword: '',
        phoneNumber: null,
        birthday: null,
      },
    }
  },
  mounted() {},
  methods: {
    loginWithGoogle() {
      window.location.href = process.env.googleLoginUrl
    },
    loginWithFacebook() {
      window.location.href = process.env.facebookLoginUrl
    },
    async register() {
      try {
        let response = await this.$auth.loginWith('local', { data: this.form })
        console.log(response)
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>

<style></style>
