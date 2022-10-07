import Vue from 'vue'

// Make sure to pick a unique name for the flag
// so it won't conflict with any other mixin.
if (!Vue.__my_mixin__) {
  Vue.__my_mixin__ = true

  Vue.mixin({
    data() {
      return {
        isProcessing: false,
      }
    },
    methods: {
      toggleProcessing() {
        this.isProcessing = !this.isProcessing
      },
      setProcessing(newState) {
        this.isProcessing = newState
      },
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
