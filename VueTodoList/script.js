"use strict";

const app = Vue.createApp({});

// Компонент отдельной задачи
app.component("TodoItem", {
    props: {
        listItem: {
            type: Object,
            required: true
        }
    },

    emits: ["delete-todo-item", "update-todo-item"],

    data() {
        return {
            isEditing: false,
            editText: this.listItem.text,
            isError: false
        };
    },

    computed: {
        itemText() {
            return this.listItem.text;
        }
    },

    template: `
      <li class="mb-2">
        <!-- Режим просмотра -->
        <div v-if="!isEditing" class="row">
          <div class="col text">{{ itemText }}</div>
          <div class="col-auto">
            <button type="button" class="btn btn-primary me-2" @click="startEditing">Редактировать</button>
            <button type="button" class="btn btn-danger" @click="deleteItem">Удалить</button>
          </div>
        </div>

        <!-- Режим редактирования -->
        <form v-else class="row" @submit.prevent="saveEditing">
          <div class="col">
            <input type="text" class="form-control" :class="{ 'is-invalid': isError }" v-model="editText" @keyup.esc="cancelEditing">
            <div class="invalid-feedback">Нельзя сохранять пустое поле!</div>
          </div>
          <div class="col-auto">
            <button type="submit" class="btn btn-primary me-2">Сохранить</button>
            <button type="button" class="btn btn-secondary" @click="cancelEditing">Отмена</button>
          </div>
        </form>
      </li>
    `,

    methods: {
        startEditing() {
            this.isEditing = true;
            this.editText = this.listItem.text;
            this.isError = false;
        },

        saveEditing() {
            const trimmedText = this.editText.trim();

            if (trimmedText.length === 0) {
                this.isError = true;
                return;
            }

            this.$emit("update-todo-item", {
                id: this.listItem.id,
                text: trimmedText
            });

            this.isEditing = false;
            this.isError = false;
        },

        cancelEditing() {
            this.isEditing = false;
            this.editText = this.listItem.text;
            this.isError = false;
        },

        deleteItem() {
            this.$emit("delete-todo-item", this.listItem.id);
        }
    }
});

// Компонент списка задач
app.component("TodoList", {
    data() {
        return {
            items: [],
            newTodoItemText: "",
            isError: false,
            nextId: 1
        };
    },

    template: `
      <div class="container pt-2">
        <h1>Todo List на Vue.js</h1>

        <!-- Форма добавления -->
        <form class="row mb-3" @submit.prevent="addItem">
          <div class="col">
            <label for="new-todo-item-text" class="form-label visually-hidden">Новая заметка</label>
            <input
                id="new-todo-item-text"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': isError }"
                v-model="newTodoItemText"
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
              v-for="item in items"
              :key="item.id"
              :listItem="item"
              @delete-todo-item="deleteItem"
              @update-todo-item="updateItem"/>
        </ul>

        <!-- Информация о количестве задач -->
        <div v-if="items.length > 0" class="text-muted">
          Всего задач: {{ items.length }}
        </div>
        <div v-else class="text-muted">
          Список задач пуст. Добавьте первую задачу!
        </div>
      </div>
    `,

    methods: {
        addItem() {
            const trimmedText = this.newTodoItemText.trim();

            if (trimmedText.length === 0) {
                this.isError = true;
                return;
            }

            this.nextId++;

            this.items.push({
                id: this.nextId,
                text: trimmedText
            });

            this.newTodoItemText = "";
            this.isError = false;
        },

        deleteItem(itemId) {
            this.items = this.items.filter(item => item.id !== itemId);
        },

        updateItem(updatedItem) {
            this.items = this.items.map(item =>
                item.id === updatedItem.id ? updatedItem : item
            );
        }
    }
});

// Монтируем приложение
app.mount("#app");