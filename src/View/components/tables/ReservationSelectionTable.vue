/**
    This component is used to display a table of branches with a checkbox for each branch.
    It allows the user to select or deselect all branches.
*/
<template>
  <table class="table table-hover">
    <thead>
      <tr class="border-bottom">
        <th scope="col">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" v-model="selectAll" @change="toggleSelectAll">
            <label class="form-check-label">{{ $t('selectAll') }}</label>
          </div>
        </th>
        <th scope="col">{{ $t('name') }}</th>
        <th scope="col">{{ $t('reference') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="branch in branches" :key="branch.reference" class="border-0">
        <td>
          <div class="form-check">
            <input 
              class="form-check-input" 
              style="cursor: pointer;"
              type="checkbox" 
              :checked="selectedBranches.includes(branch)"
              @change="(e) => e.target.checked ? addBranch(branch) : removeBranch(branch)"
            >
          </div>
        </td>
        <td>{{ branch.name }}</td>
        <td>{{ branch.reference }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'ReservationSelectionTable',
  props: {
    branches: {
      type: Array,
      required: true,
      default: () => []
    },
    /**
     * @param {BranchOverviewModel} branch - The branch to add
     */
    addBranch: {
      type: Function,
      required: true
    },
    /**
     * @param {BranchOverviewModel} branch - The branch to remove
     */
    removeBranch: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      selectedBranches: [],
      selectAll: false
    }
  },
  methods: {
    toggleSelectAll() {
        if (this.selectedBranches.length === this.branches.length) {
            this.selectedBranches = []
        } else {
            this.selectedBranches = this.branches.map(branch => branch)
        }
    }
  },
  watch: {
    selectedBranches(newVal) {
      this.selectAll = newVal.length === this.branches.length
      this.$emit('selection-changed', newVal)
    }
  }
}
</script>

<style scoped>
.table > :not(caption) > * > * {
  border-bottom-width: 0;
}

.table thead tr {
  border-bottom-width: 1px !important;
}


</style>
