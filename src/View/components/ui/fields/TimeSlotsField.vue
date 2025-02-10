<template>
  <div class="form-group w-100">
    <label :for="name" class="form-label">{{ label }}</label>
    
    <div class="input-group" @click="openTimeSelector">
      <input 
        type="text"
        class="form-control" 
        :id="name"
        :name="name"
        :value="displayValue"
        readonly
        :placeholder="$t('pleaseSelectFromTheOptions')"
      >
      <span class="input-group-text">
        <i class="bi bi-clock"></i>
      </span>
    </div>

    <div class="mt-2">
      <div v-for="(period, index) in value" :key="index" class="badge bg-secondary me-2 mb-2">
        {{ formatPeriod(period) }}
        <i class="bi bi-x-circle ms-1" style="cursor: pointer" @click="removePeriod(index)"></i>
      </div>
    </div>

    <!-- Bootstrap Modal for Time Selection -->
    <div class="modal fade" :id="`timeSelectModal-${name}`" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ $t('selectTimePeriod') }}</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-6">
                <label>{{ $t('startTime') }}</label>
                <input 
                  type="time" 
                  class="form-control" 
                  v-model="tempStartTime"
                  :max="tempEndTime"
                >
              </div>
              <div class="col-6">
                <label>{{ $t('endTime') }}</label>
                <input 
                  type="time" 
                  class="form-control" 
                  v-model="tempEndTime"
                  :min="tempStartTime"
                >
              </div>
            </div>
            <div v-if="errorMsg" class="alert alert-danger mt-2">
              {{ errorMsg }}
            </div>
          </div>
          <div class="modal-footer row d-flex flex-row">
            <div class="text-center col-12 col-md-auto">
              <FoodicsTertiaryBtn :onClick="handleCancel">{{ $t('cancel') }}</FoodicsTertiaryBtn>
            </div>
            <div class="col-12 col-md-auto">
              <FoodicsSecondaryBtn :onClick="handleSave">{{ $t('save') }}</FoodicsSecondaryBtn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap'
import FoodicsSecondaryBtn from '../buttons/FoodicsSecondaryBtn.vue';
import FoodicsTertiaryBtn from '../buttons/FoodicsTertiaryBtn.vue';

export default {
  name: 'TimeSlotsField',
  components: {
    FoodicsSecondaryBtn,
    FoodicsTertiaryBtn
  },
  props: {
    label: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    value: {
      type: Array,
      required: true,
      default: () => []
    },
    handleChange: {
      type: Function,
      required: true
    },
    maxSlots: {
      type: Number,
      required: false, 
      default: 5
    }
  },
  data() {
    return {
      tempStartTime: '',
      tempEndTime: '',
      modal: null,
      errorMsg: ''
    }
  },
  computed: {
    displayValue() {
      if (!this.value.length) return ''
      return this.value.map(period => this.formatPeriod(period)).join(', ')
    }
  },
  mounted() {
    this.modal = new Modal(document.getElementById(`timeSelectModal-${this.name}`))
  },
  methods: {
    openTimeSelector() { 
      if (this.value.length >= this.maxSlots) {
        this.errorMsg = this.$t('error.maximumTimeSlotsAllowed', { maxSlots: this.maxSlots })
        return
      }
      this.errorMsg = ''
      this.tempStartTime = ''
      this.tempEndTime = ''
      this.modal.show()
    },
    closeModal() {
      if (this.modal) {
        this.modal.hide()
        this.tempStartTime = ''
        this.tempEndTime = ''
        this.errorMsg = ''
      }
    },
    formatPeriod(period) {
      // Convert 24h times to 12h format for display
      const formatTime = (time) => {
        const [hours, minutes] = time.split(':')
        const hour = parseInt(hours)
        const ampm = hour >= 12 ? 'PM' : 'AM'
        const hour12 = hour % 12 || 12
        return `${hour12}:${minutes} ${ampm}`
      }
      return `${formatTime(period.start)} - ${formatTime(period.end)}`
    },
    removePeriod(index) {
      const newValue = [...this.value]
      newValue.splice(index, 1)
      this.handleChange({
        target: {
          name: this.name,
          value: newValue
        }
      })
    },
    handleCancel() {
      this.closeModal()
    },
    handleSave() {
      if (!this.tempStartTime || !this.tempEndTime) {
        this.errorMsg = this.$t('error.required')
        return
      }

      if (this.tempStartTime >= this.tempEndTime) {
        this.errorMsg = this.$t('startTimeMustBeBeforeEndTime')
        return
      }

      if (this.value.length >= this.maxSlots) {
        this.errorMsg = this.$t('error.maximumTimeSlotsAllowed', { maxSlots: this.maxSlots })
        return
      }

      const newPeriod = {
        start: this.tempStartTime,
        end: this.tempEndTime
      }
      const newValue = [...this.value, newPeriod]
      this.handleChange({
        target: {
          name: this.name,
          value: newValue
        }
      })
      this.closeModal()
    }
  }
}
</script>
