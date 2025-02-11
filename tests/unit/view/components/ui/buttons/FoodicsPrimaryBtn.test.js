import { shallowMount } from '@vue/test-utils'
import FoodicsPrimaryBtn from '@/View/components/ui/buttons/FoodicsPrimaryBtn.vue'

describe('FoodicsPrimaryBtn.vue', () => {
  let wrapper
  const mockOnClick = jest.fn()

  beforeEach(() => {
    wrapper = shallowMount(FoodicsPrimaryBtn, {
      propsData: {
        onClick: mockOnClick
      },
      slots: {
        default: 'Test Button'
      }
    })
    jest.clearAllMocks()
  })

  it('renders with correct classes', () => {
    const button = wrapper.find('button')
    expect(button.classes()).toContain('btn')
    expect(button.classes()).toContain('btn-primary')
    expect(button.classes()).toContain('w-100')
  })

  it('renders slot content correctly', () => {
    expect(wrapper.text()).toBe('Test Button')
  })

  it('calls onClick handler when clicked', async () => {
    await wrapper.find('button').trigger('click')
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('renders different slot contents', () => {
    const buttonWithIcon = shallowMount(FoodicsPrimaryBtn, {
      propsData: {
        onClick: mockOnClick
      },
      slots: {
        default: '<i class="bi bi-plus"></i> Add Item'
      }
    })
    expect(buttonWithIcon.html()).toContain('Add Item')
  })

  it('handles multiple clicks correctly', async () => {
    const button = wrapper.find('button')
    await button.trigger('click')
    await button.trigger('click')
    await button.trigger('click')
    expect(mockOnClick).toHaveBeenCalledTimes(3)
  })
})