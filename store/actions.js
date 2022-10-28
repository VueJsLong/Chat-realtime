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
  setConversation(vuexContext, conversation) {
    vuexContext.commit('setConversation', conversation)
  },
}
export default actions
