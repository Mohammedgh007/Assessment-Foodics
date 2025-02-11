import { shallowMount } from '@vue/test-utils'
import NumberWithUnitField from '@/View/components/ui/fields/NumberWithUnitField.vue'

describe('NumberWithUnitField.vue', () => {
  let wrapper
  const mockHandleChange = jest.fn()

  const defaultProps = {
    label: 'Test Label',
    name: 'test-field',
    value: 42,
    unitText: 'kg',
    handleChange: mockHandleChange
  }

  beforeEach(() => {
    wrapper = shallowMount(NumberWithUnitField, {
      propsData: defaultProps
    })
    jest.clearAllMocks()
  })

  it('renders correctly with initial props', () => {
    // Check label
    expect(wrapper.find('label').text()).toBe('Test Label')
    
    // Check input value
    expect(wrapper.find('input').element.value).toBe('42')
    
    // Check unit text
    expect(wrapper.find('.input-group-text').text()).toBe('kg')
  })

  it('emits input event when value changes', async () => {
    const input = wrapper.find('input')
    await input.setValue('100')

    expect(mockHandleChange).toHaveBeenCalled()
  })

  it('has correct input attributes', () => {
    const input = wrapper.find('input')
    expect(input.attributes()).toMatchObject({
      type: 'number',
      id: 'test-field',
      name: 'test-field'
    })
  })

  it('handles string values correctly', async () => {
    await wrapper.setProps({ value: '55' })
    expect(wrapper.find('input').element.value).toBe('55')
  })

  it('handles number values correctly', async () => {
    await wrapper.setProps({ value: 77 })
    expect(wrapper.find('input').element.value).toBe('77')
  })
})