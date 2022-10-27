import Vue from 'vue'
import Snotify, { SnotifyPosition } from 'vue-snotify'
import 'vue-snotify/styles/material.css'

const options = {
  toast: {
    timeout: 3000,
    showProgressBar: true,
    position: SnotifyPosition.rightBottom,
    closeOnClick: true,
    pauseOnHover: true,
    maxOnScreen: 5,
    maxAtPosition: 5,
    newOnTop: true,
    preventDuplicates: true,
  },
}

Vue.use(Snotify, options)
