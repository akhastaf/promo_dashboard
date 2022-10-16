<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const token = ref('');
const authtore = useAuthStore();
const form = reactive({
  password: '',
  password_confirmation: '',
  token: ''
});
// onMounted(() => {
//   console.log(route.query.token);
//   // token.value = route.query?.token.toS;
//   // console.log(route);
//   // console.log(route.query.token);
//   // form.token = route.query.token;
// });
</script>


<template>
  <main class="container mx-auto w1/2">
    <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="w-full max-w-md space-y-8">
        <div>
          <img class="mx-auto h-24 w-auto" src="../assets/logo1.png" alt="Your Company">
          <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">reset your password</h2>
        </div>
        <div class="bg-white p-10">
          <form @submit.prevent="authtore.reset(form.password, form.password_confirmation, )" class="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" value="true">
            <div class="-space-y-px rounded-md shadow-sm">
              <div class="mb-6">
                <label for="password" class="font-semibold">Password</label>
                <input id="password" v-model="form.password" name="password" type="password" autocomplete="current-password" required class="mt-4 relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
              </div>
              <div>
                <label for="password_confirmation" class="font-semibold">Password confirmation</label>
                <input id="password_confirmation" v-model="form.password_confirmation" name="password_confirmation" type="password" autocomplete="current-password" required class="mt-4 relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
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
                Reset password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>