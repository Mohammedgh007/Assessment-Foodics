/**
 * This contains page title and main actions buttons.
 */
<template>
    <div class="row">
      <div class="col-12">
        <div class="row d-flex flex-column flex-sm-row justify-content-center align-items-center">
          <div class="col-12 col-md-6 mb-3 mb-md-0 d-flex">
            <h2 class="text-md-start"> {{ $t('reservations') }} </h2>
          </div>
          <div class="col-12 col-md-6">
            <div class="row g-2">
              <div class="col-12 col-md-6">
                <FoodicsSecondaryBtn class="w-100" :onClick="handleClickDisableReservationsBtn">{{ $t('disableReservations') }}</FoodicsSecondaryBtn>
              </div>
              <div class="col-12 col-md-6">
                <FoodicsPrimaryBtn class="w-100" :onClick="handleClickAddBranchBtn">{{ $t('addBranch') }}</FoodicsPrimaryBtn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import FoodicsPrimaryBtn from '@/View/components/ui/buttons/FoodicsPrimaryBtn.vue';
  import FoodicsSecondaryBtn from '@/View/components/ui/buttons/FoodicsSecondaryBtn.vue';
  
  export default {
    name: 'ReservationsHeader',
    props: {
      handleClickAddBranchBtn: {
        type: Function,
        required: true
      },
      handleClickDisableReservationsBtn: {
        type: Function,
        required: true
      }
    },
    components: {
      FoodicsPrimaryBtn,
      FoodicsSecondaryBtn
    }
  }
  </script>