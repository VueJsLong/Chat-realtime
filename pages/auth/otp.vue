<template>
  <div id="otp-page" class="page-middle-form">
    <section class="form-section">
      <div class="otp-container">
        <h1>Please check mail box to get OTP</h1>
        <div class="userInput">
          <div>
            <input
              type="number"
              v-model="otpDigit1"
              class="otp-digit-1"
              maxlength="1"
              @keyup="(e) => nextDigit(e, 1)"
              autofocus
            />
            <input
              type="number"
              v-model="otpDigit2"
              class="otp-digit-2"
              maxlength="1"
              @keyup="(e) => nextDigit(e, 2)"
            />
            <input
              type="number"
              v-model="otpDigit3"
              class="otp-digit-3"
              maxlength="1"
              @keyup="(e) => nextDigit(e, 3)"
            />
          </div>
          <h1>-</h1>
          <div>
            <input
              type="number"
              v-model="otpDigit4"
              class="otp-digit-4"
              maxlength="1"
              @keyup="(e) => nextDigit(e, 4)"
            />
            <input
              type="number"
              v-model="otpDigit5"
              class="otp-digit-5"
              maxlength="1"
              @keyup="(e) => nextDigit(e, 5)"
            />
            <input
              type="number"
              v-model="otpDigit6"
              class="otp-digit-6"
              maxlength="1"
              @keyup="(e) => nextDigit(e, 6)"
            />
          </div>
        </div>
        <div class="text-center">
          <a href="#" @click.prevent="reSendOTP"
            >Hasn't received otp yet? Receive again.</a
          >
        </div>
        <div class="text-center">
          <a href="#" @click.prevent="goBack">Go back</a>
        </div>
        <b-button class="otp-submit-button" variant="primary" @click="submitOtp"
          >Send OTP</b-button
        >
      </div>
    </section>
  </div>
</template>

<script>
export default {
  auth: 'guest',
  layout: 'bodyOnly',
  data() {
    return {
      otpDigit1: null,
      otpDigit2: null,
      otpDigit3: null,
      otpDigit4: null,
      otpDigit5: null,
      otpDigit6: null,
    }
  },
  methods: {
    nextDigit(event, current) {
      console.log(event)
      if (!Number(event.key) && Number(event.key) != 0) return
      this[`otpDigit${current}`] = event.key
      if (current < 6) {
        $(`.otp-digit-${++current}`).focus()
      } else {
        $(`.otp-submit-button`).focus()
      }
    },
    submitOtp() {},
    reSendOTP() {},
  },
}
</script>

<style scoped></style>
