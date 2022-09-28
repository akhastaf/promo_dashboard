<script setup lang="ts">
import TableRow from "./UserRow.vue";
import Actions from "./Actions.vue";
    interface Users {
        users: User[],
    };
    interface User {
        avatar: string,
        name: string,
        email: string,
        phone: string,
        created_at: string,
    };
    const props = defineProps<Users>();
</script>
<template>
    <table class="w-full whitespace-nowrap">
        <tbody>
            <tr v-for="user in props.users">
                <td class="">
                    <div class="flex items-center pl-5">
                        <img class="rounded-full w-6 h-6" :src="user.avatar" />
                    </div>
                </td>
                <td class="pl-24">
                    <div class="flex items-center">
                        <p class="text-sm leading-none text-gray-600 ml-2">{{ user.name }}</p>
                    </div>
                </td>
                <td class="pl-5">
                    <div class="flex items-center">
                        <p class="text-sm leading-none text-gray-600 ml-2">{{ user.email }}</p>
                    </div>
                </td>
                <td class="pl-5">
                    <div class="flex items-center">
                        <p class="text-sm leading-none text-gray-600 ml-2">{{ user.phone }}</p>
                    </div>
                </td>
                <td class="pl-5">
                    <div class="flex items-center">
                        <p class="text-sm leading-none text-gray-600 ml-2">{{ user.created_at }}</p>
                    </div>
                </td>
                <td>
                    <actions link="test"></actions>
                </td>
            </tr>
        </tbody>
    </table>
</template>