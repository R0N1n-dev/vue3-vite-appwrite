<script setup>
import { useUserStore } from "../stores/user";
import { useTaskStore } from "../stores/task";
const taskStore = useTaskStore();
const userStore = useUserStore();
const title = ref("");
const description = ref([]);


onMounted(() => {
  taskStore.init();
});
</script>

<template>
  <h2>Tasks</h2>
  <section v-if="userStore.user">
    <h2>Submit task</h2>

    <form>
      <input type="text" placeholder="Title" v-model="title" />
      <textarea placeholder="Description" v-model="description"></textarea>
      <button type="button">Submit</button>
    </form>
  </section>
  <section v-else>
    <p>Please login to submit an task.</p>
  </section>

  <section v-if="taskStore.tasks">
    <h2>Latest tasks</h2>
    <ul>
      <li v-for="task in taskStore.tasks">
        <strong>{{ task.title }}</strong>
        <p>{{ task.description }}</p>
        <button v-if="userStore.user && task.userId === userStore.user.$id" type="button"
          @click="taskStore.remove(task.$id)">
          Remove
        </button>
      </li>
    </ul>
  </section>
</template>
