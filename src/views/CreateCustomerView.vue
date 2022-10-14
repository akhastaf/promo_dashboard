<script setup lang="ts">
import axiosClient from '@/helpers/axios';
import router from '@/router';
import { reactive, ref } from 'vue';
import Modal from '../components/Modal.vue';
const init = {
  full_name: '',
  phone: ''
};
const form = reactive(init)

const open = ref(false);
const error = ref(false);
const errorMessage = ref('');

function create(id: string) {
    console.log(id);

    axiosClient.post(`/customers/${id}`, form)
        .then((data) => {
            Object.assign(form, init);
            open.value = true;
        })
        .catch((err) => {
            open.value = true;
            error.value = true;
            errorMessage.value = err.response.data.message;
        });
}

</script>

<template>
  <main class="container mx-auto w1/2">
    <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="w-full max-w-md space-y-8">
        <div>
          <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company">
          <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Subscribe to store</h2>
        </div>
        <div class="bg-white p-10">
          <form @submit.prevent="create($route.params.id)" class="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" value="true">
            <div class="-space-y-px rounded-md shadow-sm">
              <div class="mb-6">
                <label for="fullname" class="font-semibold">Full name</label>
                <input id="fullname" v-model="form.full_name" name="fullname" type="text" autocomplete="fullname" required class="mt-4 relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
              </div>
              <div>
                <label for="phone" class="font-semibold">Phone</label>
                <input id="phone" v-model="form.phone" name="phone" type="phone" autocomplete="current-phone" required class="mt-4 relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
              </div>
            </div>

            <div class="flex items-center justify-between">
              <p>by clicking subscribe button you are agree to recive sms from the store</p>
            </div>

            <div>
              <button type="submit" class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                  <!-- Heroicon name: mini/lock-closed -->
                  <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
                  </svg>
                </span>
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
  <Modal :open="open">
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div class="sm:flex sm:items-start">
        <div :class="error ? 'bg-red-100' : 'bg-green-100'" class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10">
            <svg v-if="error" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>

            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6 text-green-600">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
        </div>
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <DialogTitle v-if="!error" as="h3" class="text-lg font-medium leading-6 text-gray-900">Congratulation</DialogTitle>
            <DialogTitle v-else as="h3" class="text-lg font-medium leading-6 text-gray-900">Error</DialogTitle>
            <div class="mt-2">
            <p v-if="error" class="text-sm text-gray-500">{{ errorMessage }}</p>
            <p v-else class="text-sm text-gray-500">Your subscription is success.</p>
            </div>
        </div>
        </div>
    </div>
    <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click="open = false" ref="cancelButtonRef">OK</button>
    </div>
  </Modal>
</template>