<template>
  <footer class="bg-primary text-white py-3 mt-auto">
    <div class="container text-center">
      {{ $t('footerText') }}
    </div>
  </footer>
</template>

<script>
export default {
  name: 'MainFooter'
}
</script>

<style scoped>
footer {
  width: 100%;
}
</style>
