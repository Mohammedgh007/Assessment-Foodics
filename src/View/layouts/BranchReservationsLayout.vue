<template>
  <div class="w-100" style="height: 100vh;" :dir="$store.state.language.currentLanguage === 'ar' ? 'rtl' : 'ltr'">

    <MainHeader />

    <PageContainer>
      <ReservationsHeader 
        :handleClickAddBranchBtn="handleClickAddBranchBtn" 
        :handleClickDisableReservationsBtn="handleClickDisableReservationsBtn" 
      />

        <div class="table-spacer"></div>

        <div v-if="!isLoading">
          <ReservationListTable :branches="branchesReservationList" :onBranchClick="onBranchClick" />
          <PaginatorContainer 
            :currPageIndex="currPage"
            :totalPages="reservationBranchesPages"
            :handleClickPage="handleLoadingReservationBranches"
          />  
        </div>
        <div v-else>
          <div class="text-center">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </PageContainer>

    <AddBranchModal 
      :nonReservationsBranches="branchesNonReservationList" 
      :submitSelection="submitAddBranchesSelection" 
      :pagesCount="nonReservationBranchesPages" 
      :handleNavigateToPage="handleLoadingNonReserveBranches"
      :modalId="addingBranchModalId" 
    />

    <EditBranchModal 
      :modalId="editBranchModalId"
      :branch="editedBranch"
      :submitChanges="submitEditBranchChanges"
    />

  </div>
</template>

<script>
import MainHeader from '@/View/components/header/MainHeader.vue';
import PageContainer from '@/View/components/ui/containers/PageContainer.vue';
import ReservationsHeader from '@/View/components/PageHeaders/ReservationsHeader.vue';
import ReservationListTable from '@/View/components/tables/ReservationListTable.vue';
import AddBranchModal from '@/View/components/modalForms/AddBranchModal.vue';
import EditBranchModal from '@/View/components/modalForms/EditBranchModal.vue';
import PaginatorContainer from '@/View/components/ui/containers/PaginatorContainer.vue';
import { Modal } from 'bootstrap';
import Swal from 'sweetalert2';

export default {
  name: 'BranchReservationsLayout',
  components: {
    MainHeader,
    PageContainer,
    ReservationsHeader,
    ReservationListTable,
    AddBranchModal,
    PaginatorContainer,
    EditBranchModal
  },
  props: {
    getBranches: {
      type: Function,
      required: true,
      async: true
    },
    addReservations: {
      type: Function,
      required: true,
      async: true
    },
    removeReservations: {
      type: Function,
      required: true,
      async: true
    },
    submitReservationSettings: {
      type: Function,
      required: true,
      async: true
    }
  },
  data() {
    return {
      branchesReservationList: [], 
      branchesNonReservationList: [],
      isLoading: false,
      currPage: 0, // starts from 0,
      reservationBranchesPages: 50,
      nonReservationBranchesPages: 50,
      addingBranchModalId: 'ADD_BRANCH_MODAL_ID',
      editBranchModalId: 'EDIT_BRANCH_MODAL_ID',
      editedBranch: null
    }
  },
  async mounted() {
    this.isLoading = true
    try {
      const {list, pagesCount} = await this.getBranches(true, 0)
      this.branchesReservationList = list
      this.reservationBranchesPages = pagesCount
    } finally {
      this.isLoading = false
    }
  },
  methods: { 
    async onBranchClick(branch) {
      console.log('branch:', branch)  
      this.editedBranch = branch
      const editBranchModal = new Modal(document.getElementById(this.editBranchModalId))
      editBranchModal.show()
    },
    async handleLoadingReservationBranches(targetPage) {
      this.isLoading = true
      try {
        const {list, pagesCount} = await this.getBranches(true, targetPage)
        this.branchesReservationList = list
        this.reservationBranchesPages = pagesCount
        this.currPage = targetPage
      } finally {
        this.isLoading = false
      }
    },
    async handleLoadingNonReserveBranches(targetPage) {
      try {
        const {list, pagesCount} = await this.getBranches(false, targetPage)
        this.branchesNonReservationList = list
        this.nonReservationBranchesPages = pagesCount
      } catch (error) {
        // do nothing
      }
    },
    async handleClickAddBranchBtn() {
      this.isLoading = true
      try {
        const {list, pagesCount} = await this.getBranches(false, this.currPage)
        this.branchesNonReservationList = list
        this.nonReservationBranchesPages = pagesCount
        const addBranchModal = new Modal(document.getElementById(this.addingBranchModalId))
        addBranchModal.show()
      } finally {
        this.isLoading = false
      }
    },
    async handleClickDisableReservationsBtn() {
      
      const result = await Swal.fire({
        title: this.$t('suspendReservationsTitle'),
        text: this.$t('suspendReservationsDescription'),
        showCancelButton: true,
        confirmButtonText: this.$t('suspendReservationsConfirmButtonText'),
        cancelButtonText: this.$t('suspendReservationsCancelButtonText'),
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#440099',
        buttonsStyling: false,
        customClass: {
          confirmButton: 'btn btn-danger mx-1',
          cancelButton: 'btn btn-outline-primary mx-1'
        }
      })

      if (result.isConfirmed) {
        await this.submitRemoveBranchesSelection(this.branchesReservationList)
      }
    },
    async submitAddBranchesSelection(branches) {
      try {
        this.isLoading = true
        await this.addReservations(branches)
        await this.handleLoadingReservationBranches(0)
        await this.handleLoadingNonReserveBranches(0)
        this.isLoading = false
      } catch (error) {
        // do nothing
      }
    },
    async submitRemoveBranchesSelection(branches) {
      try {
        this.isLoading = true
        await this.removeReservations(branches)
        this.branchesReservationList = [],
        this.reservationBranchesPages = 0,
        this.currPage = 0,
        await this.handleLoadingNonReserveBranches(0)
        this.isLoading = false
      } catch (error) {
        // do nothing
      }
    },
    async submitEditBranchChanges(editedBranch) {
      this.isLoading = true
      try {
        await this.submitReservationSettings(editedBranch)
        this.isLoading = false
      } catch (error) {
        // do nothing
      }
    }
  } 
}
</script>

<style scoped>
.table-spacer {
  height: 3rem;
}
</style>