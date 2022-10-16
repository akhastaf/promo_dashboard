<script setup lang="ts">
import axiosClient from '@/helpers/axios';
import { useAuthStore } from '@/stores/auth';
import { UserRole } from '@/types';
import { onMounted, reactive } from 'vue';

  const authStore = useAuthStore();
  const allData = reactive({
    stores: Number,
    moderators: Number,
    customers: Number,
    promotions: Number,
  });

  onMounted(() => {
    axiosClient.get(`/users?role=${UserRole.MANAGER}`).then((data) => {
      allData.stores = data.data.meta.totalItems;
    }).catch((error) => {
      console.log(error);
    });
    axiosClient.get(`/users?role=${UserRole.MODERATOR}`).then((data) => {
      allData.moderators = data.data.meta.totalItems;
    }).catch((error) => {
      console.log(error);
    });
    axiosClient.get(`/promotions`).then((data) => {
      allData.promotions = data.data.meta.totalItems;
    }).catch((error) => {
      console.log(error);
    });
    axiosClient.get(`/customers`).then((data) => {
      allData.customers = data.data.meta.totalItems;
    }).catch((error) => {
      console.log(error);
    });
  })
</script>
<template>
  <main class="w-full py-8 px-2">
    <h1 class="text-2xl font-semibold">Overview</h1>
    <div class="grid gap-16 grid-cols-2 p-16">
      <div v-if="authStore.user?.role === UserRole.ADMIN || authStore.user?.role === UserRole.MODERATOR" class="bg-white w-96 h-36 p-4">
        <h2 class="text-xl font-semibold">Stores</h2>
        <p class="text-5xl font-bold text-indigo-600">{{ allData.stores }}</p>
      </div>
      <div v-if="authStore.user?.role === UserRole.ADMIN"  class="bg-white w-96 h-36 p-4">
        <h2 class="text-xl font-semibold">Moderators</h2>
        <p class="text-5xl font-bold text-indigo-600">{{ allData.moderators }}</p>
      </div>
      <div v-if="authStore.user?.role != UserRole.MODERATOR" class="bg-white w-96 h-36 p-4">
        <h2 class="text-xl font-semibold">Customers</h2>
        <p class="text-5xl font-bold text-indigo-600">{{ allData.customers }}</p>
      </div>
      <div v-if="authStore.user?.role != UserRole.MODERATOR"  class="bg-white w-96 h-36 p-4">
        <h2 class="text-xl font-semibold">Promotions</h2>
        <p class="text-5xl font-bold text-indigo-600">{{ allData.promotions }}</p>
      </div>
    </div>
  </main>
</template>