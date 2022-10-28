const getters = {
  getLoading(state) {
    return state.isLoading
  },
  getLanguage(state) {
    return state.language
  },
  getSocket(state) {
    return state.socket
  },
  getConversation(state) {
    return state.conversation
  },
}

export default getters
