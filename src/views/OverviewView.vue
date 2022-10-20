<script setup lang="ts">
import axiosClient from '@/helpers/axios';
import { useAuthStore } from '@/stores/auth';
import { UserRole } from '@/types';
import { computed } from '@vue/reactivity';
import { onMounted, reactive } from 'vue';

  const authStore = useAuthStore();
  const allData = reactive({
    storesTotal: 0,
    moderatorsTotal: 0,
    customersTotal: 0,
    promotionsTotal: 0,
  });

  const moderators = computed(() => allData.moderatorsTotal);
  const stores = computed(() => allData.storesTotal);
  const customers = computed(() => allData.customersTotal);
  const promotions = computed(() => allData.promotionsTotal);

  onMounted(() => {
    axiosClient.get(`/users?role=${UserRole.MANAGER}`).then((data) => {
      allData.storesTotal = data.data.meta.totalItems;
    }).catch((error) => {
      console.log(error);
    });
    axiosClient.get(`/users?role=${UserRole.MODERATOR}`).then((data) => {
      allData.moderatorsTotal = data.data.meta.totalItems;
    }).catch((error) => {
      console.log(error);
    });
    axiosClient.get(`/promotions`).then((data) => {
      allData.promotionsTotal = data.data.meta.totalItems;
    }).catch((error) => {
      console.log(error);
    });
    axiosClient.get(`/customers`).then((data) => {
      allData.customersTotal = data.data.meta.totalItems;
    }).catch((error) => {
      console.log(error);
    });
  });

</script>
<template>
  <main class="w-full py-8 px-2">
    <h1 class="text-2xl font-semibold">{{ $t('overview') }}</h1>
    <div class="grid md:gap-16 md:grid-cols-2 p-16 grid-cols-1">
      <div v-if="authStore.user?.role === UserRole.ADMIN || authStore.user?.role === UserRole.MODERATOR" class="bg-white w-96 h-36 p-4">
        <h2 class="text-xl font-semibold">{{ $t('stores_title') }}</h2>
        <p class="text-5xl font-bold text-indigo-600">{{ stores }}</p>
      </div>
      <div v-if="authStore.user?.role === UserRole.ADMIN"  class="bg-white w-96 h-36 p-4">
        <h2 class="text-xl font-semibold">{{ $t('moderators_title') }}</h2>
        <p class="text-5xl font-bold text-indigo-600">{{ moderators }}</p>
      </div>
      <div v-if="authStore.user?.role != UserRole.MODERATOR" class="bg-white w-96 h-36 p-4">
        <h2 class="text-xl font-semibold">{{ $t('customers_title') }}</h2>
        <p class="text-5xl font-bold text-indigo-600">{{ customers }}</p>
      </div>
      <div v-if="authStore.user?.role != UserRole.MODERATOR"  class="bg-white w-96 h-36 p-4">
        <h2 class="text-xl font-semibold">{{ $t('promotions_title') }}</h2>
        <p class="text-5xl font-bold text-indigo-600">{{ promotions }}</p>
      </div>
    </div>
  </main>
</template>