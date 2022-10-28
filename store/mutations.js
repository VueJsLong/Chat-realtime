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
  setConversation(state, conversation) {
    state.conversation = conversation
  },
  resetStore(state) {
    state = { ...defaultState }
  },
}
export default mutations
