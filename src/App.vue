<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth'
import HomeView from './views/HomeView.vue'
import { useI18n } from 'vue-i18n'

const authStore = useAuthStore();
const i18n = useI18n({ useScope: 'global' });

onMounted( () => {
  // if (authStore.user === null)
  //   authStore.getUser();

 i18n.locale.value = authStore.user?.language ?? 'en';
});

</script>

<template>
  <!-- <Table1></Table1> -->
  <RouterView v-if="!authStore.user"></RouterView>
  <HomeView v-else></HomeView>
  

</template>