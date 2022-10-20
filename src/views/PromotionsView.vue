<script setup lang="ts">
import axiosClient from '@/helpers/axios'
import { computed, onMounted, reactive, ref, watch } from "vue";
import { type PromotionPagination, UserRole, type User } from "@/types";
import { useAuthStore } from "@/stores/auth";
import TablePromotions from "../components/TablePromotions.vue";
import Pagination from "../components/Pagination.vue";
import SideForm from "../components/SideForm.vue";
import { useRoute } from 'vue-router';

const initialState = {
    title: '',
    description: '',
};
const authStore = useAuthStore();
const route = useRoute();
const promotions = ref<PromotionPagination>();
const store = ref<User>();
const open = ref(false);
const page = ref(1);
const form = reactive(initialState);

onMounted(async () => {
    getPage(page.value);
    const data = await axiosClient.get(`/users/${route.params.id ?? 0}`);
    store.value = data.data;
})

function getPage(newPage: number) {
    page.value = newPage;
    axiosClient.get(`/promotions/${route.params.id ?? 0}?page=${newPage}`).then((data) => {
        console.log('data', data.data);
        promotions.value = data.data;
        console.log('moderators', promotions);
    }).catch((error) => {
        console.log(error);
    });
}

const create = () => {
    // let promotion = new FormData();
    // promotion.append('title', form.title);
    // promotion.append('description', form.description);
    axiosClient.post('/promotions', form).then((data) => {
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

const remove = (id: number) => {
    axiosClient.delete(`/promotions/${id}`)
    .then((data) => {
        getPage(page.value);
        console.log(data);
    }).catch((error) => {
        console.log(error);
    });
}

const close = (show : boolean) => {
    open.value= show;
}

</script>
<template>
    <main class="w-full flex items-start justify-center py-8 px-2">
        <div class="sm:px-6 w-full">
            <div class="px-4 md:px-10 py-4 md:py-7">
                <div class="flex items-center justify-between">
                    <p class="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">{{ $t('promotion_title') }} {{ store?.name }}</p>
                    <!-- <div class="py-3 px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
                        <p>Sort By:</p>
                        <select aria-label="select" class="focus:text-indigo-600 focus:outline-none bg-transparent ml-1">
                            <option class="text-sm text-indigo-800">Oldest</option>
                            <option class="text-sm text-indigo-800">Latest</option>
                        </select>
                    </div> -->
                </div>
            </div>
            <div class="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
                <div class="sm:flex items-center justify-between">
                    <!-- <div class="flex items-center">
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
                    </div> -->
                    <button v-if="authStore.user!.role === UserRole.MANAGER" @click="open = true" class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                        <div class="flex justify-between">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-white">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        <p class="text-sm font-medium leading-none text-white">{{ $t('add_promotion') }}</p>
                        </div>
                    </button>
                </div>
                <div class="mt-7 overflow-x-auto">
                    <TablePromotions :promotions="promotions?.items ?? []" @remove="remove"></TablePromotions>
                </div>
                <Pagination :page="page" :pages="promotions?.meta.totalPages ?? 0" @change-page="getPage"></Pagination>
            </div>
        </div>            
    </main>
    <SideForm :open="open" @close="close">
    <template v-slot:title>{{ $t('form_promotion_title') }}</template>
    <div class="bg-white p-10">
        <form @submit.prevent="create"  class="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" value="true">
            <div class="-space-y-px rounded-md shadow-sm">
                <div class="mb-6">
                    <label for="title" class="font-semibold">{{ $t('title') }}</label>
                    <input id="title" v-model="form.title" name="title" type="text" autocomplete="title" required class="mt-4 relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                </div>
                <div>
                    <label for="description" class="font-semibold">{{ $t('description') }}</label>
                    <textarea id="description" v-model="form.description" name="description" type="text" required class="mt-4 relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                    </textarea>
                </div>
            </div>
            <div>
                <button type="submit" class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    {{ $t('form_promotion_btn') }}
                </button>
            </div>
        </form>
        </div>
    </SideForm>
</template>
<style>
/* .checkbox:checked + .check-icon {
    display: flex;
} */
</style>    

