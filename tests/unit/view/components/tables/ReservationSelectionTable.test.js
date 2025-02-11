import { shallowMount } from '@vue/test-utils'
import ReservationSelectionTable from '@/View/components/tables/ReservationSelectionTable.vue'

describe('ReservationSelectionTable.vue', () => {
  const mockBranches = [
    { name: 'Branch 1', reference: 'REF001' },
    { name: 'Branch 2', reference: 'REF002' }
  ]

  const createWrapper = () => {
    return shallowMount(ReservationSelectionTable, {
      propsData: {
        branches: mockBranches,
        addBranch: jest.fn(),
        removeBranch: jest.fn()
      },
      mocks: {
        $t: (key) => key
      }
    })
  }

  it('renders the table with correct headers', () => {
    const wrapper = createWrapper()
    const headers = wrapper.findAll('th')
    
    expect(headers.length).toBe(3)
    expect(headers.at(1).text()).toBe('name')
    expect(headers.at(2).text()).toBe('reference')
  })

  it('renders correct number of rows', () => {
    const wrapper = createWrapper()
    const rows = wrapper.findAll('tbody tr')
    
    expect(rows.length).toBe(mockBranches.length)
  })

  it('displays branch information correctly', () => {
    const wrapper = createWrapper()
    const firstRow = wrapper.find('tbody tr')
    
    expect(firstRow.find('td:nth-child(2)').text()).toBe('Branch 1')
    expect(firstRow.find('td:nth-child(3)').text()).toBe('REF001')
  })

  it('initializes with empty selection', () => {
    const wrapper = createWrapper()
    expect(wrapper.vm.selectedBranches).toEqual([])
    expect(wrapper.vm.selectAll).toBe(false)
  })
})