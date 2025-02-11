import { shallowMount } from '@vue/test-utils'
import TimeSlotsField from '@/View/components/ui/fields/TimeSlotsField.vue'
import { Modal } from 'bootstrap'

// Mock Bootstrap Modal
jest.mock('bootstrap', () => ({
  Modal: jest.fn().mockImplementation(() => ({
    show: jest.fn(),
    hide: jest.fn()
  }))
}))

describe('TimeSlotsField.vue', () => {
  let wrapper
  const mockHandleChange = jest.fn()

  const defaultProps = {
    label: 'Time Slots',
    name: 'timeSlots',
    value: [],
    handleChange: mockHandleChange,
    maxSlots: 5
  }

  beforeEach(() => {
    wrapper = shallowMount(TimeSlotsField, {
      propsData: defaultProps,
      mocks: {
        $t: (key) => key // Mock translation function
      }
    })
    jest.clearAllMocks()
  })

  it('renders correctly with initial props', () => {
    expect(wrapper.find('label').text()).toBe('Time Slots')
    expect(wrapper.find('input[readonly]').exists()).toBe(true)
  })

  describe('Time period handling', () => {
    it('formats time periods correctly', () => {
      const period = { start: '14:30', end: '15:45' }
      expect(wrapper.vm.formatPeriod(period)).toBe('2:30 PM - 3:45 PM')
    })

    it('displays multiple time periods', async () => {
      const periods = [
        { start: '09:00', end: '10:00' },
        { start: '14:00', end: '15:00' }
      ]
      await wrapper.setProps({ value: periods })
      expect(wrapper.findAll('.badge').length).toBe(2)
    })

    it('removes a time period when clicked', async () => {
      const periods = [{ start: '09:00', end: '10:00' }]
      await wrapper.setProps({ value: periods })
      
      await wrapper.find('.bi-x-circle').trigger('click')
      
      expect(mockHandleChange).toHaveBeenCalledWith({
        target: {
          name: 'timeSlots',
          value: []
        }
      })
    })
  })

  describe('Modal interactions', () => {

    it('prevents opening modal when max slots reached', async () => {
      await wrapper.setProps({
        value: Array(5).fill({ start: '09:00', end: '10:00' })
      })
      
      await wrapper.find('.input-group').trigger('click')
      expect(wrapper.vm.errorMsg).toBe('error.maximumTimeSlotsAllowed')
    })
  })

  describe('Time validation', () => {
    it('validates start time before end time', async () => {
      wrapper.vm.tempStartTime = '10:00'
      wrapper.vm.tempEndTime = '09:00'
      
      await wrapper.vm.handleSave()
      
      expect(wrapper.vm.errorMsg).toBe('startTimeMustBeBeforeEndTime')
    })

    it('requires both start and end times', async () => {
      wrapper.vm.tempStartTime = '10:00'
      wrapper.vm.tempEndTime = ''
      
      await wrapper.vm.handleSave()
      
      expect(wrapper.vm.errorMsg).toBe('error.required')
    })
  })

  describe('Save functionality', () => {
    it('adds new time period when valid', async () => {
      wrapper.vm.tempStartTime = '09:00'
      wrapper.vm.tempEndTime = '10:00'
      
      await wrapper.vm.handleSave()
      
      expect(mockHandleChange).toHaveBeenCalledWith({
        target: {
          name: 'timeSlots',
          value: [{ start: '09:00', end: '10:00' }]
        }
      })
    })
  })
})