const defaultState = {
  isLoading: false,
  language: '',
  socket: null,
  userConversations: [],
  groupConversations: [],
  conversation: null,
  chatMessages: [],
  requests: [],
  friends: [],
  modal: {
    isShow: false,
    title: null,
    description: null,
    callback: async () => {},
    primaryButton: {
      title: null,
    },
    secondaryButton: {
      title: null,
    },
  },
  typing: {},
}

export default defaultState
