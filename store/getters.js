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
}

export default getters
