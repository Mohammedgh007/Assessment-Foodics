/**
 * This is a secondary button that is used as an outlined button.
 */
<template>
  <button 
    class="btn btn-outline-primary w-100"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'FoodicsSecondaryBtn',
  props: {
    onClick: {
      type: Function,
      required: true
    }
  },
  methods: {
    handleClick() {
      this.onClick()
    }
  }
}
</script>

<style scoped>
</style>
