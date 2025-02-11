import { shallowMount } from '@vue/test-utils'
import FoodicsSecondaryBtn from '@/View/components/ui/buttons/FoodicsSecondaryBtn.vue'

describe('FoodicsSecondaryBtn.vue', () => {
  let wrapper
  const mockOnClick = jest.fn()

  beforeEach(() => {
    wrapper = shallowMount(FoodicsSecondaryBtn, {
      propsData: {
        onClick: mockOnClick
      },
      slots: {
        default: 'Secondary Button'
      }
    })
    jest.clearAllMocks()
  })

  it('renders with correct classes', () => {
    const button = wrapper.find('button')
    expect(button.classes()).toContain('btn')
    expect(button.classes()).toContain('btn-outline-primary')
    expect(button.classes()).toContain('w-100')
  })

  it('renders slot content correctly', () => {
    expect(wrapper.text()).toBe('Secondary Button')
  })

  it('calls onClick handler when clicked', async () => {
    await wrapper.find('button').trigger('click')
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('renders with HTML content in slot', () => {
    const buttonWithIcon = shallowMount(FoodicsSecondaryBtn, {
      propsData: {
        onClick: mockOnClick
      },
      slots: {
        default: '<i class="bi bi-pencil"></i> Edit'
      }
    })
    expect(buttonWithIcon.html()).toContain('Edit')
  })

  it('handles multiple clicks correctly', async () => {
    const button = wrapper.find('button')
    await button.trigger('click')
    await button.trigger('click')
    expect(mockOnClick).toHaveBeenCalledTimes(2)
  })
})