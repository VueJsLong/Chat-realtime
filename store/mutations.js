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
  resetStore(state) {},
}
export default mutations
