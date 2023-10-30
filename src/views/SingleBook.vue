<template>
    <div>
        <p>Single book</p>
        <div v-if="bookStore.specificBook !== null">{{ bookStore.specificBook?.title }}- written by
            <span>{{ bookStore.specificBook?.author }}</span>
        </div>
    </div>
</template>

<script setup>
import { useBookStore } from '../stores/book';
const bookStore = useBookStore();
const route = useRoute();
onMounted(() => {
    bookStore.getSingleBook(route.params.id);
});
</script>
