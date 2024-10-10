<template>
  <div>
    <h1>Todo List</h1>
    <!-- Votre template ici -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';

export default defineComponent({
  setup() {
    const todos = ref<string[]>([]);

    onMounted(async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.get('http://localhost:3000/todolist', {
          headers: { Authorization: token },
        });
        todos.value = response.data.todos;
      }
    });

    return { todos };
  }
});
</script>

<style scoped>
/* Vos styles ici */
</style>