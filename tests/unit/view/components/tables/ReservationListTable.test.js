import { shallowMount } from '@vue/test-utils'
import ReservationListTable from '@/View/components/tables/ReservationListTable.vue'

describe('ReservationListTable.vue', () => {
  const mockBranches = [
    { 
      name: 'Branch 1', 
      reference: 'REF001',
      tables: ['table1', 'table2'],
      reservationsDuration: '2 hours'
    },
    { 
      name: 'Branch 2', 
      reference: 'REF002',
      tables: ['table1'],
      reservationsDuration: '1 hour'
    }
  ]

  const createWrapper = () => {
    return shallowMount(ReservationListTable, {
      propsData: {
        branches: mockBranches,
        onBranchClick: jest.fn()
      },
      mocks: {
        $t: (key) => key // Mock translation function
      }
    })
  }

  it('renders the table with correct headers', () => {
    const wrapper = createWrapper()
    const headers = wrapper.findAll('th')
    
    expect(headers.length).toBe(4)
    expect(headers.at(0).text()).toBe('name')
    expect(headers.at(1).text()).toBe('reference')
    expect(headers.at(2).text()).toBe('numberOfTables')
    expect(headers.at(3).text()).toBe('reservationsDuration')
  })

  it('renders correct number of rows', () => {
    const wrapper = createWrapper()
    const rows = wrapper.findAll('tbody tr')
    expect(rows.length).toBe(mockBranches.length)
  })

  it('displays branch information correctly', () => {
    const wrapper = createWrapper()
    const firstRow = wrapper.find('tbody tr')
    
    expect(firstRow.find('td:nth-child(2)').text()).toBe('REF001')
    expect(firstRow.find('td:nth-child(3)').text()).toBe('2')
    expect(firstRow.find('td:nth-child(4)').text()).toBe('2 hours')
  })
})