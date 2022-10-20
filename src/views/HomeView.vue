<script setup lang="ts">
import Sidebar from '../components/Sidebar.vue'
import { RouterView } from 'vue-router'
import Footer from '../components/Footer.vue'
import NewSide from '../components/NewSide.vue'
import { ref } from 'vue';

// const open = ref(true);

</script>

<template>
  <!-- <div class="block fixed md:hidden w-full h-14 bg-indigo-900 p-5 z-50">
    <div @click="open = !open">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-white">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>

    </div>
  </div> -->
  <div class="w-full min-h-screen font-sans text-gray-900 bg-gray-50 flex">
    
    <!-- <NewSide v-if="open"></NewSide> -->
    <Sidebar></Sidebar>
    <RouterView class="mt-6">
    </RouterView>
    <!-- <Footer></Footer> -->
  </div>
</template>
