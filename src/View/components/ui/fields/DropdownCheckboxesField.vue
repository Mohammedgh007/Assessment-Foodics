<template>
  <div class="form-group w-100">
    <label :for="name" class="form-label">{{ label }}</label>
    <div class="dropdown w-100">
      <button 
        class="form-control text-start dropdown-toggle" 
        type="button" 
        :id="name" 
        data-bs-toggle="dropdown" 
        aria-expanded="false"
      >
        {{ displayText }}
      </button>
      <div class="dropdown-menu w-100 p-2" @click.stop>
        <div class="form-check" v-for="(option, index) in options" :key="index">
          <input 
            class="form-check-input" 
            type="checkbox" 
            :id="`${name}-${index}`"
            :checked="value.includes(index)"
            @change="handleCheckboxChange(index)"
          >
          <label class="form-check-label" :for="`${name}-${index}`" @click.stop>
            {{ option }}
          </label>
        </div>
        <div class="d-flex justify-content-end mt-2 border-top pt-2">
          <button 
            class="btn btn-primary btn-sm" 
            @click="closeDropdown"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Dropdown } from 'bootstrap'

export default {
  name: 'DropdownCheckboxesField',
  props: {
    label: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    /* Value is an array of indices of the options that are selected */
    value: {
      type: Array,
      required: true
    },
    /* Options is an array of strings */
    options: {
      type: Array,
      required: true
    },
    handleChange: {
      type: Function,
      required: true
    }
  },
  computed: {
    displayText() {
      if (this.value.length === 0) {
        return this.$t('pleaseSelectFromTheOptions')
      }
      if (this.value.length === 1) {
        return this.options[this.value[0]]
      }
      return `${this.options[this.value[0]]}, ...`
    }
  },
  methods: {
    handleCheckboxChange(index) {
      const newValue = [...this.value]
      const indexInArray = newValue.indexOf(index)
      
      if (indexInArray === -1) {
        newValue.push(index)
      } else {
        newValue.splice(indexInArray, 1)
      }

      this.handleChange({
        target: {
          name: this.name,
          value: newValue
        }
      })
    },
    closeDropdown() {
      const dropdownButton = document.getElementById(this.name)
      const dropdown = Dropdown.getInstance(dropdownButton)
      if (dropdown) {
        dropdown.hide()
      }
    }
  }
}
</script>

<style scoped>
.dropdown-menu {
  max-height: 300px;
  overflow-y: auto;
}
</style>
