<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { onMounted, reactive, ref } from 'vue';
import { Listbox, ListboxButton, ListboxOptions, ListboxOption } from '@headlessui/vue'
import axiosClient from '@/helpers/axios';
import Flash from '../components/Flash.vue';
import { useI18n } from 'vue-i18n'


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
  },
  {
    code: 'es',
    lang: 'Spanish'
  }
]);
const authStore = useAuthStore();
const i18n = useI18n({ useScope: 'global' });
const form = reactive(initialState);
const formSecurity = reactive(securityState);
const message = ref('');
const success = ref(false);
const showSecurity = ref(false)
const show = ref(false)

onMounted(() => {
  axiosClient.get('/users/me')
  .then((data) => {
    Object.assign(form, data.data);
    form.avatar = '';
  })
})

const updateSecurity = () => {
  axiosClient.patch('/users/me/security', formSecurity)
  .then((data) => {
    Object.assign(formSecurity, securityState);
    message.value = 'Success';
    showSecurity.value = true;
    success.value= true;
  })
  .catch((error) => {
    message.value = error.response.data.message;;
    showSecurity.value = true;
    success.value= false;
  })
}
const update = () => {
  let user = new FormData();
  user.append('name', form.name);
  user.append('phone', form.phone);
  user.append('address', form.address);
  user.append('language', form.language);
  if (form.avatar)
    user.append('avatar', form.avatar);
  axiosClient.patch('/users/me', user, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  .then((data) => {
    message.value = 'Success';
    show.value = true;
    success.value= true;
    i18n.locale.value = form.language;
    Object.assign(formSecurity, initialState);
  })
  .catch((error) => {
    message.value = error.response.data.message;
    show.value = true;
    success.value= false;
  })

  axiosClient.get('/users/me').then((data) => {
    authStore.user = data.data;
    localStorage.setItem('user', JSON.stringify(data.data));
  })
}
const handleAvatar = (event: any) => {
  form.avatar = event.target.files[0];
}

</script>

<template>
  <main class="md:p-8 p-2">
    <h1 class="focus:outline-none text-2xl font-bold leading-normal text-gray-800">Settings</h1>
    <div class="w-ful md:flex py-8 px-2 md:items-start md:justify-start">
      <div class="bg-white  md:mt-16 md:ml-4 w-full md:w-1/2 md:p-8 p-2 h-auto drop-shadow-md">
        <h2 class="text-2xl font-semibold">{{ $t('settings_information') }}</h2>
          <form @submit.prevent="update" action="post">
            <Flash :message="message" :show="show" :success="success"></Flash>
            <div class="grid grid-flow-row mt-6">
              <div class="mb-4">
                <div class="md:flex">
                  <label class="md:pr-4 mb-4" for="avatar">Avatar</label>
                  <img :src="authStore.user!.avatar" alt="avatar" class="rounded-full w-24 h-24 mb-4"/>
                  <input @change="handleAvatar" class="pl-4" type="file" />
                </div>
              </div>
              <div class="mb-4">
                <label for="name" class="font-semibold">{{ $t('name') }}</label>
                <input v-model="form.name" id="name" name="name" type="text" autocomplete="name" required class="mt-4 relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
              </div>
              <div class="mb-4">
                <label for="phone" class="font-semibold">{{ $t('phone') }}</label>
                <input v-model="form.phone" id="phone" name="phone" type="text" autocomplete="phone" required class="mt-4 relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
              </div>
              <div class="mb-4">
                <label for="address" class="font-semibold">{{ $t('address') }}</label>
                <input v-model="form.address" id="address" name="address" type="text" autocomplete="address" required class="mt-4 relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
              </div>
              <div class="mb-4">
                <label for="language" class="font-semibold mr-6">{{ $t('language') }}</label>
                <select v-model="form.language" id="language">
                  <option value="en">{{ $t('language_english') }}</option>
                  <option value="fr">{{ $t('language_french') }}</option>
                </select>
              </div>
            </div>
            <button type="submit" class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Save
            </button>
          </form>
        </div>
        <div class="bg-white mt-16 md:ml-4 w-full md:w-1/2 md:p-8 p-2 h-auto drop-shadow-md">
          <h2 class="text-2xl font-semibold">{{ $t('settings_security') }}</h2>
          <form @submit.prevent="updateSecurity" action="post">
            <Flash :message="message" :show="showSecurity" :success="success"></Flash>
            <div class="grid grid-flow-row mt-6">
              <div class="mb-4">
                  <label for="password" class="font-semibold">{{ $t('password') }}</label>
                  <input v-model="formSecurity.password" id="password" name="password" type="password" autocomplete="password" required class="mt-4 relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
              </div>
              <div class="mb-4">
                  <label for="new_password" class="font-semibold">{{ $t('new_password') }}</label>
                  <input v-model="formSecurity.new_password"  id="new_password" name="new_password" type="password" required class="mt-4 relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
              </div>
              <div class="mb-4">
                  <label for="password_confirmation" class="font-semibold">{{ $t('new_password_confirmation') }}</label>
                  <input v-model="formSecurity.password_confirmation"  id="password_confirmation" name="password_confirmation" type="password" required class="mt-4 relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
              </div>
              <button type="submit" class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                {{ $t('save_btn') }}
              </button>
            </div>
          </form>
      </div>
    </div>
  </main>
</template>
