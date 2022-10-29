import Vue from 'vue'

const api = {
  findUser: '/users/find',
  conversation: '/messages/conversations',
  getFriends: '/friends',
}

export default ({ app }, inject) => {
  inject('api', Vue.observable(api))
}
