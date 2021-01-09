import { createStore } from 'vuex'
import { useStorage } from '@vueuse/core'

// Create a new store instance.
export const store = createStore({
  state () {
    return {
      drawnShapes: [],
      storage: {}
    }
  },

  getters: {
    previousShapes (state) {
      return localStorage.getItem('drawn-shapes')
    }
  },

  mutations: {
    saveDrawnShapes (state, drawnShapes) {
      state.drawnShapes.push(drawnShapes)
      store.storage = useStorage('drawn-shapes', drawnShapes)
      console.log("STORRAGEEE "+ state.drawnShapes)
    },
    
    updateDrawnShapes (key, drawnShapes) {
      let name = 'drawn-shapes'
      var existing = localStorage.getItem(name)
      console.log("EXISTING "+ existing)
      existing = existing ? JSON.parse(existing) : {};
      existing[key] = drawnShapes;

      localStorage.setItem(name, JSON.stringify(existing));
    }
  },
  actions: {
    saveDrawnShapes (context, drawnShapes) {
      context.commit('saveDrawnShapes', drawnShapes)
    }
  }
})