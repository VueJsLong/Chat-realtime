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
  setRequests(state, payload) {
    state.requests = payload
  },
  setFriends(state, payload) {
    state.friends = payload
  },
  setModal(state, payload) {
    state.modal = payload
  },
  addTyping(state, payload) {
    state.typing[payload.key] = payload.value
    const newTyping = { ...state.typing }
    state.typing = newTyping
  },
  removeTyping(state, payload) {
    delete state.typing[payload.key]
    const newTyping = { ...state.typing }
    state.typing = newTyping
  },
  setEvent(state, payload) {
    state.event = payload
  },
  resetStore(state) {
    state = { ...defaultState }
  },
}
export default mutations
