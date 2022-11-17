export default {
  env: {
    environment: process.env.ENVIRONMENT || 'DEVELOPMENT',
    wsUrl: process.env.NUXT_ENV_WS_URL || 'http://localhost:4000',
    apiUrl: process.env.NUXT_ENV_API_URL || 'http://localhost:4000',
    googleLoginUrl:
      process.env.NUXT_ENV_GOOGLE_LOGIN_URL ||
      'http://localhost:4000/auth/google',
    facebookLoginUrl:
      process.env.NUXT_ENV_FACEBOOK_LOGIN_URL ||
      'http://localhost:4000/auth/facebook',
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Chat_realtime',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '/css/common.css' },
      { rel: 'stylesheet', href: '/css/login-page.css' },
      { rel: 'stylesheet', href: '/css/login-page.css' },
      // { rel: 'stylesheet', href: '/css/setting-page.css' },
      { rel: 'stylesheet', href: '/css/message-page.css' },
      { rel: 'stylesheet', href: '/css/override.css' },
      {
        rel: 'stylesheet',
        href: 'https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css',
      },
      {
        rel: 'stylesheet',
        href: 'https://cdn-uicons.flaticon.com/uicons-regular-straight/css/uicons-regular-straight.css',
      },
    ],
    script: [
      {
        src: '/lib/jquery-3.6.1.min.js',
        type: 'text/javascript',
      },
      {
        src: '/js/main.js',
        type: 'text/javascript',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/mixins',
    '~/plugins/socket.event.js',
    '~/plugins/api.js',
    '~/plugins/vue-snotify',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'nuxt-socket-io',
    'nuxt-vue-multiselect',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.NUXT_ENV_API_URL,
  },

  auth: {
    redirect: {
      login: '/auth/login',
      logout: '/auth/login',
    },
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'data.access_token',
          global: true,
          // required: true,
          // type: 'Bearer'
        },
        refreshToken: {
          property: 'data.refresh_token',
          data: 'refresh_token',
          maxAge: 60 * 60 * 24 * 7,
        },
        user: {
          property: 'data',
          autoFetch: true,
        },
        endpoints: {
          login: {
            url: '/auth/login',
            method: 'post',
          },
          refresh: {
            url: '/auth/refresh',
            method: 'post',
          },
          user: {
            url: '/me/profile',
            method: 'get',
          },
          logout: { url: '/auth/logout', method: 'post' },
        },
        // autoLogout: false
      },
    },
  },

  // socket.io configuration
  io: {
    // we could have multiple sockets that we identify with names
    // one of these sockets may have set "default" to true
    sockets: [
      {
        default: true, // make this the default socket
        name: 'main', // give it a name that we can later use to choose this socket in the .vue file
        url: process.env.NUXT_ENV_WS_URL, // URL wherever your socket IO server runs
      },
    ],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  router: {
    middleware: ['auth'],
    linkActiveClass: 'active',
  },

  loading: '~/components/layout/Loading.vue',
  target: 'static',
}
