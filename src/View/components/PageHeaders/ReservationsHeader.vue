/**
 * This contains page title and main actions buttons.
 */
<template>
    <div class="row">
      <div class="col-12">
        <div class="row d-flex justify-content-between align-items-center">
          <div class="col-8">
            <h2>{{ $t('reservations') }}</h2>
          </div>
          <div class="col-4">
            <div class="row">
              <div class="col-6">
                <FoodicsSecondaryBtn :onClick="handleClickDisableReservationsBtn">{{ $t('disableReservations') }}</FoodicsSecondaryBtn>
              </div>
              <div class="col-6">
                <FoodicsPrimaryBtn :onClick="handleClickAddBranchBtn">{{ $t('addBranch') }}</FoodicsPrimaryBtn>
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