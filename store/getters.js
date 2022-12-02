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
  getRequests(state) {
    return state.requests
  },
  getFriends(state) {
    return state.friends
  },
  getModal(state) {
    return state.modal
  },
  getTyping:
    (state) =>
    (key = null) => {
      // Nếu truyền vào key, trả về value của key
      if (key) return state.typing[key] || []

      // Nếu không truyền vào key, trả về value của conversation hiện tại
      const conversation = state.conversation
      key =
        conversation?.target == 'USER'
          ? 'USER_' + conversation?.targetId
          : 'GROUP_' + conversation?.targetId
      return state.typing[key] || []
    },
  getAllTyping(state) {
    return state.typing
  },
  getEvent(state) {
    return state.event
  },
}

export default getters
