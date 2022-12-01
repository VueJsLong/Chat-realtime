const actions = {
  setLoading(vuexContext, isLoading) {
    vuexContext.commit('setLoading', isLoading)
  },
  setLanguage(vuexContext, language) {
    vuexContext.commit('setLanguage', language)
    vuexContext.commit('resetStore')
  },
  resetStore(vuexContext) {
    vuexContext.commit('resetStore')
  },
  setSocket(vuexContext, socket) {
    vuexContext.commit('setSocket', socket)
  },
  setUserConversations(vuexContext, payload) {
    vuexContext.commit('setUserConversations', payload)
  },
  setGroupConversations(vuexContext, payload) {
    vuexContext.commit('setGroupConversations', payload)
  },
  setConversation(vuexContext, payload) {
    vuexContext.commit('setConversation', payload)
  },
  setChatMessages(vuexContext, payload) {
    vuexContext.commit('setChatMessages', payload)
  },
  setRequests(vuexContext, payload) {
    if (!payload) payload = []
    vuexContext.commit('setRequests', payload)
  },
  setFriends(vuexContext, payload) {
    if (!payload) payload = []
    vuexContext.commit('setFriends', payload)
  },
  setModal(vuexContext, payload) {
    vuexContext.commit('setModal', payload)
  },
  startTyping(vuexContext, payload) {
    // Khởi tạo cặp dữ liệu
    const pair = {
      key:
        payload?.target == 'USER'
          ? 'USER_' + payload.from
          : 'GROUP_' + payload.to,
      value: [payload],
    }

    // Kiểm tra tồn tại
    const typing = vuexContext.getters.getTyping(pair.key)

    // Nếu chưa tồn tại, tạo mới pair
    if (typing.length == 0) vuexContext.commit('addTyping', pair)
    // Nếu đã tồn tại, thêm pair vào mảng value
    else if (payload?.target == 'GROUP') {
      const foundPair = typing.find((item) => item.from == payload?.from)
      if (!foundPair)
        vuexContext.commit('addTyping', {
          key: pair.key,
          value: [...typing, payload],
        })
    }
  },
  endTyping(vuexContext, payload) {
    const pair = {
      key:
        payload?.target == 'USER'
          ? 'USER_' + payload.from
          : 'GROUP_' + payload.to,
      value: [payload],
    }
    // Nếu là group, xóa pair khỏi mảng value
    const typing = vuexContext.getters.getTyping(pair.key)
    if (payload?.target == 'GROUP') {
      const arrayWithoutPair = typing.filter(
        (item) => item.from != payload?.from
      )
      vuexContext.commit('addTyping', {
        key: pair.key,
        value: arrayWithoutPair,
      })
    } else vuexContext.commit('removeTyping', pair)
  },
}
export default actions
