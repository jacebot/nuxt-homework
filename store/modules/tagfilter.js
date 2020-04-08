export const state = () => ({
  // tags array for filtering posts
  tags: [],
  filterTags: []
})

export const getters = {
  getTags(state) {
    return state.tags
  },
  getFilterTags(state) {
    return state.filterTags
  }
}

export const mutations = {
  ALL_TAGS(state) {
    state.filterTags = []
  },
  FILTER_TAGS(state, payload) {
    let newTags = [...state.filterTags]

    if (payload === 'all') {
      newTags = []
    } else if (newTags.includes(payload)) {
      newTags = newTags.filter((t) => t !== payload).map((t) => t)
    } else {
      newTags.push(payload)
    }

    return (state.filterTags = newTags)
  },
  SET_TAGS(state, payload) {
    state.tags = [...payload]
  }
}

export const actions = {
  allTags({ commit }) {
    commit('ALL_TAGS')
  },
  setFilterTags({ commit }, payload) {
    commit('FILTER_TAGS', payload)
  },
  setTags({ commit }, payload) {
    commit('SET_TAGS', payload)
  }
}
