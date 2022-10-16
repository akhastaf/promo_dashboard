<script setup lang="ts">
import axiosClient from '@/helpers/axios'
import { UserRole, type UserPagination } from '@/types';
import { computed, onMounted, reactive, ref, watch } from "vue";
import TableUsers from "../components/TableUsers.vue";
import Pagination from "../components/Pagination.vue";
import SideForm from '@/components/SideForm.vue';
import { SwitchGroup, SwitchLabel, Switch } from '@headlessui/vue'

const initialState = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    address: '',
    isActive: false,
    role: UserRole.MODERATOR,
};
const moderators = ref<UserPagination>();
const order = ref('email');
const tab = ref('all');
const page = ref(1);
const open = ref(false);
const form = reactive(initialState);
const editMode = ref(false);

onMounted( () => {
    getPage(page.value);
})

watch(() => order.value, (neworder) => {
    getPage(1);
});
watch(() => tab.value, (newtab) => {
    getPage(1);
});

function getPage(newPage: number) {
    page.value = newPage;
    axiosClient.get(`/users?page=${newPage}&role=${UserRole.MODERATOR}`)
    .then((data) => {
        // console.log('data', data.data);
        moderators.value = data.data;
        if (tab.value === 'active')
            moderators.value!.items = moderators.value!.items.filter((item) => item.isActive === true);
        else if (tab.value === 'inactive')
            moderators.value!.items = moderators.value!.items.filter((item) => item.isActive === false);
        if (page.value > (moderators.value?.meta.totalPages ?? 0))
            getPage(moderators.value?.meta.totalPages ?? 0);
        // console.log('Stores', stores);
    }).catch((error) => {
        console.log(error);
    });
}

const create = () => {
    let user = new FormData();
    user.append('name', form.name);
    user.append('email', form.email);
    // user.append('password', form.password);
    // user.append('password_confirmation', form.password_confirmation);
    user.append('phone', form.phone);
    user.append('address', form.address);
    user.append('isActive', form.isActive.toString());
    user.append('role', form.role);
    // user.append('avatar', form.avatar);
    console.log(user);
    if (editMode.value) {
        axiosClient.patch(`/users/${form.id}`, user, {
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
    else {
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
    editMode.value = true;
    Object.assign(form, moderators.value?.items.find((item) => item.id === id) ?? initialState);
}
</script>
<template>
  <main class="w-full flex items-start justify-center py-8 px-2">
        <div class="sm:px-6 w-full">
            <div class="px-4 md:px-10 py-4 md:py-7">
                <div class="flex items-center justify-between">
                    <p tabindex="0" class="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Moderators</p>
                    <div class="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
                        <p>Sort By:</p>
                        <select v-model="order" aria-label="select" class="focus:text-indigo-600 focus:outline-none bg-transparent ml-1">
                            <option value="email" class="text-sm text-indigo-800">Email</option>
                            <option value="name" class="text-sm text-indigo-800">Name</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
                <div class="sm:flex items-center justify-between">
                    <div class="flex items-center">
                        <a @click="tab = 'all'" class="rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800 cursor-pointer">
                            <div :class="tab === 'all' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600'" class="py-2 px-8  rounded-full">
                                <p>All</p>
                            </div>
                        </a>
                        <a @click="tab = 'active'" class="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8 cursor-pointer">
                            <div :class="tab === 'active' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:text-indigo-700 hover:bg-indigo-100'" class="py-2 px-8 rounded-full ">
                                <p>Active</p>
                            </div>
                        </a>
                        <a @click="tab = 'inactive'" class="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8 cursor-pointer">
                            <div :class="tab === 'inactive' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:text-indigo-700 hover:bg-indigo-100'" class="py-2 px-8 rounded-full ">
                                <p>Inctive</p>
                            </div>
                        </a>
                    </div>
                    <button @click="open = true" class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                        <div class="flex justify-between">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-white">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        <p class="text-sm font-medium leading-none text-white">Add Moderator</p>
                        </div>
                    </button>
                </div>
                <div class="mt-7 overflow-x-auto">
                    <TableUsers :users="moderators?.items ?? []" @remove="remove" @edit="edit"></TableUsers>
                </div>
                <Pagination :page="page" :pages="moderators?.meta.totalPages ?? 0" @change-page="getPage"></Pagination>
            </div>
        </div>            
    </main>
    <SideForm :open="open" @close="closeSide">
        <template v-slot:title>{{ editMode ? 'Update moderatore' : 'Create new moderator'}}</template>
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
                        <input id="phone" v-model="form.phone" name="phone" type="phone" autocomplete="phone" class="mt-4 relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                    </div>
                    <div class="mb-6">
                        <label for="address" class="font-semibold">Address</label>
                        <input id="address" v-model="form.address" name="address" type="text" autocomplete="address" class="mt-4 relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
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
                        </div>
                    </SwitchGroup>
                </div>
                <div>
                    <button type="submit" class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                        {{ editMode ? 'Update' : 'Create' }}
                    </button>
                </div>
            </form>
            </div>
    </SideForm>
</template>