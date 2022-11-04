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
    vuexContext.commit('setRequests', payload)
  },
  setFriends(vuexContext, payload) {
    vuexContext.commit('setFriends', payload)
  },
}
export default actions
