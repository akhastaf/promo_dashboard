<script setup lang="ts">
    interface User {
        avatar: string,
        name: string,
        email: string,
        phone: string,
        created_at: string,
    };
    const props = defineProps<User>()
    
</script>

<template>
    <tr tabindex="0" class="focus:outline-none h-16 border border-gray-100 rounded">
        <td class="">
            <div class="flex items-center pl-5">
                <img class="rounded-full w-6 h-6" :src="props.avatar" />
            </div>
        </td>
        <td class="pl-24">
            <div class="flex items-center">
                <p class="text-sm leading-none text-gray-600 ml-2">{{ props.name }}</p>
            </div>
        </td>
        <td class="pl-5">
            <div class="flex items-center">
                <p class="text-sm leading-none text-gray-600 ml-2">{{ props.email }}</p>
            </div>
        </td>
        <td class="pl-5">
            <div class="flex items-center">
                <p class="text-sm leading-none text-gray-600 ml-2">{{ props.phone }}</p>
            </div>
        </td>
        <td class="pl-5">
            <div class="flex items-center">
                <p class="text-sm leading-none text-gray-600 ml-2">{{ props.created_at }}</p>
            </div>
        </td>
        <td>
            <div class="relative px-5 pt-2">
                <button class="focus:ring-2 rounded-md focus:outline-none" @click="ShowActions" role="button" aria-label="option">
                    <svg class="dropbtn" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M4.16667 10.8332C4.62691 10.8332 5 10.4601 5 9.99984C5 9.5396 4.62691 9.1665 4.16667 9.1665C3.70643 9.1665 3.33334 9.5396 3.33334 9.99984C3.33334 10.4601 3.70643 10.8332 4.16667 10.8332Z" stroke="#9CA3AF" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M10 10.8332C10.4602 10.8332 10.8333 10.4601 10.8333 9.99984C10.8333 9.5396 10.4602 9.1665 10 9.1665C9.53976 9.1665 9.16666 9.5396 9.16666 9.99984C9.16666 10.4601 9.53976 10.8332 10 10.8332Z" stroke="#9CA3AF" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M15.8333 10.8332C16.2936 10.8332 16.6667 10.4601 16.6667 9.99984C16.6667 9.5396 16.2936 9.1665 15.8333 9.1665C15.3731 9.1665 15 9.5396 15 9.99984C15 10.4601 15.3731 10.8332 15.8333 10.8332Z" stroke="#9CA3AF" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                </button>
                <div class="dropdown-content bg-white shadow w-24 absolute z-30 right-0 mr-6" v-if="show">
                    <div tabindex="0" class="focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">
                        <p>Edit</p>
                    </div>
                    <div tabindex="0" class="focus:outline-none focus:text-indigo-600 text-xs w-full hover:bg-indigo-700 py-4 px-4 cursor-pointer hover:text-white">
                        <p>Delete</p>
                    </div>
                </div>
            </div>
        </td>
    </tr>
</template>