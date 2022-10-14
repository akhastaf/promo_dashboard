<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth'
import HomeView from './views/HomeView.vue'


const authStore = useAuthStore();

onMounted( () => {
  // console.log(authStore.user);
});

</script>

<template>
  <!-- <Table1></Table1> -->
  <RouterView v-if="!authStore.user"></RouterView>
  <HomeView v-else></HomeView>
  

</template>