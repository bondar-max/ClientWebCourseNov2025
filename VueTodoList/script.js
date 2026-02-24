"use strict";

const app = Vue.createApp({});

// Компонент отдельной задачи
app.component("TodoItem", {
    props: {
        todo: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            isEditing: false,
            editText: this.todo.text,
            showError: false
        };
    },

    template: `
      <li class="mb-2">
        <!-- Режим просмотра -->
        <div v-if="!isEditing" class="row">
          <div class="col text">{{ todo["text"] }}</div>
          <div class="col-auto">
            <button type="button" class="btn btn-primary me-2" @click="startEdit">Редактировать</button>
            <button type="button" class="btn btn-danger" @click="deleteTodo">Удалить</button>
          </div>
        </div>

        <!-- Режим редактирования -->
        <form v-else class="row" @submit.prevent="saveEdit">
          <div class="col">
            <input
                type="text"
                class="form-control"
                :class="{ 'is-invalid': showError }"
                v-model="editText"
                @keyup.esc="cancelEdit"
            >
            <div class="invalid-feedback">Нельзя сохранять пустое поле!</div>
          </div>
          <div class="col-auto">
            <button type="submit" class="btn btn-primary">Сохранить</button>
            <button type="button" class="btn btn-secondary" @click="cancelEdit">Отмена</button>
          </div>
        </form>
      </li>
    `,

    methods: {
        startEdit() {
            this.isEditing = true;
            this.editText = this.todo.text;
            this.showError = false;
        },

        saveEdit() {
            const trimmedText = this.editText.trim();

            if (trimmedText.length === 0) {
                this.showError = true;
                return;
            }

            this.$emit("update-todo", {
                id: this.todo.id,
                text: trimmedText
            });

            this.isEditing = false;
            this.showError = false;
        },

        cancelEdit() {
            this.isEditing = false;
            this.editText = this.todo.text;
            this.showError = false;
        },

        deleteTodo() {
            this.$emit("delete-todo", this.todo.id);
        }
    }
});

// Компонент списка задач
app.component("TodoList", {
    data() {
        return {
            todos: [],
            newTodoText: "",
            showError: false,
            nextId: 1
        };
    },

    template: `
      <div class="container">
        <h1>Todo List на Vue.js</h1>

        <!-- Форма добавления -->
        <form class="row mb-3" @submit.prevent="addTodo">
          <div class="col">
            <label for="new-todo-text" class="form-label visually-hidden">Новая заметка</label>
            <input
                id="new-todo-text"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': showError }"
                v-model="newTodoText"
                placeholder="Введите заметку">
            <div class="invalid-feedback">Необходимо заполнить поле</div>
          </div>
          <div class="col-auto">
            <button type="submit" class="btn btn-primary">Добавить</button>
          </div>
        </form>

        <!-- Список задач -->
        <ul class="list-unstyled">
          <todo-item
              v-for="todo in todos"
              :key="todo.id"
              :todo="todo"
              @delete-todo="deleteTodo"
              @update-todo="updateTodo"/>
        </ul>

        <!-- Информация о количестве задач -->
        <div v-if="todos.length > 0" class="text-muted">
          Всего задач: {{ todos.length }}
        </div>
        <div v-else class="text-muted">
          Список задач пуст. Добавьте первую задачу!
        </div>
      </div>
    `,

    methods: {
        addTodo() {
            const trimmedText = this.newTodoText.trim();

            if (trimmedText.length === 0) {
                this.showError = true;
                return;
            }

            this.todos.push({
                id: this.nextId++,
                text: trimmedText
            });

            this.newTodoText = "";
            this.showError = false;
        },

        deleteTodo(todoId) {
            this.todos = this.todos.filter(todo => todo.id !== todoId);
        },

        updateTodo(updatedTodo) {
            const index = this.todos.findIndex(todo => todo.id === updatedTodo.id);
            if (index !== -1) {
                this.todos[index].text = updatedTodo.text;
            }
        }
    }
});

// Монтируем приложение
app.mount("#app");