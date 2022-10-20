<script setup lang="ts">
import axiosClient from '@/helpers/axios'
import { computed, onMounted, ref, watch } from "vue";
import { type CustomerPagination, UserRole, type User } from "@/types";
import TableCustomer from '@/components/TableCustomer.vue'
import Pagination from '../components/Pagination.vue'
import Footer from '../components/Footer.vue'
import { useAuthStore } from '@/stores/auth';
import { useRouter, useRoute } from 'vue-router';

const authStore = useAuthStore();
const customers = ref<CustomerPagination>();
const store = ref<User>();
const router = useRouter()
const route = useRoute()


const page = ref(1);
onMounted( async () =>  {
    getPage(page.value);
    const data = await axiosClient.get(`/users/${route.params.id ?? 0}`);
    store.value = data.data;
})
function getPage(newPage: number) {
    page.value = newPage;
    axiosClient.get(`/customers/${route.params.id ?? 0}?page=${newPage}`).then((data) => {
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

const getQrCode = () => {
    axiosClient.get('/users/qr', {
        responseType: 'blob',
    })
    .then((data) => {
        const fileURL = window.URL.createObjectURL(new Blob([data.data]));
        const fileLink = document.createElement('a');

        fileLink.href = fileURL;
        fileLink.setAttribute('download', `${authStore.user.name}.pdf`);
        document.body.appendChild(fileLink);

        fileLink.click();
    })
    .catch((error) => console.log(error));
}

</script>
<template>
    <main class="w-full flex items-start justify-center py-8 px-2">
        <div class="sm:px-6 w-full">
            <div class="flex justify-between px-4 md:px-10 py-4 md:py-7">
                <div class="flex items-center justify-between">
                    <p tabindex="0" class="focus:outline-none text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">{{ $t('customer_title') }} {{ store?.name}}</p>
                </div>
                <button v-if="authStore.user.role === UserRole.MANAGER" @click="getQrCode" class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                    <div class="flex justify-between">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-white">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <p class="text-sm font-medium leading-none text-white">{{ $t('qrcode_btn') }}</p>
                    </div>
                </button>
            </div>
            <div class="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10">
                <div class="mt-7 overflow-x-auto">
                    <TableCustomer :customers="customers?.items ?? []" @remove="remove"></TableCustomer>
                </div>
                <Pagination :page="page" :pages="customers?.meta?.totalPages ?? 0" @change-page="getPage"></Pagination>
            </div>
            <!-- <Footer></Footer> -->
        </div>            
    </main>
</template>  

