<template>
  <div class="toolbar">
    <search-box></search-box>
    <div class="groups">
      <div class="option">
        <p>Request</p>
        <ul>
          <li class="option-click">
            <div>
              <img src="/img/option.png" alt="" />
              <ul class="menu">
                <li><a href="/">Cài đặt</a></li>
                <li><a href="/">Tùy chọn</a></li>
                <li><a href="/">Xóa</a></li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div class="group-contacts ctm-scroll-y">
        <div class="item">
          <img src="/img/Ellipse 2.png" alt="" />
          <div class="content">
            <div class="friends">Friends Name 1</div>
            <div>Hi Guys, Wassup!</div>
          </div>
        </div>
        <div class="item">
          <img src="/img/Ellipse 2.png" alt="" />
          <div class="content">
            <div class="friends">Friends Name 1</div>
            <div>Hi Guys, Wassup!</div>
          </div>
        </div>
        <div class="item">
          <img src="/img/Ellipse 2.png" alt="" />
          <div class="content">
            <div class="friends">Friends Name 1</div>
            <div>Hi Guys, Wassup!</div>
          </div>
        </div>
        <div class="item">
          <img src="/img/Ellipse 2.png" alt="" />
          <div class="content">
            <div class="friends">Friends Name 1</div>
            <div>Hi Guys, Wassup!</div>
          </div>
        </div>
        <div class="item">
          <img src="/img/Ellipse 2.png" alt="" />
          <div class="content">
            <div class="friends">Friends Name 1</div>
            <div>Hi Guys, Wassup!</div>
          </div>
        </div>
        <div class="item">
          <img src="/img/Ellipse 2.png" alt="" />
          <div class="content">
            <div class="friends">Friends Name 1</div>
            <div>Hi Guys, Wassup!</div>
          </div>
        </div>
        <div class="item">
          <img src="/img/Ellipse 2.png" alt="" />
          <div class="content">
            <div class="friends">Friends Name 1</div>
            <div>Hi Guys, Wassup!</div>
          </div>
        </div>
        <div class="item">
          <img src="/img/Ellipse 2.png" alt="" />
          <div class="content">
            <div class="friends">Friends Name 1</div>
            <div>Hi Guys, Wassup!</div>
          </div>
        </div>
        <div class="item">
          <img src="/img/Ellipse 2.png" alt="" />
          <div class="content">
            <div class="friends">Friends Name 1</div>
            <div>Hi Guys, Wassup!</div>
          </div>
        </div>
        <div class="item">
          <img src="/img/Ellipse 2.png" alt="" />
          <div class="content">
            <div class="friends">Friends Name 2</div>
            <div>Hi Guys, Wassup!</div>
          </div>
        </div>
        <div class="item">
          <img src="/img/Ellipse 2.png" alt="" />
          <div class="content">
            <div class="friends">Friends Name 3</div>
            <div>Hi Guys, Wassup!</div>
          </div>
        </div>
      </div>
    </div>
    <div class="recents">
      <div class="option">
        <p>My friend</p>
        <ul>
          <li class="option-click">
            <img src="/img/option.png" alt="" />
            <ul class="menu">
              <li><a href="/">Cài đặt</a></li>
              <li><a href="/">Tùy chọn</a></li>
              <li><a href="/">Xóa</a></li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="recent-contacts ctm-scroll-y">
        <div class="item">
          <img src="/img/Ellipse 2.png" alt="" />
          <div class="content">
            <div class="friends">Friends Reunion</div>
            <div>Hi Guys, Wassup!</div>
          </div>
        </div>
        <div class="item">
          <img src="/img/Ellipse 2.png" alt="" />
          <div class="content">
            <div class="friends">Friends Reunion</div>
            <div>Hi Guys, Wassup!</div>
          </div>
        </div>
        <div class="item">
          <img src="/img/Ellipse 2.png" alt="" />
          <div class="content">
            <p>Friends Reunion</p>
            <p>Hi Guys, Wassup!</p>
          </div>
        </div>
        <div class="item">
          <img src="/img/Ellipse 2.png" alt="" />
          <div class="content">
            <div class="friends">Friends Reunion</div>
            <div>Hi Guys, Wassup!</div>
          </div>
        </div>
        <div class="item">
          <img src="/img/Ellipse 2.png" alt="" />
          <div class="content">
            <p>Friends Reunion</p>
            <p>Hi Guys, Wassup!</p>
          </div>
        </div>
        <div class="item">
          <img src="/img/Ellipse 2.png" alt="" />
          <div class="content">
            <div class="friends">Friends Reunion</div>
            <div>Hi Guys, Wassup!</div>
          </div>
        </div>
        <div class="item">
          <img src="/img/Ellipse 2.png" alt="" />
          <div class="content">
            <p>Friends Reunion</p>
            <p>Hi Guys, Wassup!</p>
          </div>
        </div>
        <div class="item">
          <img src="/img/Ellipse 2.png" alt="" />
          <div class="content">
            <div class="friends">Friends Reunion</div>
            <div>Hi Guys, Wassup!</div>
          </div>
        </div>
        <div class="item">
          <img src="/img/Ellipse 2.png" alt="" />
          <div class="content">
            <p>Friends Reunion</p>
            <p>Hi Guys, Wassup!</p>
          </div>
        </div>
        <div class="item">
          <img src="/img/Ellipse 2.png" alt="" />
          <div class="content">
            <div class="friends">Friends Reunion</div>
            <div>Hi Guys, Wassup!</div>
          </div>
        </div>
        <div class="item">
          <img src="/img/Ellipse 2.png" alt="" />
          <div class="content">
            <p>Friends Reunion</p>
            <p>Hi Guys, Wassup!</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BasePage from '~/components/BasePage.vue'

export default {
  name: 'ContactPage',
  extends: BasePage,
  layout: 'default',
  mounted() {
    this.debug('Contact-page mounted.............................')
  },
}
</script>

<style></style>
