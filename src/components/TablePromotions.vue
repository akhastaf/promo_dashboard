<script setup lang="ts">
import { onMounted, ref } from "vue";
import { type Promotion, UserRole } from "@/types";
import { useAuthStore } from "@/stores/auth";

interface Props {
    promotions: Promotion[]
}

const authStore = useAuthStore();

const props = defineProps<Props>();

const emit = defineEmits(['remove']);

const remove = (id: number) => {
    emit('remove', id);
}

</script>
<template>
    <table class="w-full whitespace-nowrap">
        <thead>
            <th class="pl-5 text-left">
               <p class="ml-2">{{ $t('title') }}</p>
            </th>
            <th class="pl-5 text-left">
               <p class="ml-2">{{ $t('description') }}</p>
            </th>
            <th class="pl-5 text-left">
               <p class="ml-2">{{ $t('created_at') }}</p>
            </th>
            <th v-if="authStore.user?.role === UserRole.STORE" class="pl-5 text-left">
               <p class="ml-2">{{ $t('actions') }}</p>
            </th>
        </thead>
        <tbody>
            <tr v-for="promotion in promotions" class="">
                <td class="pl-5 py-2">
                    <div class="flex items-start">
                        <p class="text-lg font-semibold leading-none text-gray-600 ml-2">{{ promotion.title }}</p>
                    </div>
                </td>
                <td class="pl-5 py-2">
                    <div class="flex items-start">
                        <p class="text-lg leading-none text-gray-600 ml-2">{{ promotion.description }}</p>
                    </div>
                </td>
                <td class="pl-5 py-2">
                    <div class="flex items-start">
                        <p class="text-lg leading-none text-gray-600 ml-2">{{ promotion.createdAt }}</p>
                    </div>
                </td>
                <td class="pl-5">
                    <button @click="remove(promotion.id)" v-if="authStore.user?.role === UserRole.STORE">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-700 hover:text-indigo-600">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>