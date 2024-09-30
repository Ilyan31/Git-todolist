<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from "vue";

const props = defineProps<{
  todo: { done: boolean; todo: string; priority: string };
}>();

const emit = defineEmits(["updateTodo", "remove"]);

const editMode = ref(false);
const taskInput = ref(props.todo.todo);
const priorityInput = ref(props.todo.priority);

const startEditTask = () => {
  editMode.value = true;
};
  
const confirmEditTask = () => {
  if (taskInput.value.trim()) {
    emit("updateTodo", {
      ...props.todo,
      todo: taskInput.value,
      priority: priorityInput.value,
    });
    editMode.value = false;
  }
};

const cancelEditTask = () => {
  taskInput.value = props.todo.todo;
  priorityInput.value = props.todo.priority;
  editMode.value = false;
};

const deleteTask = () => {
  emit("remove");
};

const toggleDone = () => {
  emit("updateTodo", { ...props.todo, done: !props.todo.done });
};
</script>

<template>
  <div class="task-item">
    <div v-if="!editMode">
      <span @click="startEditTask" :class="props.todo.priority">{{
        props.todo.todo
      }}</span>
      <input type="checkbox" :checked="props.todo.done" @change="toggleDone" />
      <button @click="deleteTask">❌</button>
    </div>

    <div v-if="editMode" class="edit-task">
      <input v-model="taskInput" placeholder="Modifier la tâche" />
      <select v-model="priorityInput">
        <option value="Faible">Faible</option>
        <option value="Moyenne">Moyenne</option>
        <option value="Élevée">Élevée</option>
      </select>
      <button @click="confirmEditTask">Confirmer</button>
      <button @click="cancelEditTask">Annuler</button>
    </div>
  </div>
</template>

<style scoped>
.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
}

.edit-task {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 10px;
}

input[type="checkbox"] {
  margin-left: 10px;
}

button {
  border: none;
  background-color: #ff6f61;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  padding: 4px 8px;
}

button:hover {
  background-color: #e65a50;
}

.done span {
  text-decoration: line-through;
  color: gray;
}

.Élevée {
  color: red;
  font-weight: bold;
}

.Moyenne {
  color: orange;
}

.Faible {
  color: green;
}
</style>
