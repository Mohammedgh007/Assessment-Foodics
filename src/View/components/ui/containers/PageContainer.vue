/**
 * This is used below the header to contain the page content.
 */
<template>
  <div class="container page-container py-4 px-4 top-margin">
    <div class="row">  
        <div class="col-12">
            <slot/>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageContainer',
  props: {
    
  }
}
</script>

<style scoped>
.page-container {
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
}

.top-margin {
  margin-top: 4rem;
}

</style>


