import Vue from 'vue'

const api = {
  findUser: '/users/find',
}

export default ({ app }, inject) => {
  inject('api', Vue.observable(api))
}
