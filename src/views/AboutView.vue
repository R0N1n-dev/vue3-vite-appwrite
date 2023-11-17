<script setup>
import { useUserStore } from "../stores/user";
import { useBookStore } from "../stores/book";
const bookStore = useBookStore();
const userStore = useUserStore();
onMounted(() => {
  bookStore.init();
});
</script>

<template>
  <h2>Books</h2>
  <section v-if="bookStore.books">
    <ul>
      <li v-for="book in bookStore.books">
        <strong>{{ book.title }}</strong>
        <p>{{ book.description }}</p>
        <router-link :to="{ name: 'singleBook', params: { id: book.$id } }">See</router-link>
        <button v-if="userStore.user && book.userId === userStore.user.$id" type="button"
          @click="bookStore.remove(book.$id)">
          Remove
        </button>
      </li>
    </ul>
  </section>
</template>
