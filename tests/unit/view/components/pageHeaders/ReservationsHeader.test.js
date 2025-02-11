import { shallowMount } from '@vue/test-utils'
import ReservationsHeader from '@/View/components/PageHeaders/ReservationsHeader.vue'

describe('ReservationsHeader.vue', () => {
  const createWrapper = () => {
    return shallowMount(ReservationsHeader, {
      propsData: {
        handleClickAddBranchBtn: jest.fn(),
        handleClickDisableReservationsBtn: jest.fn()
      },
      mocks: {
        $t: (key) => key // Mock translation function
      }
    })
  }

  it('renders the header title correctly', () => {
    const wrapper = createWrapper()
    const title = wrapper.find('h2')
    expect(title.text()).toBe('reservations')
  })

  it('renders both action buttons', () => {
    const wrapper = createWrapper()
    const primaryBtn = wrapper.findComponent({ name: 'FoodicsPrimaryBtn' })
    const secondaryBtn = wrapper.findComponent({ name: 'FoodicsSecondaryBtn' })
    
    expect(primaryBtn.exists()).toBe(true)
    expect(secondaryBtn.exists()).toBe(true)
  })

  it('passes correct props to buttons', () => {
    const wrapper = createWrapper()
    const primaryBtn = wrapper.findComponent({ name: 'FoodicsPrimaryBtn' })
    const secondaryBtn = wrapper.findComponent({ name: 'FoodicsSecondaryBtn' })
    
    expect(primaryBtn.props('onClick')).toBeDefined()
    expect(secondaryBtn.props('onClick')).toBeDefined()
  })
})