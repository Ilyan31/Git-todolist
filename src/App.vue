<script setup lang="ts">
import { ref, computed } from "vue";
import TodoComponent from "./components/TodoComponent.vue";
import { onMounted } from "vue";

const monTableau = ref([
  { todo: "Apprendre Vue.js", done: false, priority: "Élevée" },
  { todo: "Faire le projet entreprise", done: false, priority: "Moyenne" },
  { todo: "Faire le projet de DEV", done: false, priority: "Faible" },
  { todo: "Obtenir le BTS", done: false, priority: "Faible" },
]);
onMounted(async () => {
  const todosRequest = await fetch('http://localhost:3000/todos')
  const todos = await todosRequest.json();
  monTableau.value = [...todos];
})

const completedCount = computed(
  () => monTableau.value.filter((task) => task.done).length
);
const allTasksCompleted = computed(
  () => completedCount.value === monTableau.value.length
);

const updateTodo = (newTodoValue: any, index: number) => {
  console.log('dans updateTodo',newTodoValue);
  monTableau.value[index] = newTodoValue;
};

const removeTodo = (index: number) => {
  monTableau.value.splice(index, 1);
};

const addTask = () => {
  const newTask = { todo: "Nouvelle tâche", done: false, priority: "Faible" };
  monTableau.value.push(newTask);
};
</script>

<template>
  <div class="todo-container">
    <h1>🌟 Ma Todo List 🌟</h1>

    <ul>
      <li v-for="(item, index) in monTableau" :key="index">
        <TodoComponent
          :todo="item"
          @updateTodo="updateTodo($event, index)"
          @remove="removeTodo(index)"
        />
      </li>
    </ul>

    <div v-if="allTasksCompleted" class="congrats">
      🎉 Félicitations, toutes les tâches sont complètes ! 🎉
    </div>

    <button @click="addTask">Ajouter une tâche</button>
  </div>
</template>

<style scoped>
.todo-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 12px;
  background-color: #f0f8ff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.congrats {
  margin-top: 20px;
  font-size: 1.2em;
  color: green;
  font-weight: bold;
}
</style>
