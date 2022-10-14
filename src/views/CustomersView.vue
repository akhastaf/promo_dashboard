<script setup lang="ts">
import axiosClient from '@/helpers/axios'
import { computed, onMounted, ref, watch } from "vue";
import type { CustomerPagination } from "@/types";
import TableCustomer from '@/components/TableCustomer.vue'
import Pagination from '../components/Pagination.vue'

const customers = ref<CustomerPagination>();

const page = ref(1);
const createSide = ref(false);

onMounted( () => {
    getPage(page.value);
})
function getPage(newPage: number) {
    page.value = newPage;
    axiosClient.get(`/customers?page=${newPage}&limit=1`).then((data) => {
        console.log('data', data.data);
        customers.value = data.data;
        console.log('moderators', customers);
    }).catch((error) => {
        console.log(error);
    });
}

const remove = (id: number) => {
    axiosClient.delete(`/customers/${id}`)
    .then((data) => {
        getPage(page.value);
        console.log(data);
    }).catch((error) => {
        console.log(error);
    });
}

</script>
<template>
    <main class="w-full flex items-start justify-center py-8 px-2">
        <div class="sm:px-6 w-full">
            <div class="px-4 md:px-10 py-4 md:py-7">
                <div class="flex items-center justify-between">
                    <p tabindex="0" class="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">Customers</p>
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
                </div>
                <div class="mt-7 overflow-x-auto">
                    <TableCustomer :customers="customers?.items ?? []" @remove="remove"></TableCustomer>
                </div>
                <Pagination :page="page" :pages="customers?.meta.totalPages ?? 0" @change-page="getPage"></Pagination>
            </div>
        </div>            
    </main>
</template>
<style>
/* .checkbox:checked + .check-icon {
    display: flex;
} */
</style>    

