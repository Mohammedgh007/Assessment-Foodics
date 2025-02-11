import { shallowMount, createLocalVue } from '@vue/test-utils'
import DropdownCheckboxesField from '@/View/components/ui/fields/DropdownCheckboxesField.vue'

const localVue = createLocalVue()

describe('DropdownCheckboxesField.vue', () => {
  let wrapper
  const mockHandleChange = jest.fn()
  
  const defaultProps = {
    label: 'Test Label',
    name: 'test-field',
    value: [],
    options: ['Option 1', 'Option 2', 'Option 3'],
    handleChange: mockHandleChange
  }

  beforeEach(() => {
    wrapper = shallowMount(DropdownCheckboxesField, {
      localVue,
      propsData: defaultProps,
      mocks: {
        $t: (key) => key // Mock translation function
      }
    })
    jest.clearAllMocks()
  })

  it('renders correctly with initial props', () => {
    expect(wrapper.find('label').text()).toBe('Test Label')
    expect(wrapper.find('button').text()).toBe('pleaseSelectFromTheOptions')
  })

  describe('displayText computed property', () => {
    it('shows placeholder when no options selected', () => {
      expect(wrapper.vm.displayText).toBe('pleaseSelectFromTheOptions')
    })

    it('shows single option when one selected', async () => {
      await wrapper.setProps({ value: [0] })
      expect(wrapper.vm.displayText).toBe('Option 1')
    })

    it('shows first option with ellipsis when multiple selected', async () => {
      await wrapper.setProps({ value: [0, 1] })
      expect(wrapper.vm.displayText).toBe('Option 1, ...')
    })
  })

  describe('checkbox interactions', () => {
    it('adds option when checkbox is checked', async () => {
      const checkbox = wrapper.find('input[type="checkbox"]')
      await checkbox.setChecked(true)

      expect(mockHandleChange).toHaveBeenCalledWith({
        target: {
          name: 'test-field',
          value: [0]
        }
      })
    })

    it('removes option when checkbox is unchecked', async () => {
      await wrapper.setProps({ value: [0] })
      const checkbox = wrapper.find('input[type="checkbox"]')
      await checkbox.setChecked(false)

      expect(mockHandleChange).toHaveBeenCalledWith({
        target: {
          name: 'test-field',
          value: []
        }
      })
    })
  })

  describe('dropdown functionality', () => {
    it('renders all options', () => {
      const checkboxes = wrapper.findAll('.form-check')
      expect(checkboxes.length).toBe(3)
    })

    it('has OK button that closes dropdown', () => {
      const okButton = wrapper.find('.btn-primary')
      expect(okButton.exists()).toBe(true)
      expect(okButton.text()).toBe('OK')
    })
  })
})