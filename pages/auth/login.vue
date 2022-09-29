<template>
  <div id="login-page">
    <section class="form-section">
      <!-- login -->
      <b-form @submit.prevent="login" v-if="showLoginForm">
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

        <b-form-group id="input-group-2" label="Password:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.password"
            type="password"
            placeholder="Enter password"
            required
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Login</b-button>
        <div>
          <b-button variant="outline-secondary"
            >Continue with Google
            <img width="30" src="~/static/img/google.svg" />
          </b-button>
          <b-button variant="outline-secondary"
            >Continue with Facebook
            <img width="30" src="~/static/img/facebook.svg"
          /></b-button>
        </div>
        <div>
          <b-button variant="outline-danger" @click="toggleForm"
            >Register here</b-button
          >
        </div>
      </b-form>

      <!-- Register -->
      <b-form @submit.prevent="register" v-if="!showLoginForm">
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
        <div>
          <b-button variant="outline-secondary"
            >Continue with Google
            <img width="30" src="~/static/img/google.svg" />
          </b-button>
          <b-button variant="outline-secondary"
            >Continue with Facebook
            <img width="30" src="~/static/img/facebook.svg" />
          </b-button>
        </div>
        <div>
          <b-button variant="outline-danger" @click="toggleForm"
            >Login here</b-button
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
      foods: [
        { text: 'Select One', value: null },
        'Carrots',
        'Beans',
        'Tomatoes',
        'Corn',
      ],
      showLoginForm: true,
    }
  },
  mounted() {
    if (this.$auth.loggedIn) {
      this.$router.push({ path: '/' })
    }
  },
  methods: {
    toggleForm() {
      this.showLoginForm = !this.showLoginForm
    },
    async login() {
      try {
        let response = await this.$auth.loginWith('local', { data: this.form })
        console.log(response)
      } catch (err) {
        console.log(err)
      }
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

<style>
#login-page {
  width: 100vw;
  height: 100vh;
  background: url('~/static/img/login-background.png');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
#login-page .form-section {
  background-color: #fff;
  padding: 32px;
  border-radius: 16px;
  -webkit-box-shadow: 5px 11px 20px 8px rgba(51, 51, 51, 0.85);
  box-shadow: 5px 11px 20px 8px rgba(51, 51, 51, 0.85);
  min-width: 25%;
  min-height: 50%;
}
</style>
