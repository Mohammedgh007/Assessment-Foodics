

<template>
  <BranchReservationsLayout 
    :getBranches="getBranches"
    :addReservations="addReservations"
    :removeReservations="removeReservations"
    :submitReservationSettings="submitReservationSettings"
  />
</template>

<script>
import BranchReservationsLayout from '@/View/layouts/BranchReservationsLayout.vue';
import BranchReservationsRepo from '@/infrastructure/foodicsAPI/BranchReservationsRepo';
import GetBranchesRequest from '@/infrastructure/foodicsAPI/dto/requests/GetBranchesRequest';
import AllowBranchReservationRequest from '@/infrastructure/foodicsAPI/dto/requests/AllowBranchReservationRequest';
import DisAllowBranchReservationRequest from '@/infrastructure/foodicsAPI/dto/requests/DisAllowBranchReservationRequest';
import { EditBranchSettingsRequest } from '@/infrastructure/foodicsAPI/dto/requests/EditBranchSettingsRequest';
const branchReservationsRepo = new BranchReservationsRepo();

export default {
  name: 'BranchReservationsScreen',
  components: {
    BranchReservationsLayout
  },
  data() {
    return {
    }
  },
  methods: {
    async addReservations(branches) { 
      await Promise.all(branches.map(branch => {
        const dto = new AllowBranchReservationRequest(branch.id)
        return branchReservationsRepo.allowBranchReservation(dto)
      }))
    },
    async removeReservations(branches) { 
      await Promise.all(branches.map(branch => {
        const dto = new DisAllowBranchReservationRequest(branch.id)
        return branchReservationsRepo.disAllowBranchReservation(dto)
      }))
    },
    async submitReservationSettings(updatedBranch) {
      console.log("updatedBranch UUUUUUU", updatedBranch);
      const dto = new EditBranchSettingsRequest(updatedBranch, updatedBranch.id);
      await branchReservationsRepo.editBranchSettings(dto);
    },
    /**
     * @param {boolean} isReservationEnabled - Whether to get reservations or non-reservations
     * @param {number} targetPage - The page number to get starting from 0
     * @returns {Promise<{list: BranchOverviewModel[], pagesCount: number}>}
     */ 
    async getBranches(isReservationEnabled, targetPage) { 
      const dto = new GetBranchesRequest(targetPage, isReservationEnabled);
      const result = await branchReservationsRepo.getBranches(dto);
      
      return {list: result.branches, pagesCount: result.pagesCount}
    }
  }
}
</script>

<style scoped>
</style>
