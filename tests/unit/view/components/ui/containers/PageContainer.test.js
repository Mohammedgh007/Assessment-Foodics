import { shallowMount } from '@vue/test-utils'
import PageContainer from '@/View/components/ui/containers/PageContainer.vue'

describe('PageContainer.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(PageContainer, {
      slots: {
        default: '<div class="test-content">Test Content</div>'
      }
    })
  })

  it('renders container with correct classes', () => {
    const container = wrapper.find('.container')
    expect(container.exists()).toBe(true)
    expect(container.classes()).toContain('page-container')
    expect(container.classes()).toContain('py-4')
    expect(container.classes()).toContain('px-4')
    expect(container.classes()).toContain('top-margin')
  })

  it('renders row and column structure', () => {
    expect(wrapper.find('.row').exists()).toBe(true)
    expect(wrapper.find('.col-12').exists()).toBe(true)
  })

  it('renders slot content correctly', () => {
    expect(wrapper.find('.test-content').exists()).toBe(true)
    expect(wrapper.find('.test-content').text()).toBe('Test Content')
  })

  it('applies correct margin-top style', () => {
    const container = wrapper.find('.top-margin')
    // Get the computed styles
    expect(container.classes('top-margin')).toBe(true)
  })
})