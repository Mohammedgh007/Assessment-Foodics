<template>
  <button 
    class="btn btn-primary w-100"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'FoodicsPrimaryBtn',
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

