<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';


const authStore = useAuthStore();
// const emit = defineEmits(['close']);

// const close = () => {
//     emit('close', false);
// }
// const props = defineProps({
//     open: {
//         type: Boolean,
//     }
// });

</script>

<template>
    <aside class="">
        <div class="bg-gray-200 h-full p-5 pt-8 relative w-20 md:w-72">
            <div class="py-6 px-10 ">
                <RouterLink to="/">
                    <img src="../assets/logo1.png" class="w-36 h-36"/>
                </RouterLink>
            </div>
        </div>
    </aside>
</template>