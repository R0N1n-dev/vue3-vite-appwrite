<template>
  <div>
    <input type="file" name="image" @change="setFile" />
    <button @click.prevent="sendImage">Send</button>
  </div>
</template>

<script setup>
import { useBookStore } from '../stores/book';
const bookStore = useBookStore();
const file = ref(null);
function setFile(e) {
  file.value = e.target.files[0];
  console.log(file.value.name);
}

function sendImage() {
  try {
    if (file.value !== null) {
      bookStore.addImage(file.value.name, file.value);
    } else {
      alert('No image');
      return;
    }
  } catch (error) {
    alert(error.message);
  }
}
</script>
