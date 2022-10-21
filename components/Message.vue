<template>
  <div class="chat-content__message host">
    <img
      class="chat-message__thumbnail"
      src="/img/Ellipse 2.png"
      alt="thumbnail"
    />
    <span class="chat-message__content"
      >msg Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum dolor
      velit voluptas cupiditate, maxime dignissimos? Voluptates repellendus
      eligendi inventore, ipsa vel ipsum nobis ipsam repellat illo debitis
      incidunt! Ex, fugiat.
      <div class="chat-message__context-menu">
        <div class="chat-context-menu__item">
          <button class="m-icon-btn">
            <i class="fi fi-rr-undo"></i>
          </button>
          <span class="context-menu-item__tooltip">Trả lời</span>
        </div>
        <div class="chat-context-menu__item">
          <button class="m-icon-btn">
            <i class="fi fi-rs-inbox-out"></i>
          </button>
          <span class="context-menu-item__tooltip">Chuyển tiếp</span>
        </div>
        <div class="chat-context-menu__item">
          <button class="m-icon-btn">
            <i class="fi fi-rr-menu-dots-vertical"></i>
          </button>
          <span class="context-menu-item__tooltip">Xem thêm</span>
          <div class="chat-context-menu__child-item">
            <div class="chat-context-menu__item">
              <button class="m-icon-btn">
                <i class="fi fi-rr-world"></i>
              </button>
              <span class="context-menu-item__tooltip">Dịch</span>
            </div>
            <div class="chat-context-menu__item">
              <button class="m-icon-btn">
                <i class="fi fi-rr-trash"></i>
              </button>
              <span class="context-menu-item__tooltip">Thu hồi</span>
            </div>
          </div>
        </div>
      </div>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Message',
  data() {
    return {}
  },
  computed: {},
}
</script>

<style></style>
