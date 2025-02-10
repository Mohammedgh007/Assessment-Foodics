<template>
  <div class="table-responsive">
    <table class="table table-hover">
      <thead>
        <tr class="border-bottom">
          <th scope="col">{{ $t('name') }}</th>
          <th scope="col">{{ $t('reference') }}</th>
          <th scope="col">{{ $t('numberOfTables') }}</th>
          <th scope="col">{{ $t('reservationsDuration') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="branch in branches" :key="branch.reference" class="border-0">
          <td>
            <FoodicsTertiaryBtn :onClick="() => onBranchClick(branch)">
              {{ branch.name }}
            </FoodicsTertiaryBtn>
          </td>
          <td>{{ branch.reference }}</td>
          <td>{{ branch.tables.length }}</td>
          <td>{{ branch.reservationsDuration }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import FoodicsTertiaryBtn from '../ui/buttons/FoodicsTertiaryBtn.vue'

export default {
  name: 'ReservationListTable',
  components: {
    FoodicsTertiaryBtn
  },
  props: {
    branches: {
      type: Array,
      required: true,
      default: () => []
    },
    /**
     * @param {BranchOverviewModel} selectedBranch
     */
    onBranchClick: {
      type: Function,
      required: true,
      
    },
  },

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
