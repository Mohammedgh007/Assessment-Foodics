import { shallowMount } from '@vue/test-utils'
import AddBranchModal from '@/View/components/modalForms/AddBranchModal.vue'

describe('AddBranchModal.vue', () => {
  const mockProps = {
    modalId: 'testModal',
    nonReservationsBranches: [
      { name: 'Branch 1', reference: 'REF001' },
      { name: 'Branch 2', reference: 'REF002' }
    ],
    pagesCount: 2,
    handleNavigateToPage: jest.fn(),
    submitSelection: jest.fn()
  }

  const createWrapper = (props = {}) => {
    return shallowMount(AddBranchModal, {
      propsData: {
        ...mockProps,
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
    expect(modal.attributes('id')).toBe('testModal')
  })

  it('renders modal title correctly', () => {
    const wrapper = createWrapper()
    const title = wrapper.find('.modal-title')
    expect(title.text()).toBe('addBranch')
  })

  it('renders ReservationSelectionTable with correct props', () => {
    const wrapper = createWrapper()
    const table = wrapper.findComponent({ name: 'ReservationSelectionTable' })
    
    expect(table.exists()).toBe(true)
    expect(table.props('branches')).toEqual(mockProps.nonReservationsBranches)
  })

  it('renders pagination when not loading', () => {
    const wrapper = createWrapper()
    const paginator = wrapper.findComponent({ name: 'PaginatorContainer' })
    expect(paginator.exists()).toBe(true)
  })

  it('shows loading spinner when isLoading is true', async () => {
    const wrapper = createWrapper()
    await wrapper.setData({ isLoading: true })
    
    const spinner = wrapper.find('.spinner-border')
    expect(spinner.exists()).toBe(true)
  })
})