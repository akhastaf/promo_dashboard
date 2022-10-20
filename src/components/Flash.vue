<script setup lang="ts">

const props = defineProps({
    message: {
        type: String,
        default: '',
    },
    success: {
        typeof: Boolean,
        default: true,
    },
    show: {
        typeof: Boolean,
        default: true,
    }
});

</script>
<template>
    <p v-if="show"
    :class="success ? 'bg-green-200 text-green-600' : 'bg-red-200 text-red-600'"
    class="py-1 px-4 rounded-md">{{ message }}</p>
</template>