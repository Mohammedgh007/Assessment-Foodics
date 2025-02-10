/**
    This component is used to display a modal for adding a branch, so that the user can select 
    the branches they want to allow reservations for.
*/
<template>
  <div class="modal fade" :id="modalId" tabindex="-1" :aria-labelledby="`${modalId}Label`" aria-hidden="true">
    <div class="modal-dialog modal-size">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" :id="`${modalId}Label`">{{ $t('addBranch') }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div v-if="!isLoading" class="mb-3">
            <p> {{ $t('addBranchDescription') }} </p>
            <ReservationSelectionTable 
              :branches="nonReservationsBranches" 
              :addBranch="addBranch"
              :removeBranch="removeBranch"
            />
            <div class="d-flex justify-content-center w-100 mt-4 mb-4">
              <PaginatorContainer 
                :currPageIndex="currPage"
                :totalPages="pagesCount"
                :handleClickPage="handleClickPage"
              />
            </div>
          </div>
          <div v-else class="mb-3 text-center">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="d-flex flex-column flex-md-row justify-content-end w-100 gap-2">
            <div class="col-sm-6 col-md-2">
              <FoodicsSecondaryBtn data-bs-dismiss="modal" :onClick="() => {$emit('close')}">{{ $t('close') }}</FoodicsSecondaryBtn>
            </div>
            <div class="col-sm-6 col-md-2">
              <FoodicsPrimaryBtn :onClick="handleSubmit"> {{ $t('save') }} </FoodicsPrimaryBtn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReservationSelectionTable from '../tables/ReservationSelectionTable.vue'
import FoodicsPrimaryBtn from '../ui/buttons/FoodicsPrimaryBtn.vue';
import FoodicsSecondaryBtn from '../ui/buttons/FoodicsSecondaryBtn.vue';
import PaginatorContainer from '../ui/containers/PaginatorContainer.vue';

export default {
  name: 'AddBranchModal',
  components: {
    ReservationSelectionTable,
    FoodicsPrimaryBtn,
    FoodicsSecondaryBtn,
    PaginatorContainer
  },
  props: {
    modalId: {
      type: String,
      required: true
    },
    nonReservationsBranches: {
      type: Array,
      required: true,
      default: () => []
    },
    pagesCount: {
      type: Number,
      required: true,
      default: 10
    },
    /**
     * @param {number} targetPage - The page number to get starting from 0
     */
    handleNavigateToPage: {
      type: Function,
      required: true
    },
    /**
     * @param {Array<BranchOverviewModel>} branches - Array of branches to allow reservations
     */
    submitSelection: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      selectedBranches: [],
      currPage: 0, // starts from 0,
      isLoading: false
    }
  },
  methods: {
    async handleSubmit() {
      this.isLoading = true
      await this.submitSelection(this.selectedBranches)
      this.selectedBranches = []
      this.isLoading = false
    },
    addBranch(branch) {
      this.selectedBranches.push(branch)
    },
    removeBranch(branch) {
      this.selectedBranches = this.selectedBranches.filter(b => b.reference !== branch.reference)
    },
    async handleClickPage(page) {
      this.isLoading = true
      this.currPage = page
      await this.handleNavigateToPage(page)
      this.isLoading = false
    }
  }
}
</script>

<style scoped>
.modal-size {
  width: 95vw;
  min-width: 95vw;
}

@media (min-width: 768px) {
  .modal-size {
    width: 55vw;
    min-width: 55vw;
  }
}
.modal-header {
  border-bottom: 1px solid #dee2e6;
}

.modal-footer {
  border-top: 1px solid #dee2e6;
}
</style>
