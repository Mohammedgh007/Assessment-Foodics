import { shallowMount } from '@vue/test-utils'
import EditBranchModal from '@/View/components/modalForms/EditBranchModal.vue'

describe('EditBranchModal.vue', () => {
  const mockBranch = {
    id: '1',
    name: 'Test Branch',
    reference: 'TEST001',
    tables: [
      { sectionName: 'Section 1', tableName: 'Table 1', isReservationAllowed: true },
      { sectionName: 'Section 2', tableName: 'Table 2', isReservationAllowed: false }
    ],
    reservationsDuration: 60,
    isReservationsEnabled: true,
    reservationsSchedule: {
      sunday: [],
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: []
    }
  }

  const createWrapper = (props = {}) => {
    return shallowMount(EditBranchModal, {
      propsData: {
        modalId: 'editBranchModal',
        submitChanges: jest.fn(),
        branch: mockBranch,
        ...props
      },
      mocks: {
        $t: (key) => key // Mock translation function
      },
      stubs: {
        'NumberWithUnitField': true,
        'DropdownCheckboxesField': true,
        'TimeSlotsField': true,
        'FoodicsPrimaryBtn': true,
        'FoodicsSecondaryBtn': true
      }
    })
  }

  it('renders modal with correct ID', () => {
    const wrapper = createWrapper()
    expect(wrapper.attributes('id')).toBe('editBranchModal')
  })

  it('renders modal title correctly', () => {
    const wrapper = createWrapper()
    const title = wrapper.find('.modal-title')
    expect(title.text()).toBe('editBranch')
  })

  it('renders form fields', () => {
    const wrapper = createWrapper()
    
    const numberField = wrapper.findComponent({ name: 'NumberWithUnitField' })
    const dropdownField = wrapper.findComponent({ name: 'DropdownCheckboxesField' })
    const timeSlotFields = wrapper.findAllComponents({ name: 'TimeSlotsField' })

    expect(numberField.exists()).toBe(true)
    expect(dropdownField.exists()).toBe(true)
    expect(timeSlotFields.length).toBe(7)
  })

  it('shows loading spinner when isLoading is true', async () => {
    const wrapper = createWrapper()
    await wrapper.setData({ isLoading: true })
    
    const spinner = wrapper.find('.spinner-border')
    expect(spinner.exists()).toBe(true)
  })
})