import Vue from 'vue'

const api = {
  findUser: '/users/find',
  conversation: '/messages/conversations',
}

export default ({ app }, inject) => {
  inject('api', Vue.observable(api))
}
