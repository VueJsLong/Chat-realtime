<template>
  <div class="emoji-container relative inline-block">
    <emoji-picker @emoji="insert" :search="search">
      <div
        class="absolute pin-t pin-r cursor-pointer emoji-invoker outline-none"
        slot="emoji-invoker"
        slot-scope="{ events: { click: clickEvent } }"
        @click.stop="clickEvent"
      >
        <button class="m-icon-btn" title="send emoji">
          <i class="fi fi-rr-smile"></i>
        </button>
      </div>
      <div
        class="emoji-picker"
        slot="emoji-picker"
        slot-scope="{ emojis, insert }"
      >
        <div
          class="absolute z-10 border w-64 h-96 overflow-scroll py-4 px-2 rounded bg-white shadow t-4 -r-64"
        >
          <div class="flex">
            <input
              class="rounded-4 border py-2 px-4 outline-none focus:shadow-outline w-100"
              type="text"
              v-model="search"
              placeholder="Search"
              v-focus
            />
          </div>
          <div>
            <div v-for="(emojiGroup, category) in emojis" :key="category">
              <h5
                class="text-grey-darker uppercase text-sm cursor-default mb-2 mt-4"
              >
                {{ category }}
              </h5>
              <div class="flex flex-wrap justify-between emojis">
                <button
                  class="p-1 cursor-pointer rounded hover:bg-grey-light focus:outline-none focus:shadow-outline flex items-center justify-center h-6 w-6"
                  v-for="(emoji, emojiName) in emojiGroup"
                  :key="emojiName"
                  @click="insert(emoji)"
                  :title="emojiName"
                >
                  {{ emoji }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </emoji-picker>
  </div>
</template>

<script>
import EmojiPicker from 'vue-emoji-picker'
export default {
  components: { EmojiPicker },
  data() {
    return {
      input: '',
      search: '',
    }
  },
  methods: {
    insert(emoji) {
      this.input += emoji
      this.$emit('input', emoji)
    },
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus()
      },
    },
  },
}
</script>

<style></style>
