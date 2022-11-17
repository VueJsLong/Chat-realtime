import Vue from 'vue'

import { paging } from './paging'
import {
  userStatus,
  messagesStatus,
  messagesTarget,
  friendStatus,
} from './state'
import { gender } from '../enums/gender'
import { ADMIN_ID } from './admin'

const constants = {
  paging,
  userStatus,
  messagesStatus,
  messagesTarget,
  friendStatus,
  gender,
  ADMIN_ID,
}

export default ({ app }, inject) => {
  inject('constants', Vue.observable(constants))
}
