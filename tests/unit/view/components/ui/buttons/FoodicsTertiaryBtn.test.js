import { shallowMount } from '@vue/test-utils'
import FoodicsTertiaryBtn from '@/View/components/ui/buttons/FoodicsTertiaryBtn.vue'

describe('FoodicsTertiaryBtn.vue', () => {
  let wrapper
  const mockOnClick = jest.fn()

  beforeEach(() => {
    wrapper = shallowMount(FoodicsTertiaryBtn, {
      propsData: {
        onClick: mockOnClick
      },
      slots: {
        default: 'Tertiary Button'
      }
    })
    jest.clearAllMocks()
  })

  it('renders with correct classes', () => {
    const button = wrapper.find('button')
    expect(button.classes()).toContain('btn')
    expect(button.classes()).toContain('btn-link')
    expect(button.classes()).toContain('text-primary')
    expect(button.classes()).toContain('text-decoration-underline')
    expect(button.classes()).toContain('mx-0')
    expect(button.classes()).toContain('px-0')
  })

  it('renders slot content correctly', () => {
    expect(wrapper.text()).toBe('Tertiary Button')
  })

  it('calls onClick handler when clicked', async () => {
    await wrapper.find('button').trigger('click')
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('renders with HTML content in slot', () => {
    const buttonWithIcon = shallowMount(FoodicsTertiaryBtn, {
      propsData: {
        onClick: mockOnClick
      },
      slots: {
        default: '<i class="bi bi-trash"></i> Delete'
      }
    })
    expect(buttonWithIcon.html()).toContain('Delete')
  })

  it('handles multiple clicks correctly', async () => {
    const button = wrapper.find('button')
    await button.trigger('click')
    await button.trigger('click')
    await button.trigger('click')
    expect(mockOnClick).toHaveBeenCalledTimes(3)
  })

  it('maintains text-decoration-underline class', () => {
    const button = wrapper.find('button')
    expect(button.classes('text-decoration-underline')).toBe(true)
  })
})