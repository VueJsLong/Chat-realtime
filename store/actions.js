const actions = {
  setLoading(vuexContext, isLoading) {
    vuexContext.commit('setLoading', isLoading)
  },
  setLanguage(vuexContext, language) {
    vuexContext.commit('setLanguage', language)
    vuexContext.commit('resetStore')
  },
}
export default actions
