<script setup>
import { useUserStore } from '../stores/user';
const store = useUserStore();
</script>

<template>
  <main>
    <div v-if="store.user === null">U r unauthorized, User</div>
    <BookForm />
  </main>
</template>
