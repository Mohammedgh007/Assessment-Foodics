import { shallowMount } from '@vue/test-utils'
import PaginatorContainer from '@/View/components/ui/containers/PaginatorContainer.vue'

describe('PaginatorContainer.vue', () => {
  let wrapper
  const mockHandleClickPage = jest.fn()

  const defaultProps = {
    currPageIndex: 0,
    totalPages: 10,
    handleClickPage: mockHandleClickPage
  }

  beforeEach(() => {
    wrapper = shallowMount(PaginatorContainer, {
      propsData: defaultProps
    })
    jest.clearAllMocks()
  })

  describe('Navigation buttons', () => {
    it('disables previous button on first page', () => {
      const prevButton = wrapper.find('.page-item:first-child')
      expect(prevButton.classes('disabled')).toBe(true)
    })

    it('enables previous button when not on first page', async () => {
      await wrapper.setProps({ currPageIndex: 1 })
      const prevButton = wrapper.find('.page-item:first-child')
      expect(prevButton.classes('disabled')).toBe(false)
    })

    it('disables next button on last page', async () => {
      await wrapper.setProps({ currPageIndex: 9 }) // 0-based index, so 9 is the last page
      const nextButton = wrapper.find('.page-item:last-child')
      expect(nextButton.classes('disabled')).toBe(true)
    })
  })

  describe('Page numbers display', () => {
    it('shows first page as active when on first page', () => {
      const firstPage = wrapper.find('.page-item:nth-child(2)') // First numbered page
      expect(firstPage.classes('active')).toBe(true)
    })

    it('shows correct visible pages', async () => {
      await wrapper.setProps({ currPageIndex: 5 })
      const visiblePages = wrapper.vm.visiblePages
      expect(visiblePages).toEqual([3, 4, 5, 6, 7])
    })

    it('shows last page number correctly', () => {
      const lastPageNumber = wrapper.find('.page-item:nth-last-child(2) .page-link')
      expect(lastPageNumber.text()).toBe('10')
    })
  })

  describe('Ellipsis display', () => {
    it('shows right ellipsis when not near last page', () => {
      const rightEllipsis = wrapper.find('li:nth-last-child(3) .page-link')
      expect(rightEllipsis.text()).toBe('...')
    })

    it('shows left ellipsis when far from first page', async () => {
      await wrapper.setProps({ currPageIndex: 7 })
      const leftEllipsis = wrapper.find('li:nth-child(3) .page-link')
      expect(leftEllipsis.text()).toBe('...')
    })
  })

  describe('Click handlers', () => {
    it('calls handleClickPage with correct index when page number clicked', async () => {
      const pageNumber = wrapper.find('.page-item:nth-child(2) a')
      await pageNumber.trigger('click')
      expect(mockHandleClickPage).toHaveBeenCalledWith(0)
    })

    it('calls handleClickPage with next page when next button clicked', async () => {
      await wrapper.setProps({ currPageIndex: 1 })
      const nextButton = wrapper.find('.page-item:last-child a')
      await nextButton.trigger('click')
      expect(mockHandleClickPage).toHaveBeenCalledWith(2)
    })

    it('calls handleClickPage with previous page when previous button clicked', async () => {
      await wrapper.setProps({ currPageIndex: 1 })
      const prevButton = wrapper.find('.page-item:first-child a')
      await prevButton.trigger('click')
      expect(mockHandleClickPage).toHaveBeenCalledWith(0)
    })
  })

  describe('Edge cases', () => {
    it('handles single page correctly', async () => {
      await wrapper.setProps({ totalPages: 1 })
      expect(wrapper.findAll('.page-item').length).toBe(3) // prev, 1, next
      expect(wrapper.find('.page-item:last-child').classes('disabled')).toBe(true)
    })

    it('adjusts visible pages near the end', async () => {
      await wrapper.setProps({ currPageIndex: 8 }) // Second to last page
      const visiblePages = wrapper.vm.visiblePages
      expect(visiblePages).toEqual([5, 6, 7, 8, 9])
    })
  })
})