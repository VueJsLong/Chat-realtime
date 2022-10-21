<template>
  <div id="app">
    <div id="contact-area">
      <ul class="contacts">
        <li data-id="1" data-target="USER">User 1</li>
        <li data-id="2" data-target="USER">User 2</li>
        <li data-id="3" data-target="USER">User 3</li>
      </ul>
      <ul class="contacts">
        <li data-id="1" data-target="GROUP">Group 1</li>
        <li data-id="2" data-target="GROUP">Group 2</li>
      </ul>
    </div>
    <div id="message-area">
      <ul id="messages"></ul>
      <form id="form" action="">
        <input id="input" autocomplete="off" /><button>Send</button>
      </form>
    </div>
  </div>
</template>

<script>
import BasePageVue from '~/components/BasePage.vue'
export default {
  name: 'test',
  extends: BasePageVue,
  data() {
    return {}
  },
  mounted() {
    var _this = this
    _this.socket = this.$nuxtSocket({
      name: 'main', // select "main" socket from nuxt.config.js - we could also skip this because "main" is the default socket
    })
    this.log('Console log thông qua this.log', _this.socket)

    //
    let userId = prompt('Chọn userId từ 1-3 thay cho login', 0)

    var form = document.getElementById('form')
    var input = document.getElementById('input')

    // send typing event
    input.addEventListener('keyup', function (e) {
      const activeContact = document.querySelector('.contacts>li.active')
      const payload = {
        from: userId,
        to: activeContact.dataset.id,
        target: activeContact.dataset.target,
      }
      if (input.value) {
        _this.socket.emit(_this.$socketEvent.chat.typingStart, payload)
      } else {
        _this.socket.emit(_this.$socketEvent.chat.typingEnd, payload)
      }
    })

    // send messages
    form.addEventListener('submit', function (e) {
      e.preventDefault()
      if (input.value) {
        const activeContact = document.querySelector('.contacts>li.active')
        const payload = {
          from: userId,
          to: activeContact.dataset.id,
          msg: input.value,
          target: activeContact.dataset.target,
        }
        _this.socket.emit(_this.$socketEvent.chat.sendMessages, payload)

        // side effect
        input.value = ''
        displayMessages(payload.msg, 'host')
      }
    })

    // Socket event listener
    _this.socket.on('connect', () => {
      // displayMessages(`Your socketID: ${_this.socket.id}`)
      _this.socket.emit(_this.$socketEvent.account.login, userId)
    })

    _this.socket.on(_this.$socketEvent.chat.typingStart, function (payload) {
      let typingContact = null
      if (payload.target == 'USER')
        typingContact = document.querySelector(
          `.contacts>li[data-id="${payload.from}"][data-target="${payload.target}"]`
        )
      else
        typingContact = document.querySelector(
          `.contacts>li[data-id="${payload.to}"][data-target="${payload.target}"]`
        )
      typingContact.classList.add('typing')
    })
    _this.socket.on(_this.$socketEvent.chat.typingEnd, function (payload) {
      let typingContact = null
      if (payload.target == 'USER')
        typingContact = document.querySelector(
          `.contacts>li[data-id="${payload.from}"][data-target="${payload.target}"]`
        )
      else
        typingContact = document.querySelector(
          `.contacts>li[data-id="${payload.to}"][data-target="${payload.target}"]`
        )
      typingContact.classList.remove('typing')
    })

    _this.socket.on(
      _this.$socketEvent.chat.receiveMessages,
      function (payload) {
        if (isMessagesCanDisplay(payload)) displayMessages(payload.msg, 'guest')
      }
    )

    function isMessagesCanDisplay(payload) {
      const activeContact = document.querySelector('.contacts>li.active')
      if (payload.from == userId) return false
      if (payload.target == 'USER') {
        if (
          activeContact.dataset.id != payload.from ||
          activeContact.dataset.target != payload.target
        )
          return false
      } else {
        if (
          activeContact.dataset.id != payload.to ||
          activeContact.dataset.target != payload.target
        )
          return false
      }

      return true
    }

    // UI code
    const cloudContact = document.querySelector(
      `.contacts>li[data-id="${userId}"][data-target="USER"]`
    )
    cloudContact.textContent = `Cloud ${userId}`
    cloudContact.classList.add('active')

    let contacts = document.querySelectorAll('.contacts>li')
    Array.from(contacts).forEach((contact) => {
      contact.onclick = () => {
        const activeContact = document.querySelector('.contacts>li.active')
        activeContact.classList.remove('active')
        contact.classList.add('active')

        changeContact()
      }
    })

    function changeContact() {
      const messagesBox = document.getElementById('messages')
      messagesBox.innerHTML = ''

      // fetch messages
      const activeContact = document.querySelector('.contacts>li.active')

      const payload = {
        from: userId,
        to: activeContact.dataset.id,
        target: activeContact.dataset.target,
      }

      fetch(process.env.apiUrl + '/messages', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => displayConversation(data.payload))
    }

    function displayConversation(msgs) {
      msgs.forEach((msg) => {
        if (msg.from == userId) displayMessages(msg.content, 'host')
        else displayMessages(msg.content, 'guest')
      })
    }

    function displayMessages(msg, agent = 'host') {
      var item = document.createElement('li')
      item.classList.add(agent)
      item.textContent = msg
      messages.appendChild(item)
      window.scrollTo(0, document.body.scrollHeight)
    }
  },
}
</script>
