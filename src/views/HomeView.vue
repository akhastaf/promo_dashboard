<script setup lang="ts">
import Sidebar from '../components/Sidebar.vue'
import { RouterView } from 'vue-router'
import Footer from '../components/Footer.vue'
</script>

<template>
  <div class="w-full min-h-screen font-sans text-gray-900 bg-gray-50 flex">
    <Sidebar>
      
    </Sidebar>
    <RouterView>
    </RouterView>
    <!-- <Footer></Footer> -->
  </div>
</template>
