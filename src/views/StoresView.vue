<script setup lang="ts">
import axiosClient from '@/helpers/axios'
import { onMounted, reactive, ref, watch } from "vue";
import { type UserPagination, UserRole } from "@/types";
import TableUsers from '@/components/TableUsers.vue';
import SideForm from '@/components/SideForm.vue';
import Pagination from '../components/Pagination.vue';
import { SwitchGroup, SwitchLabel, Switch } from '@headlessui/vue'

const initialState = {
    name: '',
    email: '',
    phone: '',
    address: '',
    isActive: false,
    role: UserRole.MANAGER,
    password_confirmation: '',
    password: '',
};
const stores = ref<UserPagination>();
const page = ref(1);
const open = ref(false);
const form = reactive(initialState);

onMounted( () => {
    getPage(page.value);
})

function getPage(newPage: number) {
    page.value = newPage;
    axiosClient.get(`/users?page=${newPage}&limit=1&role=${UserRole.MANAGER}`).then((data) => {
        // console.log('data', data.data);
        stores.value = data.data;
        if (page.value > (stores.value?.meta.totalPages ?? 0))
            getPage(stores.value?.meta.totalPages ?? 0);
        // console.log('Stores', stores);
    }).catch((error) => {
        console.log(error);
    });
}

const create = () => {
    let user = new FormData();
    user.append('name', form.name);
    user.append('email', form.email);
    user.append('password', form.password);
    user.append('password_confirmation', form.password_confirmation);
    user.append('phone', form.phone);
    user.append('address', form.address);
    user.append('isActive', form.isActive.toString());
    user.append('role', form.role);
    // user.append('avatar', form.avatar);
    axiosClient.post('/users', user, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
    }).then((data) => {
        console.log(data);
        Object.assign(form, initialState);
        open.value = false;
        getPage(page.value);
        // alert('success');

        //   load();
        // router.push('/moderators');
    }).catch((err) => {
        console.log(err);
    });
}

const closeSide = (openSide: boolean) => {
    open.value = openSide;
}

const remove = (id: number) => {
    axiosClient.delete(`/users/${id}`)
    .then((data) => {
        getPage(page.value);
        console.log(data);
    }).catch((error) => {
        console.log(error);
    });
}
const edit = (id: number) => {
    open.value = true;
    Object.assign(form, stores.value?.items.find((item) => item.id === id) ?? initialState);
}

</script>
<template>
   <main class="w-full flex items-start justify-center py-8 px-2">
        <div class="sm:px-6 w-full">
            <div class="px-4 md:px-10 py-4 md:py-7">
                <div class="flex items-center justify-between">
                    <p tabindex="0" class="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Stores</p>
                    <div class="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
                        <p>Sort By:</p>
                        <select aria-label="select" class="focus:text-indigo-600 focus:outline-none bg-transparent ml-1">
                            <option class="text-sm text-indigo-800">Latest</option>
                            <option class="text-sm text-indigo-800">Oldest</option>
                            <option class="text-sm text-indigo-800">Latest</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
                <div class="sm:flex items-center justify-between">
                    <div class="flex items-center">
                        <a class="rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800" href=" javascript:void(0)">
                            <div class="py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full">
                                <p>All</p>
                            </div>
                        </a>
                        <a class="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8" href="javascript:void(0)">
                            <div class="py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full ">
                                <p>Done</p>
                            </div>
                        </a>
                        <a class="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8" href="javascript:void(0)">
                            <div class="py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full ">
                                <p>Pending</p>
                            </div>
                        </a>
                    </div>
                    <button @click="open = true" class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                        <div class="flex justify-between">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-white">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        <p class="text-sm font-medium leading-none text-white">Add Store</p>
                        </div>
                    </button>
                </div>
                <div class="mt-7 overflow-x-auto">
                    <TableUsers :users="stores?.items ?? []" @remove="remove" @edit="edit"></TableUsers>
                </div>
                <Pagination :page="page" :pages="stores?.meta.totalPages ?? 0" @change-page="getPage"></Pagination>
            </div>
        </div>            
    </main>
    <SideForm :open="open" @close="closeSide">
        <template v-slot:title>Create new store</template>
        <div class="bg-white p-10">
            <form @submit.prevent="create"  class="mt-8 space-y-6" action="#" method="POST">
                <input type="hidden" name="remember" value="true">
                <div class="-space-y-px rounded-md shadow-sm">
                    <div class="mb-6">
                        <label for="email-address" class="font-semibold">Email address</label>
                        <input id="email-address" v-model="form.email" name="email" type="email" autocomplete="email" required class="mt-4 relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                    </div>
                    <div class="mb-6">
                        <label for="name" class="font-semibold">Name</label>
                        <input id="name" v-model="form.name" name="name" type="text" autocomplete="name" required class="mt-4 relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                    </div>
                    <div class="mb-6">
                        <label for="phone" class="font-semibold">Phone</label>
                        <input id="phone" v-model="form.phone" name="phone" type="phone" autocomplete="phone" required class="mt-4 relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                    </div>
                    <div class="mb-6">
                        <label for="address" class="font-semibold">Address</label>
                        <input id="address" v-model="form.address" name="address" type="text" autocomplete="address" required class="mt-4 relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                    </div>
                    <SwitchGroup>
                        <div class="mb-6">
                            <SwitchLabel for="status" class="font-semibold">Status</SwitchLabel>
                            <Switch
                                v-model="form.isActive"
                                :class='form.isActive ? "bg-indigo-600" : "bg-gray-200"'
                                class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                <span
                                :class='form.isActive ? "translate-x-6" : "translate-x-1"'
                                class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                                />
                            </Switch>
                            <!-- <input id="status" v-model="form.isActive" name="status" type="checkbox" /> -->
                        </div>
                    </SwitchGroup>
                    <div class="mb-6">
                        <label for="password" class="font-semibold">Password</label>
                        <input id="password" v-model="form.password" name="password" type="password" autocomplete="current-password" required class="mt-4 relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                    </div>
                    <div class="mb-6">
                        <label for="password_confirmation" class="font-semibold">Password</label>
                        <input id="password_confirmation" v-model="form.password_confirmation" name="password_confirmation" type="password" autocomplete="current-password" required class="mt-4 relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                    </div>
                </div>
                <div>
                    <button type="submit" class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        Create Moderator
                    </button>
                </div>
            </form>
            </div>
    </SideForm>
</template>