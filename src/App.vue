<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import Sidebar from './components/Sidebar.vue'
import LoginView from './views/LoginView.vue'




</script>

<template>
  <div class="w-full min-h-screen font-sans text-gray-900 bg-gray-50 flex">
    <LoginView></LoginView>
    <!-- <Sidebar></Sidebar>
    <RouterView /> -->
  </div>

</template>