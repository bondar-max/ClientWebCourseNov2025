"use strict";

// Ожидаем полной загрузки DOM перед выполнением скрипта
$(function () {
    // Получаем ссылки на основные элементы
    const $todoList = $("#todo-list");
    const $newTodoItemTextField = $("#new-todo-item-text-field");
    const $newTodoForm = $(".new-todo-item-form");

    // Добавляем обработчик события отправки формы
    $newTodoForm.on("submit", function (e) {
        e.preventDefault(); // Предотвращаем стандартную отправку формы

        // Убираем класс ошибки при новой попытке добавления
        $newTodoItemTextField.removeClass("invalid");

        // Получаем и очищаем текст заметки от пробелов
        let newTodoItemText = String($newTodoItemTextField.val()).trim();

        // Проверяем, не пустой ли текст
        if (newTodoItemText.length === 0) {
            $newTodoItemTextField.addClass("invalid"); // Показываем ошибку
            return;
        }

        // Создаем новый элемент списка (заметку)
        const $newTodoItem = $("<li>");

        // Функция для установки режима просмотра (обычный вид заметки)
        function setViewMode() {
            // Устанавливаем HTML структуру заметки в режиме просмотра
            $newTodoItem.html(`<span class="text"></span>
                <div class="button-group">
                    <button type="button" class="edit-button">Редактировать</button>
                    <button type="button" class="delete-button">Удалить</button>
                </div>`);

            // Вставляем текст заметки
            $newTodoItem.find(".text").text(newTodoItemText);

            // Добавляем обработчик для кнопки удаления
            $newTodoItem.find(".delete-button").on("click", function () {
                $newTodoItem.remove(); // Удаляем заметку
            });

            // Добавляем обработчик для кнопки редактирования
            $newTodoItem.find(".edit-button").on("click", function () {
                // Переключаемся в режим редактирования
                $newTodoItem.html(`
                    <form class="edit-form">
                        <input type="text" class="edit-todo-item-text-field">
                        <div class="button-group">
                            <button type="submit" class="save-button">Сохранить</button>
                            <button type="button" class="cancel-button">Отмена</button>
                        </div>
                        <div class="error-message">Нельзя сохранять пустое поле!</div>
                    </form>`);

                // Получаем поле ввода для редактирования
                const $editTodoItemTextField = $newTodoItem.find(".edit-todo-item-text-field");

                // Устанавливаем текущий текст в поле редактирования
                $editTodoItemTextField.val(newTodoItemText);

                // Обработчик для кнопки "Отмена"
                $newTodoItem.find(".cancel-button").on("click", function () {
                    setViewMode(); // Возвращаемся в режим просмотра
                });

                // Обработчик отправки формы редактирования
                $newTodoItem.find(".edit-form").on("submit", function (e) {
                    e.preventDefault();

                    // Получаем и очищаем отредактированный текст
                    const editTodoItemText = $editTodoItemTextField.val().trim();

                    // Проверяем, не пустой ли текст
                    if (editTodoItemText.length === 0) {
                        $editTodoItemTextField.addClass("invalid");
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
        $todoList.append($newTodoItem);

        // Очищаем поле ввода после успешного добавления
        $newTodoItemTextField.val("");
    });
});