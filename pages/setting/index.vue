<template>
  <div class="toolbar">
    <div class="recents">
      <div class="option">
        <p>Setting</p>
        <!-- <ul>
          <li class="option-click">
            <img src="/img/option.png" alt="" />
            <ul class="menu">
              <li><a href="/">Cài đặt</a></li>
              <li><a href="/">Tùy chọn</a></li>
              <li><a href="/">Xóa</a></li>
            </ul>
          </li>
        </ul> -->
      </div>
      <div class="recent-contacts scroll-y">
        <!-- <div
          class="item"
          :class="{ active: isActiveConversation(item.targetId, 'USER') }"
          v-for="item in userConversations"
          :key="item.id"
          @click="setConversation(item)"
        >
          <img
            :src="item.targetThumbnail"
            alt=""
            referrerpolicy="no-referrer"
          />
          <div class="content">
            <div class="friends">{{ item.targetName }}</div>
            <div class="preview-message --text-ellipsis">
              {{ item.content }}
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style></style>
