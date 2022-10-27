import Vue from 'vue'

// Make sure to pick a unique name for the flag
// so it won't conflict with any other mixin.
if (!Vue.__my_mixin__) {
  Vue.__my_mixin__ = true

  Vue.mixin({
    methods: {
      axiosLoadError(p, callback = () => {}) {
        p.catch((error) => {
          if (error.response) {
            alert(error.response.data?.messages)
          } else if (error.request) {
            alert(error.request)
          } else {
            alert(error.message)
          }
          callback()
        })
      },
      log(...args) {
        console.log(...args)
      },
      warn(...args) {
        console.log(...args)
      },
      error(...args) {
        console.error(...args)
      },
      debug(...args) {
        console.debug(...args)
      },
      goBack() {
        if (window) {
          window.history.back()
        }
      },
    },
  })
}
