/**
    This component is used to display a modal for editing branch settings
*/
<template>
  <div class="modal fade" :id="modalId" tabindex="-1" :aria-labelledby="`${modalId}Label`" aria-hidden="true">
    <div class="modal-dialog modal-size">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" :id="`${modalId}Label`">{{ $t('editBranch') }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div v-if="!isLoading" class="mb-3 row"> <!-- Form Fields -->

            <div class="col-sm-12 col-md-6"> <!-- Reservations Duration -->
              <NumberWithUnitField
                :label="$t('reservationsDuration')"
                name="reservationsDuration"
                :value="formData.reservationsDuration"
                :unitText="$t('minutes')"
                :handleChange="handleFieldChange"
              />
            </div>

            <div class="col-sm-12 col-md-6"> <!-- Tables -->
                <DropdownCheckboxesField
                    :label="$t('tables')"
                    name="tables" 
                    :value="formData.tables"
                    :options="(branch && branch.tables && branch.tables.length > 0) ? branch.tables.map(table => `${table.sectionName} - ${table.tableName}`) : []"
                    :handleChange="handleFieldChange"
                />
            </div>

            <div class="col-sm-12 col-md-6"> <!-- Sunday -->
                <TimeSlotsField
                    :label="$t('sunday')"
                    name="sunday"
                    :value="formData.sunday"
                    :handleChange="handleFieldChange"
                    :maxSlots=3
                />
            </div>

            <div class="col-sm-12 col-md-6"> <!-- Monday -->
                <TimeSlotsField
                    :label="$t('monday')"
                    name="monday"
                    :value="formData.monday"
                    :handleChange="handleFieldChange"
                    :maxSlots=3
                />
            </div>

            <div class="col-sm-12 col-md-6"> <!-- Tuesday -->
                <TimeSlotsField
                    :label="$t('tuesday')"
                    name="tuesday"
                    :value="formData.tuesday"
                    :handleChange="handleFieldChange"
                    :maxSlots=3
                />
            </div>

            <div class="col-sm-12 col-md-6"> <!-- Wednesday -->
                <TimeSlotsField
                    :label="$t('wednesday')"
                    name="wednesday"
                    :value="formData.wednesday"
                    :handleChange="handleFieldChange"
                    :maxSlots=3
                />
            </div>

            <div class="col-sm-12 col-md-6"> <!-- Thursday -->
                <TimeSlotsField
                    :label="$t('thursday')"
                    name="thursday"
                    :value="formData.thursday"
                    :handleChange="handleFieldChange"
                    :maxSlots=3
                />
            </div>

            <div class="col-sm-12 col-md-6"> <!-- Friday -->
                <TimeSlotsField
                    :label="$t('friday')"
                    name="friday"
                    :value="formData.friday"
                    :handleChange="handleFieldChange"
                    :maxSlots=3
                />
            </div>

            <div class="col-sm-12 col-md-6"> <!-- Saturday -->
                <TimeSlotsField
                    :label="$t('saturday')"
                    name="saturday"
                    :value="formData.saturday"
                    :handleChange="handleFieldChange"
                    :maxSlots=3
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
import NumberWithUnitField from '../ui/fields/NumberWithUnitField.vue'
import FoodicsPrimaryBtn from '../ui/buttons/FoodicsPrimaryBtn.vue';
import FoodicsSecondaryBtn from '../ui/buttons/FoodicsSecondaryBtn.vue';
import DropdownCheckboxesField from '../ui/fields/DropdownCheckboxesField.vue';
import TimeSlotsField from '../ui/fields/TimeSlotsField.vue';
import BranchOverviewModel from '@/business/models/BranchOverviewModel';
import BranchTableModel from '@/business/models/BranchTableModel';
import ReservationTimeSlotModel from '@/business/models/ReservationTimeSlotModel';
import ReservationsScheduleModel from '@/business/models/ReservationsScheduleModel';

export default {
  name: 'EditBranchModal',
  components: {
    NumberWithUnitField,
    FoodicsPrimaryBtn,
    FoodicsSecondaryBtn,
    DropdownCheckboxesField,
    TimeSlotsField
  },
  props: {
    modalId: {
      type: String,
      required: true
    },
    submitChanges: {
      type: Function,
      required: true
    },
    branch: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      isLoading: false,
      formData: {
        reservationsDuration: '',
        tables: [],
        sunday: [],
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: []
      }
    }
  },
  watch: {
    branch: {
      handler(newBranch) {
        if (newBranch && newBranch.tables && newBranch.tables.length > 0) {
          this.formData.tables = newBranch.tables
            .map((table, index) => (table.isReservationAllowed) ? index : -1)
            .filter(index => index !== -1);
            
        } else {
          this.formData.tables = [];
        }
        if (newBranch && newBranch.reservationsSchedule) {
          this.formData.sunday = newBranch.reservationsSchedule.sunday;
          this.formData.monday = newBranch.reservationsSchedule.monday;
          this.formData.tuesday = newBranch.reservationsSchedule.tuesday;
          this.formData.wednesday = newBranch.reservationsSchedule.wednesday;
          this.formData.thursday = newBranch.reservationsSchedule.thursday;
          this.formData.friday = newBranch.reservationsSchedule.friday;
          this.formData.saturday = newBranch.reservationsSchedule.saturday;
        } else {
          this.formData.sunday = []
          this.formData.monday = []
          this.formData.tuesday = []
          this.formData.wednesday = []
          this.formData.thursday = []
          this.formData.friday = []
          this.formData.saturday = []
        }
      },
      immediate: true
    }
  },
  methods: {
    handleFieldChange(e) {
      const { name, value } = e.target
      this.formData[name] = value
    },
    async handleSubmit() {
      this.isLoading = true
      const updatedTables = this.branch.tables.map((table, index) => new BranchTableModel(table.sectionName, table.sectionId, table.tableName, table.tableId, this.formData.tables.includes(index)))
      const updatedReservations = this.mapReservationsData()
      const updatedBranch = new BranchOverviewModel(this.branch.id, this.branch.name, this.branch.reference, updatedTables, this.formData.reservationsDuration, this.branch.isReservationsEnabled, updatedReservations)
      await this.submitChanges(updatedBranch)
      this.isLoading = false
    },
    /**
     * It is a helper function for handleSubmit () It maps the reservations data to the format that the model expects
     */
    mapReservationsData() {
      return new ReservationsScheduleModel(
        this.formData.sunday.map((period) => new ReservationTimeSlotModel(period.start, period.end)),
        this.formData.monday.map((period) => new ReservationTimeSlotModel(period.start, period.end)),
        this.formData.tuesday.map((period) => new ReservationTimeSlotModel(period.start, period.end)),
        this.formData.wednesday.map((period) => new ReservationTimeSlotModel(period.start, period.end)),
        this.formData.thursday.map((period) => new ReservationTimeSlotModel(period.start, period.end)),
        this.formData.friday.map((period) => new ReservationTimeSlotModel(period.start, period.end)),
        this.formData.saturday.map((period) => new ReservationTimeSlotModel(period.start, period.end))
      )
    },
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

