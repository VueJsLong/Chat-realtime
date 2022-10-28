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
  getUserConversations(state) {
    return state.userConversations
  },
  getGroupConversations(state) {
    return state.groupConversations
  },
  getChatMessages(state) {
    return state.chatMessages
  },
}

export default getters
