<script setup lang="ts">
    import { RouterLink } from 'vue-router';
    const props = defineProps({
        link: String,
        name: String,
        icon: String,
    });

</script>

<template>
    <RouterLink :to="link ?? ''" class="flex gap-x-4 items-center py-2 text-gray-500 hover:text-indigo-600 group">
        <!-- class="flex gap-x-4 items-center py-2 text-gray-500 hover:text-indigo-600 group" -->
        <span
            class="absolute w-1.5 h-8 bg-indigo-600 rounded-r-full left-0 scale-y-0 -translate-x-full group-hover:scale-y-100 group-hover:translate-x-0 transition-transform ease-in-out"
        />
        <img :src="icon" class="w-6 h-6 fill-current" />
        <span>{{ name }}</span>
    </RouterLink>
</template>