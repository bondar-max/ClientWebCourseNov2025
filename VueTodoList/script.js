"use strict";

const app = Vue.createApp({});

// Компонент отдельной задачи
app.component("TodoItem", {
    props: {
        item: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            isEditing: false,
            editText: this.item.text,
            showError: false
        };
    },

    template: `
      <li class="mb-2">
        <!-- Режим просмотра -->
        <div v-if="!isEditing" class="row">
          <div class="col text">{{ item["text"] }}</div>
          <div class="col-auto">
            <button type="button" class="btn btn-primary me-2" @click="startEditing">Редактировать</button>
            <button type="button" class="btn btn-danger" @click="deleteItem">Удалить</button>
          </div>
        </div>

        <!-- Режим редактирования -->
        <form v-else class="row" @submit.prevent="saveEditing">
          <div class="col">
            <input
                type="text"
                class="form-control"
                :class="{ 'is-invalid': showError }"
                v-model="editText"
                @keyup.esc="cancelEditing"
            >
            <div class="invalid-feedback">Нельзя сохранять пустое поле!</div>
          </div>
          <div class="col-auto">
            <button type="submit" class="btn btn-primary">Сохранить</button>
            <button type="button" class="btn btn-secondary" @click="cancelEditing">Отмена</button>
          </div>
        </form>
      </li>
    `,

    methods: {
        startEditing() {
            this.isEditing = true;
            this.editText = this.item.text;
            this.showError = false;
        },

        saveEditing() {
            const trimmedText = this.editText.trim();

            if (trimmedText.length === 0) {
                this.showError = true;
                return;
            }

            this.$emit("update-todo-item", {
                id: this.item.id,
                text: trimmedText
            });

            this.isEditing = false;
            this.showError = false;
        },

        cancelEditing() {
            this.isEditing = false;
            this.editText = this.item.text;
            this.showError = false;
        },

        deleteItem() {
            this.$emit("delete-todo-item", this.item.id);
        }
    }
});

// Компонент списка задач
app.component("TodoList", {
    data() {
        return {
            items: [],
            newTodoItemText: "",
            showError: false,
            nextId: 1
        };
    },

    template: `
      <div class="container">
        <h1>Todo List на Vue.js</h1>

        <!-- Форма добавления -->
        <form class="row mb-3" @submit.prevent="addItem">
          <div class="col">
            <label for="new-todo-item-text" class="form-label visually-hidden">Новая заметка</label>
            <input
                id="new-todo-item-text"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': showError }"
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
              :item="item"
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
                this.showError = true;
                return;
            }

            this.items.push({
                id: this.nextId++,
                text: trimmedText
            });

            this.newTodoItemText = "";
            this.showError = false;
        },

        deleteItem(itemId) {
            this.items = this.items.filter(todo => todo.id !== itemId);
        },

        updateItem(updatedItem) {
            const index = this.items.findIndex(todo => todo.id === updatedItem.id);
            if (index !== -1) {
                this.items[index].text = updatedItem.text;
            }
        }
    }
});

// Монтируем приложение
app.mount("#app");