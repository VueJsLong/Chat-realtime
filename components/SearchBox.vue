<template>
  <div class="search">
    <input
      type="text"
      class="search-input"
      v-model="searchInput"
      placeholder="Tìm kiếm"
      @keyup.enter="search"
      @focus="isFocus = true"
      @blur="isFocus = false"
    />
    <button
      class="search-btn m-icon-btn"
      @click="search"
      @focus="isFocus = true"
      @blur="isFocus = false"
    >
      <i class="fi fi-rr-search input-search-icon"></i>
    </button>

    <div
      class="search-result-container"
      @mouseover="isMouseOver = true"
      @mouseleave="isMouseOver = false"
      v-if="isFocus | isMouseOver"
    >
      <div class="search-data" v-if="searchResult">
        <div class="search-user__thumbnail">
          <img :src="thumbnail" alt="" />
        </div>
        <div class="search-user__fullName">{{ searchResult.fullName }}</div>
        <div class="search-user__addFriendBtn">
          <button
            type="button"
            class="m-btn m-btn-sm m-btn-with-icon primary-btn"
            @click="sendRequestFriend"
          >
            <i class="btn-icon fi fi-rr-user-add"></i>
            Kết bạn
          </button>
        </div>
      </div>
      <div class="search-data" v-else>
        <div class="search-message">Không tìm thấy người dùng.</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchBox',
  data() {
    return {
      searchInput: '18020847@vnu.edu.vn',
      searchResult: null,
      isFocus: false,
      isMouseOver: false,
    }
  },
  mounted() {},
  computed: {
    thumbnail() {
      return this.searchResult.thumbnail
        ? this.searchResult.thumbnail
        : '/img/thumbnail-placeholder.jpg'
    },
  },
  methods: {
    search() {
      this.isFocus = true
      this.searchResult = null
      this.searchInput = String(this.searchInput).trim()
      if (!this.searchInput) return
      this.$axios
        .get(this.$api.findUser, {
          params: {
            email: this.searchInput,
          },
        })
        .then((res) => {
          this.searchResult = res.data.data
        })
        .catch()
    },
    sendRequestFriend() {
      this.log(this.searchResult)
    },
  },
}
</script>

<style></style>
