<script setup lang="ts">
import axiosClient from '@/helpers/axios';
import { useAuthStore } from '@/stores/auth';
import { UserRole } from '@/types';
import { computed } from '@vue/reactivity';
import { onMounted, reactive } from 'vue';

  const authStore = useAuthStore();
  const allData = reactive({
    storesTotal: 0,
    salesmenTotal: 0,
    customersTotal: 0,
    promotionsTotal: 0,
  });

  const salesmen = computed(() => allData.salesmenTotal);
  const stores = computed(() => allData.storesTotal);
  const customers = computed(() => allData.customersTotal);
  const promotions = computed(() => allData.promotionsTotal);

  onMounted(() => {
    axiosClient.get(`/users?role=${UserRole.STORE}`).then((data) => {
      allData.storesTotal = data.data.meta.totalItems;
    }).catch((error) => {
    });
    axiosClient.get(`/users?role=${UserRole.SALESMAN}`).then((data) => {
      allData.salesmenTotal = data.data.meta.totalItems;
    }).catch((error) => {
    });
    axiosClient.get(`/promotions`).then((data) => {
      allData.promotionsTotal = data.data.meta.totalItems;
    }).catch((error) => {
    });
    axiosClient.get(`/customers`).then((data) => {
      allData.customersTotal = data.data.meta.totalItems;
    }).catch((error) => {
    });
  });

</script>
<template>
  <main class="w-full py-8 px-8">
    <h1 class="text-2xl font-semibold">{{ $t('overview') }}</h1>
    <div class="grid gap-16 md:grid-cols-2 p-6 md:p-16 grid-cols-1">
      <div v-if="authStore.user?.role === UserRole.ADMIN || authStore.user?.role === UserRole.SALESMAN" class="bg-white w-64 md:w-96 h-36 p-4 drop-shadow-md">
       <div class="flex text-indigo-600">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 mr-6">
            <path d="M2.879 7.121A3 3 0 007.5 6.66a2.997 2.997 0 002.5 1.34 2.997 2.997 0 002.5-1.34 3 3 0 104.622-3.78l-.293-.293A2 2 0 0015.415 2H4.585a2 2 0 00-1.414.586l-.292.292a3 3 0 000 4.243zM3 9.032a4.507 4.507 0 004.5-.29A4.48 4.48 0 0010 9.5a4.48 4.48 0 002.5-.758 4.507 4.507 0 004.5.29V16.5h.25a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75v-3.5a.75.75 0 00-.75-.75h-2.5a.75.75 0 00-.75.75v3.5a.75.75 0 01-.75.75h-4.5a.75.75 0 010-1.5H3V9.032z" />
        </svg>
        <h2 class="text-xl font-semibold">{{ $t('stores_title') }}</h2>
       </div>
        <p class="text-5xl font-bold text-indigo-600">{{ stores }}</p>
      </div>
      <div v-if="authStore.user?.role === UserRole.ADMIN"  class="bg-white w-64 md:w-96 h-36 p-4 drop-shadow-md">
        <div class="flex text-indigo-600">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 mr-6">
            <path fill-rule="evenodd" d="M3.792 2.938A49.069 49.069 0 0112 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 011.541 1.836v1.044a3 3 0 01-.879 2.121l-6.182 6.182a1.5 1.5 0 00-.439 1.061v2.927a3 3 0 01-1.658 2.684l-1.757.878A.75.75 0 019.75 21v-5.818a1.5 1.5 0 00-.44-1.06L3.13 7.938a3 3 0 01-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836z" clip-rule="evenodd" />
          </svg>
          <h2 class="text-xl font-semibold">{{ $t('salesmen_title') }}</h2>
        </div>
        <p class="text-5xl font-bold text-indigo-600">{{ salesmen }}</p>
      </div>
      <div v-if="authStore.user?.role != UserRole.SALESMAN" class="bg-white w-64 md:w-96 h-36 p-4 drop-shadow-md">
        <div class="flex text-indigo-600">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 mr-6">
            <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
          </svg>
          <h2 class="text-xl font-semibold">{{ $t('customers_title') }}</h2>
        </div>
        <p class="text-5xl font-bold text-indigo-600">{{ customers }}</p>
      </div>
      <div v-if="authStore.user?.role != UserRole.SALESMAN"  class="bg-white w-64 md:w-96 h-36 p-4 drop-shadow-md">
        <div class="flex text-indigo-600">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 mr-6">
            <path fill-rule="evenodd" d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902 1.168.188 2.352.327 3.55.414.28.02.521.18.642.413l1.713 3.293a.75.75 0 001.33 0l1.713-3.293a.783.783 0 01.642-.413 41.102 41.102 0 003.55-.414c1.437-.231 2.43-1.49 2.43-2.902V5.426c0-1.413-.993-2.67-2.43-2.902A41.289 41.289 0 0010 2zM6.75 6a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm0 2.5a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z" clip-rule="evenodd" />
        </svg>
        <h2 class="text-xl font-semibold">{{ $t('promotions_title') }}</h2>
        </div>
        <p class="text-5xl font-bold text-indigo-600">{{ promotions }}</p>
      </div>
    </div>
  </main>
</template>