import { shallowMount } from '@vue/test-utils'
import MainFooter from '@/View/components/footer/MainFooter.vue'

describe('MainFooter.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(MainFooter, {
      mocks: {
        $t: (msg) => msg // Mock the translation function to return the key
      }
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('renders the footer element', () => {
    expect(wrapper.find('footer').exists()).toBe(true)
  })

  it('has correct classes applied', () => {
    const footer = wrapper.find('footer')
    expect(footer.classes()).toContain('bg-primary')
    expect(footer.classes()).toContain('text-white')
    expect(footer.classes()).toContain('py-3')
    expect(footer.classes()).toContain('mt-auto')
  })

  it('contains a container with text-center class', () => {
    const container = wrapper.find('.container')
    expect(container.exists()).toBe(true)
    expect(container.classes()).toContain('text-center')
  })

  it('displays the footer text key', () => {
    expect(wrapper.text()).toContain('footerText')
  })
})