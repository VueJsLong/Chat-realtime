import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import {
  required,
  email,
  numeric,
  between,
  min,
  max,
} from 'vee-validate/dist/rules'
import { localize } from 'vee-validate'
import vi from 'vee-validate/dist/locale/vi.json'
import en from 'vee-validate/dist/locale/en.json'

// Install required rule.
extend('required', required)

// Install email rule.
extend('email', email)

// Install between rule.
extend('between', between)

// Install numeric rule.
extend('numeric', numeric)

// Install numeric rule.
extend('min', min)

// Install numeric rule.
extend('max', max)

//localization
localize({
  vi: {
    messages: {
      required: 'Trường này là bắt buộc',
      email: 'Vui lòng nhập đúng định dạng email',
      numeric: 'Trường này phải là chữ số',
      min: 'Trường này phải lớn hơn 10 ký tự',
      max: 'Trường này phải nhỏ hơn 12 ký tự',
    },
  },
  en: {
    messages: {
      required: 'This field is required',
      email: 'Please enter the correct email format',
      numeric: 'This field must be number',
      min: 'This field must be more than 10 character',
      max: 'This field must be less than 12 character',
    },
  },
})

let LOCALE = 'vi'

// A simple get/set interface to manage our locale in components.
// This is not reactive, so don't create any computed properties/watchers off it.
Object.defineProperty(Vue.prototype, 'locale', {
  get() {
    return LOCALE
  },
  set(val) {
    LOCALE = val
    localize(LOCALE)
  },
})

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
