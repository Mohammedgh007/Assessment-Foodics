import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import languageModule from '@/infrastructure/vuex/modules/language'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Language Module', () => {
  let store

  beforeEach(() => {
    // Create a fresh store instance for each test
    store = new Vuex.Store({
      modules: {
        language: languageModule
      }
    })
  })

  // Move getters test first to ensure we're testing initial state
  describe('getters', () => {
    it('should return current language', () => {
      expect(store.getters.currentLanguage).toBe('en')
    })
  })

  describe('mutations', () => {
    it('should set the language correctly', () => {
      // Initial state should be 'en'
      expect(store.state.language.currentLanguage).toBe('en')

      // Test changing language
      store.commit('SET_LANGUAGE', 'ar')
      expect(store.state.language.currentLanguage).toBe('ar')
    })
  })

  describe('actions', () => {
    it('should change language through action', () => {
      store.dispatch('changeLanguage', 'ar')
      expect(store.state.language.currentLanguage).toBe('ar')
    })
  })
})