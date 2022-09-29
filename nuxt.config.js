export default {
  env: {
    wsUrl: process.env.WS_URL || 'http://localhost:4000',
    apiUrl: process.env.API_URL || 'http://localhost:4000',
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
      { rel: 'stylesheet', href: '/css/style.css' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/mixins', '~/plugins/socket.event.js'],

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
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.API_URL,
  },

  auth: {
    redirect: {
      login: '/auth/login',
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
          property: 'data.username',
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
            url: '/auth/profile',
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
        url: process.env.WS_URL, // URL wherever your socket IO server runs
      },
    ],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  router: {
    middleware: ['auth'],
  },
}
