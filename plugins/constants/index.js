import Vue from 'vue'

import { paging } from './paging'
import {
  userStatus,
  messagesStatus,
  messagesType,
  messagesTarget,
  friendStatus,
} from './status'
import { gender } from '../enums/gender'
import { ADMIN_ID } from './admin'

const constants = {
  paging,
  userStatus,
  messagesStatus,
  messagesType,
  messagesTarget,
  friendStatus,
  gender,
  ADMIN_ID,
}

export default ({ app }, inject) => {
  inject('constants', Vue.observable(constants))
}
