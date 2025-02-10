<template>
    <b-navbar toggleable="lg" class="header navbar-nav px-4 py-2 mb-4">
      <div class="container py-2 d-flex justify-content-between align-items-center w-100">
        <b-navbar-brand href="#" class="text-dark">
          <img :src="currentLanguage === 'ar' ? require('@/assets/logo-ar.svg') : require('@/assets/logo-en.svg')" alt="Website Logo" class="logo-img"/>
        </b-navbar-brand>

        <div class="d-flex align-items-center text-primary">
          <!-- Language Switcher -->
          <b-nav-item @click="switchLanguage" class="nav-item d-flex align-items-center me-3 text-primary btn">
            <i class="bi bi-globe fs-6 mx-1"></i>
            {{ $t('language') }}
          </b-nav-item>

          <!-- Account Button -->
          <b-nav-item @click="logout" class="nav-item d-flex align-items-center me-3 text-primary btn">
            <i class="bi bi-person-circle mx-1"></i>
            {{ $t('profile') }}
          </b-nav-item>
        </div>
      </div>
    </b-navbar>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentLanguage: 'en', // Default language
      };
    },
    methods: {
      switchLanguage() {
        this.currentLanguage = this.currentLanguage === 'en' ? 'ar' : 'en';
        this.$store.dispatch('changeLanguage', this.currentLanguage);
      },
      logout() {
        // Handle logout logic
      },
    },
  };
  </script>
  
  <style scoped>
  .header {
    background-color: white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .b-navbar-brand .logo-img {
    width: 40px;
    height: auto;
    margin-right: 10px;
  }
  
  .navbar-nav .nav-link {
    color: var(--bs-primary);
  }
  
  .nav-item:hover{
    background-color: rgba(68, 0, 153, 0.1);
    border-radius: 4px;
  }
  
  .nav-item {
    color: var(--bs-primary);
  }
  </style>