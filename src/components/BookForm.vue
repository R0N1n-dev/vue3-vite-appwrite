<script setup>
//import { useUserStore } from "../stores/user";
import { useBookStore } from "../stores/book";
const bookStore = useBookStore();
//const userStore = useUserStore();
const title = ref("");
const author = ref("");
const category = ref("");
const summary = ref("");
function addBook() {
  let book = {
    userId: userStore.user.$id,
    title: title.value,
    author: author.value,
    summary: summary.value,
    category: category.value
  };
  try {
    bookStore.add(book);
    title.value = '';
    author.value = '';
    summary.value = '';
    category.value = '';
  } catch (error) {
    alert(error.message);
  }
}
</script>

<template>
  <div>New book</div>
  <section>
    <h2>Submit book</h2>

    <form>
      <input type="text" placeholder="Title" v-model="title" />
      <input type="text" v-model="author">
      <input type="text" v-model="category">
      <textarea placeholder="Description" v-model="summary"></textarea>
      <button type="button" @click="addBook()">Submit</button>
    </form>
  </section>
</template>
