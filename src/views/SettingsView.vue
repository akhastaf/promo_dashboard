<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { onMounted, reactive } from 'vue';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import axiosClient from '@/helpers/axios';


const initialState = {
  name: '',
  phone: '',
  address: '',
  language: '',
  avatar: '',
}

const securityState = {
  password: '',
  new_password: '',
  password_confirmation: '',
}

const langauges = reactive([{
    code: 'en',
    lang: 'English'
  },
  {
    code: 'fr',
    lang: 'French'
  }
]);
const authStore = useAuthStore();

const form = reactive(initialState);
const formSecurity = reactive(securityState);

onMounted(() => console.log(authStore.user))

const updateSecurity = () => {
  // let user = new FormData();
  // user.append('password', formSecurity.password);
  // user.append('new_password', formSecurity.new_password);
  // user.append('password_confirmation', formSecurity.password_confirmation);
  axiosClient.patch('/users/me/security', formSecurity)
  .then((data) => {
    console.log(data);
    Object.assign(formSecurity, securityState);
  })
  .catch((error) => {
    console.log(error);
  })
}
const update = () => {
  let user = new FormData();
  user.append('name', form.name);
  user.append('phone', form.phone);
  user.append('address', form.address);
  user.append('language', form.language);
  user.append('avatar', form.avatar);
  axiosClient.patch('/users/me', user, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  .then((data) => {
    console.log(data);
    // Object.assign(formSecurity, securityState);
  })
  .catch((error) => {
    console.log(error);
  })

  axiosClient.get('/users/me').then((data) => {
    authStore.user = data.data;
    localStorage.setItem('user', JSON.stringify(data.data));
  })
}

</script>

<template>
  <main class="w-full py-8 px-2">
    <h1 class="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Settings</h1>
    <div class="w-ful flex py-8 px-2 items-start justify-start">
      <div class="bg-white m-4 w-1/2 p-8">
        <h2 class="text-2xl font-semibold">Informations</h2>
          <form @submit.prevent="update" action="post">
            <div class="grid grid-flow-row mt-6">
              <div class="mb-4">
                <div class="flex">
                  <label class="pr-4" for="avatar">Avatar</label>
                  <img :src="authStore.user!.avatar" alt="avatar" class="rounded-full w-24 h-24"/>
                  <input v-on="form.avatar" class="pl-4" type="file" />
                </div>
              </div>
              <div class="mb-4">
                  <label for="name" class="font-semibold">Name</label>
                  <input v-model="form.name" id="name" name="name" type="text" autocomplete="name" required class="mt-4 relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
              </div>
              <div class="mb-4">
                <label for="phone" class="font-semibold">Phone</label>
                <input v-model="form.phone" id="phone" name="phone" type="text" autocomplete="phone" required class="mt-4 relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
              </div>
              <div class="mb-4">
                <label for="address" class="font-semibold">Address</label>
                <input v-model="form.address" id="address" name="address" type="text" autocomplete="address" required class="mt-4 relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
              </div>
              <div class="mb-4">
                <label for="language" class="font-semibold mr-6">Language</label>
                <select v-model="form.language" id="language">
                  <option value="en">English</option>
                  <option value="fr">French</option>
                </select>
              </div>
            </div>
            <button type="submit" class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Save
            </button>
          </form>
      </div>
      <div class="bg-white mt-16 ml-4 w-1/2 p-8 h-auto">
        <h2 class="text-2xl font-semibold">Security</h2>
          <form @submit.prevent="updateSecurity" action="post">
            <div class="grid grid-flow-row mt-6">
              <div class="mb-4">
                  <label for="password" class="font-semibold">Password</label>
                  <input v-model="formSecurity.password" id="password" name="password" type="password" autocomplete="password" required class="mt-4 relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
              </div>
              <div class="mb-4">
                  <label for="new_password" class="font-semibold">new Password</label>
                  <input v-model="formSecurity.new_password"  id="new_password" name="new_password" type="password" required class="mt-4 relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
              </div>
              <div class="mb-4">
                  <label for="password_confirmation" class="font-semibold">Confirmation new Password</label>
                  <input v-model="formSecurity.password_confirmation"  id="password_confirmation" name="password_confirmation" type="password" required class="mt-4 relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
              </div>
              <button type="submit" class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Save
              </button>
            </div>
          </form>
      </div>
    </div>
  </main>
</template>
