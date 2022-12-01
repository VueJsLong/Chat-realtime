<template>
  <div class="message-container">
    <div class="message guest">
      <img
        class="chat-message__thumbnail m-thumbnail"
        :src="thumbnail(data?.thumbnail)"
        alt=""
        referrerpolicy="no-referrer"
      />
      <span class="chat-message__content">
        <div class="content-container">
          <p class="main-message">
            <svg
              version="1.1"
              id="L5"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 80 80"
              enable-background="new 0 0 0 0"
              xml:space="preserve"
            >
              <circle fill="#fff" stroke="none" cx="3" cy="44" r="10">
                <animateTransform
                  attributeName="transform"
                  dur="1.2s"
                  type="translate"
                  values="0 30 ; 0 -30; 0 30"
                  repeatCount="indefinite"
                  begin="0.1"
                />
              </circle>
              <circle fill="#fff" stroke="none" cx="40" cy="44" r="10">
                <animateTransform
                  attributeName="transform"
                  dur="1.2s"
                  type="translate"
                  values="0 30 ; 0 -30; 0 30"
                  repeatCount="indefinite"
                  begin="0.3"
                />
              </circle>
              <circle fill="#fff" stroke="none" cx="80" cy="44" r="10">
                <animateTransform
                  attributeName="transform"
                  dur="1.2s"
                  type="translate"
                  values="0 30 ; 0 -30; 0 30"
                  repeatCount="indefinite"
                  begin="0.5"
                />
              </circle>
            </svg>
          </p>
        </div>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatTyping',
  props: {
    data: {
      type: Object,
      required: true,
      default() {
        return {
          from: null,
          to: null,
          target: null,
          fullName: null,
          thumbnail: null,
        }
      },
    },
  },
  computed: {},
}
</script>

<style scoped>
svg {
  width: 40px;
  height: 24px;
  display: inline-block;
}
</style>
