export const state = () => ({
  // Loading
  busy: false
})

export const mutations = {
  // Loading
  END_BUSY_STATE(state) {
    state.busy = false
  },
  START_BUSY_STATE(state) {
    state.busy = true
  }
}

export const actions = {
  // Loading
  stopBusyState({ commit }) {
    commit('END_BUSY_STATE')
  },
  triggerBusyState({ commit }) {
    commit('START_BUSY_STATE')
  }
}
