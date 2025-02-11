import { shallowMount } from '@vue/test-utils'
import BranchReservationsLayout from '@/View/layouts/BranchReservationsLayout.vue'

describe('BranchReservationsLayout.vue', () => {
  let wrapper
  const mockGetBranches = jest.fn()
  const mockAddReservations = jest.fn()
  const mockRemoveReservations = jest.fn()
  const mockSubmitReservationSettings = jest.fn()

  beforeEach(() => {
    // Reset mock functions
    mockGetBranches.mockReset()
    mockAddReservations.mockReset()
    mockRemoveReservations.mockReset()
    mockSubmitReservationSettings.mockReset()

    // Mock successful getBranches response
    mockGetBranches.mockResolvedValue({
      list: [
        { id: 1, name: 'Branch 1' },
        { id: 2, name: 'Branch 2' }
      ],
      pagesCount: 1
    })

    wrapper = shallowMount(BranchReservationsLayout, {
      propsData: {
        getBranches: mockGetBranches,
        addReservations: mockAddReservations,
        removeReservations: mockRemoveReservations,
        submitReservationSettings: mockSubmitReservationSettings
      },
      mocks: {
        $store: {
          state: {
            language: {
              currentLanguage: 'en'
            }
          }
        },
        $t: (msg) => msg
      },
      stubs: {
        MainHeader: true,
        PageContainer: true,
        ReservationsHeader: true,
        ReservationListTable: true,
        AddBranchModal: true,
        EditBranchModal: true,
        PaginatorContainer: true,
        MainFooter: true
      }
    })
  })

  it('renders correctly', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('calls getBranches on mount', () => {
    expect(mockGetBranches).toHaveBeenCalledWith(true, 0)
  })

  it('shows loading spinner when isLoading is true', async () => {
    await wrapper.setData({ isLoading: true })
    expect(wrapper.find('.spinner-border').exists()).toBe(true)
  })

  it('hides loading spinner when isLoading is false', async () => {
    await wrapper.setData({ isLoading: false })
    expect(wrapper.find('.spinner-border').exists()).toBe(false)
  })

  it('updates branchesReservationList when getBranches succeeds', async () => {
    const expectedBranches = [
      { id: 1, name: 'Branch 1' },
      { id: 2, name: 'Branch 2' }
    ]
    
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.branchesReservationList).toEqual(expectedBranches)
  })

  it('sets direction attribute based on language', () => {
    // Test LTR (English)
    expect(wrapper.attributes('dir')).toBe('ltr')

    // Create new wrapper for RTL (Arabic)
    const wrapperAr = shallowMount(BranchReservationsLayout, {
      propsData: {
        getBranches: mockGetBranches,
        addReservations: mockAddReservations,
        removeReservations: mockRemoveReservations,
        submitReservationSettings: mockSubmitReservationSettings
      },
      mocks: {
        $store: {
          state: {
            language: {
              currentLanguage: 'ar'
            }
          }
        },
        $t: (msg) => msg
      },
      stubs: {
        MainHeader: true,
        PageContainer: true,
        ReservationsHeader: true,
        ReservationListTable: true,
        AddBranchModal: true,
        EditBranchModal: true,
        PaginatorContainer: true,
        MainFooter: true
      }
    })

    expect(wrapperAr.attributes('dir')).toBe('rtl')
  })
})