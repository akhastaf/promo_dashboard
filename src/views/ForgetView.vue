<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { reactive, ref } from 'vue';

const authtore = useAuthStore();
const email = '';

 
</script>

<template>
  <main class="container mx-auto w1/2">
    <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="w-full max-w-md space-y-8">
        <div>
          <img class="mx-auto h-24 w-auto" src="../assets/logo1.png" alt="Your Company">
          <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">{{ $t('forget_title') }}</h2>
        </div>
        <div class="bg-white p-10">
          <form @submit.prevent="authtore.forget(email)" class="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" value="true">
            <div class="-space-y-px rounded-md shadow-sm">
              <div class="mb-6">
                <label for="email-address" class="font-semibold">{{ $t('email_address') }}</label>
                <input id="email-address" v-model="email" name="email" type="email" autocomplete="email" required class="mt-4 relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
              </div>
            </div>

            <div class="flex items-end justify-between">
              <div class="text-sm">
                <RouterLink to="/login" class="font-medium text-indigo-600 hover:text-indigo-500">{{ $t('back_to_login') }}</RouterLink>
              </div>
            </div>

            <div>
              <button type="submit" class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                {{ $t('forget_reset_btn') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>