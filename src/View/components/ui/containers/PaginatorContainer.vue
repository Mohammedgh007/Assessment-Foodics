<template>
  <nav aria-label="Page navigation" class="d-flex justify-content-center">
    <ul class="pagination justify-content-center">
      <!-- Previous button -->
      <li class="page-item" :class="{ disabled: currPageIndex === 0 }">
        <a class="page-link" href="#" @click.prevent="handleClickPage(currPageIndex - 1)" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>

      <!-- First page -->
      <li class="page-item" :class="{ active: currPageIndex === 0 }">
        <a class="page-link" href="#" @click.prevent="handleClickPage(0)">1</a>
      </li>

      <!-- Left ellipsis -->
      <li v-if="currPageIndex > 4" class="page-item disabled">
        <span class="page-link">...</span>
      </li>

      <!-- Page numbers -->
      <li v-for="pageNum in visiblePages" :key="pageNum" class="page-item" 
          :class="{ active: currPageIndex === pageNum - 1 }">
        <a class="page-link" href="#" @click.prevent="handleClickPage(pageNum - 1)">
          {{ pageNum }}
        </a>
      </li>

      <!-- Right ellipsis -->
      <li v-if="currPageIndex < totalPages - 5" class="page-item disabled">
        <span class="page-link">...</span>
      </li>

      <!-- Last page -->
      <li v-if="totalPages > 1" class="page-item" 
          :class="{ active: currPageIndex === totalPages - 1 }">
        <a class="page-link" href="#" @click.prevent="handleClickPage(totalPages - 1)">
          {{ totalPages }}
        </a>
      </li>

      <!-- Next button -->
      <li class="page-item" :class="{ disabled: currPageIndex >= totalPages - 1 }">
        <a class="page-link" href="#" @click.prevent="handleClickPage(currPageIndex + 1)" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'PaginatorContainer',
  props: {
    currPageIndex: {
      type: Number,
      required: true,
      default: 0
    },
    totalPages: {
      type: Number,
      required: true,
      default: 1
    },
    handleClickPage: {
      type: Function,
      required: true
    }
  },
  computed: {
    visiblePages() {
      const pages = [];
      let start = Math.max(2, this.currPageIndex - 2);
      let end = Math.min(this.totalPages - 1, start + 4);
      
      // Adjust start if end is too close to totalPages
      if (end === this.totalPages - 1) {
        start = Math.max(2, end - 4);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      return pages;
    }
  }
}
</script>

<style scoped>
.page-link {
  cursor: pointer;
  border: none !important;
  background: none !important;
  color: var(--bs-primary) !important;
  font-weight: 300;
}

.page-item.disabled .page-link {
  cursor: not-allowed;
  color: var(--bs-gray-500) !important;
}

.page-item.active .page-link {
  text-decoration: underline;
  font-weight: bold;
  color: var(--bs-primary) !important;
}
</style>
