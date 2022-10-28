import defaultState from './default.state'

const mutations = {
  setLoading(state, isLoading) {
    state.isLoading = isLoading
  },
  setLanguage(state, language) {
    state.language = language
  },
  setSocket(state, socket) {
    state.socket = socket
  },
  setUserConversations(state, payload) {
    state.userConversations = payload
  },
  setGroupConversations(state, payload) {
    state.groupConversations = payload
  },
  setConversation(state, payload) {
    state.conversation = payload
  },
  setChatMessages(state, payload) {
    state.chatMessages = payload
  },
  resetStore(state) {
    state = { ...defaultState }
  },
}
export default mutations
