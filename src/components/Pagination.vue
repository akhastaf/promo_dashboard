<script setup lang="ts">
import { computed } from 'vue';


const emit = defineEmits(['changePage']);

const props = defineProps({
    page: {
        type: Number,
        default: 0,
    },
    pages: {
        type: Number,
        default: 0,
    }
});

const hasPrevious = computed(() => {
     if (props.page > 1)
        return true;
    return false;
})
const hasNext = computed(() => {
    if (props.page < props.pages )
        return true;
    return false;
});
const getPages = computed(() => {
    const pagesArr = [];
    let start = props.page - 2;
    let end = props.page + 2;
    if(end > props.pages){
        start -= (end - props.page);
        end = props.pages;
    }
    if(start <= 0){
        end += ((start - 1) * (-1));
        start=1;
    }
    end = end > props.pages ? props.pages : end;
    for (let i = start; i <= end; i++)
        pagesArr.push(i);
    return pagesArr;
});

const changePage = (newpage: Number) => {
    emit('changePage', newpage)
}

</script>

<template>
    <div v-if="pages" class="flex gap-x-2 justify-center pt-8">
        <button @click="changePage(page - 1)" v-if="hasPrevious" class="flex justify-center items-center w-8 h-8">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
        </button>
        <button
            v-for="i in getPages"
            @click="changePage(i)"
            class="flex items-center justify-center w-8 h-8 font-medium rounded-full"
            :disabled="i === page"
            :class="
            i === page ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-indigo-600'
            "
        >
            {{ i }}
        </button>
        <button @click="changePage(page + 1)" v-if="hasNext" class="flex justify-center items-center w-8 h-8">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
        </button>
    </div>
</template>