<template>
  <div id="login-page" class="page-middle-form">
    <section class="form-section">
      <!-- login -->
      <b-form @submit.prevent="login">
        <h1 class="text-center">Đăng nhập và trải nghiệm ứng dụng chat</h1>
        <b-form-group id="input-group-1" label="Email:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.email"
            type="email"
            placeholder="Nhập email"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Mật khẩu:" label-for="input-2">
          <b-form-input
            id="input-2"
            v-model="form.password"
            type="password"
            placeholder="Nhập mật khẩu"
            required
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Đăng nhập</b-button>
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
              <img width="30" src="~/static/img/auth/facebook.svg"
            /></b-button>
          </div>
        </div>
        <div class="text-center">
          <nuxt-link to="/auth/reset-password">Quên mật khẩu?</nuxt-link>
        </div>
        <div class="text-center">
          <nuxt-link to="/auth/register">Đăng ký</nuxt-link>
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
import BaseAuth from '~/components/base/BaseAuth.vue'
export default {
  layout: 'bodyOnly',
  extends: BaseAuth,
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
  mounted() {
    if (this.$auth.loggedIn) {
      this.$router.push({ path: '/' })
    }

    let query = this.$route.query
    if (query.access_token && query.refresh_token) {
      this.loginWithToken(query.access_token, query.refresh_token)
    } else if (query.error) {
      alert(query.error)
    }
  },
  methods: {
    loginWithGoogle() {
      window.location.href = this.$config.googleLoginUrl
    },
    loginWithFacebook() {
      window.location.href = this.$config.facebookLoginUrl
    },
    async login() {
      this.toggleProcessing()
      const responsePromise = this.$auth
        .loginWith('local', { data: this.form })
        .then((res) => {
          this.log(res.data)
        })
        .finally(() => this.toggleProcessing())
      this.axiosLoadError(responsePromise)
    },
    loginWithToken(access_token, refresh_token) {
      this.log('loginWithToken: ', access_token, refresh_token)
      this.$auth
        .setStrategy('local')
        .then(() =>
          this.$auth
            .setUserToken(access_token, refresh_token)
            .then(() => this.$router.push({ path: '/' }))
        )
    },
  },
}
</script>

<style></style>
