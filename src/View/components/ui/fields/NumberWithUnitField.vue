<template>
  <div class="form-group w-100">
    <label :for="name" class="form-label">{{ label }}</label>
    <div class="input-group">
      <input 
        type="number" 
        class="form-control" 
        :id="name"
        :name="name"
        :value="value"
        @input="handleChange"
      >
      <span class="input-group-text bg-secondary text-white">{{ unitText }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NumberWithUnitField',
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
      type: [Number, String],
      required: true
    },
    unitText: {
      type: String,
      required: true
    },
    handleChange: {
      type: Function,
      required: true
    }
  }
}
</script>

