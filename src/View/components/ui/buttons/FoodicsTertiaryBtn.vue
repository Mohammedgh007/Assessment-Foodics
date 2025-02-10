/**
 * This is a tertiary button that is used as a text button.
 */
<template>
  <button 
    class="btn btn-link text-primary text-decoration-underline mx-0 px-0"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'FoodicsTertiaryBtn',
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
.btn-link:hover {
  text-decoration: underline !important;
}
</style>
