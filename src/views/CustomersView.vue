<script setup lang="ts">
import axiosClient from '@/helpers/axios'
import { computed, onMounted, ref, watch } from "vue";
import type { CustomerPagination } from "@/types";
import TableCustomer from '@/components/TableCustomer.vue'
import Pagination from '../components/Pagination.vue'
import Footer from '../components/Footer.vue'

const customers = ref<CustomerPagination>();

const page = ref(1);
onMounted( () => {
    getPage(page.value);
})
function getPage(newPage: number) {
    page.value = newPage;
    axiosClient.get(`/customers?page=${newPage}`).then((data) => {
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
                </div>
            </div>
            <div class="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
                <div class="mt-7 overflow-x-auto">
                    <TableCustomer :customers="customers?.items ?? []" @remove="remove"></TableCustomer>
                </div>
                <Pagination :page="page" :pages="customers?.meta.totalPages ?? 0" @change-page="getPage"></Pagination>
            </div>
            <!-- <Footer></Footer> -->
        </div>            
    </main>
</template>  

