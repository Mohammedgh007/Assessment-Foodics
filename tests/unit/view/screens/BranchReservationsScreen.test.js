import { shallowMount } from '@vue/test-utils'
import BranchReservationsScreen from '@/View/screens/BranchReservationsScreen.vue'
import BranchReservationsLayout from '@/View/layouts/BranchReservationsLayout.vue'

describe('BranchReservationsScreen.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(BranchReservationsScreen, {
      stubs: {
        BranchReservationsLayout: true
      }
    })
  })

  it('renders BranchReservationsLayout component', () => {
    expect(wrapper.findComponent(BranchReservationsLayout).exists()).toBe(true)
  })

  it('passes required props to BranchReservationsLayout', () => {
    const layout = wrapper.findComponent(BranchReservationsLayout)
    expect(layout.props()).toHaveProperty('getBranches')
    expect(layout.props()).toHaveProperty('addReservations')
    expect(layout.props()).toHaveProperty('removeReservations')
    expect(layout.props()).toHaveProperty('submitReservationSettings')
  })

  it('provides functions as props', () => {
    const layout = wrapper.findComponent(BranchReservationsLayout)
    expect(typeof layout.props('getBranches')).toBe('function')
    expect(typeof layout.props('addReservations')).toBe('function')
    expect(typeof layout.props('removeReservations')).toBe('function')
    expect(typeof layout.props('submitReservationSettings')).toBe('function')
  })
})