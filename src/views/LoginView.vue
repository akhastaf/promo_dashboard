<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { reactive, ref } from 'vue';

const authStore = useAuthStore();
const form = reactive({
  username: '',
  password: ''
})
</script>

<template>
  <main class="container mx-auto w1/2">
    <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="w-full max-w-md space-y-8">
        <div>
          <img class="mx-auto h-24 w-auto" src="../assets/logo.png" alt="Your Company">
          <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">{{ $t('signin_title') }}</h2>
        </div>
        <div class="text-red-600">
          <p>{{ authStore.errorMessage }}</p>
        </div>
        <div class="bg-white p-4">
          <form @submit.prevent="authStore.login(form.username, form.password)" class="mt-4 space-y-6" action="#" method="POST">
            <!-- <input type="hidden" name="remember" value="true"> -->
            <div class="-space-y-px rounded-md shadow-sm">
              <div class="mb-6">
                <label for="email-address" class="font-semibold">{{ $t('email_address') }}</label>
                <input id="email-address" v-model="form.username" name="email" type="email" autocomplete="email" required class="mt-4 relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
              </div>
              <div>
                <label for="password" class="font-semibold">{{ $t('password') }}</label>
                <input id="password" v-model="form.password" name="password" type="password" autocomplete="current-password" required class="mt-4 relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
              </div>
            </div>

            <div class="flex items-end justify-between">
              <div class="text-sm">
                <RouterLink to="forget" class="font-medium text-indigo-600 hover:text-indigo-500">
                  {{ $t('forget_btn') }}
                </RouterLink>
              </div>
            </div>

            <div>
              <button type="submit" class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                  <!-- Heroicon name: mini/lock-closed -->
                  <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
                  </svg>
                </span>
                {{ $t('sign_in') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>
