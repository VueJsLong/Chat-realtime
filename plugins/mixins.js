import Vue from 'vue'

// Make sure to pick a unique name for the flag
// so it won't conflict with any other mixin.
if (!Vue.__my_mixin__) {
  Vue.__my_mixin__ = true

  Vue.mixin({
    methods: {
      axiosLoadError(p) {
        p.catch((error) => {
          if (error.response) {
            alert(error.response.data?.messages)
          } else if (error.request) {
            alert(error.request)
          } else {
            alert(error.message)
          }
        })
      },
      logger(...args) {
        console.log(...args)
      },
      goBack() {
        if (window) {
          window.history.back()
        }
      },
    },
  })
}
