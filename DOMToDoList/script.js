"use strict";

// Ожидаем полной загрузки DOM перед выполнением скрипта
document.addEventListener("DOMContentLoaded", function () {
    // Получаем ссылки на основные элементы
    const todoList = document.getElementById("todo-list");
    const newTodoItemTextField = document.getElementById("new-todo-item-text-field");

    // Получаем форму добавления новой заметки
    const newTodoForm = document.querySelector(".new-todo-item-form");

    // Добавляем обработчик события отправки формы
    newTodoForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Предотвращаем стандартную отправку формы

        // Убираем класс ошибки при новой попытке добавления
        newTodoItemTextField.classList.remove("invalid");

        // Получаем и очищаем текст заметки от пробелов
        let newTodoItemText = newTodoItemTextField.value.trim();

        // Проверяем, не пустой ли текст
        if (newTodoItemText.length === 0) {
            newTodoItemTextField.classList.add("invalid"); // Показываем ошибку
            return;
        }

        // Создаем новый элемент списка (заметку)
        const newTodoItem = document.createElement("li");

        // Функция для установки режима просмотра (обычный вид заметки)
        function setViewMode() {
            // Устанавливаем HTML структуру заметки в режиме просмотра
            newTodoItem.innerHTML = `<span class="text"></span>
                <div class="button-group">
                    <button type="button" class="edit-button">Редактировать</button>
                    <button type="button" class="delete-button">Удалить</button>
                </div>`;

            // Вставляем текст заметки
            newTodoItem.querySelector(".text").textContent = newTodoItemText;

            // Добавляем обработчик для кнопки удаления
            newTodoItem.querySelector(".delete-button").addEventListener("click", function () {
                newTodoItem.remove(); // Удаляем заметку
            });

            // Добавляем обработчик для кнопки редактирования
            newTodoItem.querySelector(".edit-button").addEventListener("click", function () {
                // Переключаемся в режим редактирования
                newTodoItem.innerHTML = `
                    <form class="edit-form">
                        <input type="text" class="edit-todo-item-text-field">
                        
                        <div class="button-group">
                            <button type="submit" class="save-button">Сохранить</button>
                            <button type="button" class="cancel-button">Отмена</button>
                        </div>
                        <div class="error-message">Нельзя сохранять пустое поле!</div>
                    </form>`;

                // Получаем поле ввода для редактирования
                const editToDoItemTextField = newTodoItem.querySelector(".edit-todo-item-text-field");

                // Устанавливаем текущий текст в поле редактирования
                editToDoItemTextField.value = newTodoItemText;

                // Обработчик для кнопки "Отмена"
                newTodoItem.querySelector(".cancel-button").addEventListener("click", function () {
                    setViewMode(); // Возвращаемся в режим просмотра
                });

                // Обработчик отправки формы редактирования
                newTodoItem.querySelector(".edit-form").addEventListener("submit", function (e) {
                    e.preventDefault();

                    // Получаем и очищаем отредактированный текст
                    const editTodoItemText = editToDoItemTextField.value.trim();

                    // Проверяем, не пустой ли текст
                    if (editTodoItemText.length === 0) {
                        editToDoItemTextField.classList.add("invalid");
                        return;
                    }

                    // Обновляем текст заметки
                    newTodoItemText = editTodoItemText;

                    // Возвращаемся в режим просмотра
                    setViewMode();
                });
            });
        }

        // Устанавливаем начальный режим просмотра для новой заметки
        setViewMode();

        // Добавляем новую заметку в список
        todoList.appendChild(newTodoItem);

        // Очищаем поле ввода после успешного добавления
        newTodoItemTextField.value = "";
    });
});