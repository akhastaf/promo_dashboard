<script setup lang="ts">
import Sidebar from '../components/Sidebar.vue'
import { RouterView } from 'vue-router'
import { ref } from 'vue';

const open = ref(false);
const closeSidebar = (show: boolean) => {
  open.value = show;
}

</script>

<template>
  <div class="w-full min-h-screen relative font-sans text-gray-900 bg-gray-50 md:flex">
    <div class="bg-gray-800 text-gray-100 flex justify-between p-4 min-w-max md:hidden">
      <a href="/" class="block text-white font-bold">
        <img  src="../assets/txthem-white.png" class="w-16 h-16" />
      </a>
      <button @click="open = !open" class="text-white">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>
    </div>
    
    <Sidebar :show="open" @close-sidebar="closeSidebar"></Sidebar>
    <div class="flex-1">
      <RouterView>
      </RouterView>
    </div>
  </div>
</template>