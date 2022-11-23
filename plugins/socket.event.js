import Vue from 'vue'

const socketEvent = {
  account: {
    login: 'LOGIN',
  },
  chat: {
    typingStart: 'TYPING_START',
    typingEnd: 'TYPING_END',
    sendMessages: 'SEND_MESSAGES',
    receiveMessages: 'RECEIVE_MESSAGES',
  },
  friend: {
    online: 'ONLINE',
    offline: 'OFFLINE',
    requestFriend: 'REQUEST_FRIEND',
    acceptFriend: 'ACCEPT_FRIEND',
    removeFriend: 'REMOVE_FRIEND',
  },
  group: {
    create: 'CREATE_GROUP',
    addMember: 'ADD_MEMBER',
    removeMember: 'REMOVE_MEMBER',
    removeGroup: 'REMOVE_GROUP',
  },
  error: 'ERROR',
}

export default ({ app }, inject) => {
  inject('socketEvent', Vue.observable(socketEvent))
}
