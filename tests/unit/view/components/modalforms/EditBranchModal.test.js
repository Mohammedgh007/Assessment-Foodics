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
      }
    })
  }

  it('renders modal with correct ID', () => {
    const wrapper = createWrapper()
    const modal = wrapper.find('.modal')
    expect(modal.attributes('id')).toBe('editBranchModal')
  })

  it('renders modal title correctly', () => {
    const wrapper = createWrapper()
    const title = wrapper.find('.modal-title')
    expect(title.text()).toBe('editBranch')
  })

  it('renders form fields when not loading', () => {
    const wrapper = createWrapper()
    
    expect(wrapper.findComponent({ name: 'NumberWithUnitField' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'DropdownCheckboxesField' }).exists()).toBe(true)
    expect(wrapper.findAllComponents({ name: 'TimeSlotsField' }).length).toBe(7)
  })

  it('shows loading spinner when isLoading is true', async () => {
    const wrapper = createWrapper()
    await wrapper.setData({ isLoading: true })
    
    const spinner = wrapper.find('.spinner-border')
    expect(spinner.exists()).toBe(true)
  })
})