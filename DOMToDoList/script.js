document.addEventListener("DOMContentLoaded", function () {
    const todoList = document.getElementById("todo-list");
    const newTodoItemTextField = document.getElementById("new-todo-item-text-field");

    const newTodoForm = document.getElementById("new-todo-item-form");
    newTodoForm.addEventListener("submit", function (e) {
        e.preventDefault();

        newTodoItemTextField.classList.remove("invalid");

        const newTodoItemText = newTodoItemTextField.value.trim();

        if (newTodoItemText.length === 0) {
            newTodoItemTextField.classList.add("invalid");
            return;
        }

        const newTodoItem = document.createElement("li");

        function setViewMode() {
            newTodoItem.innerHTML = `<span class="text"></span>  
            <button type="button" class="edit-button">Редактировать</button>
            <button type="button" class="delete-button">Удалить</button>`;

            newTodoItem.querySelector(".text").textContent = newTodoItemText;

            newTodoItem.querySelector(".delete-button").addEventListener("click", function () {
                newTodoItem.remove();
            });

            newTodoItem.querySelector(".edit-button").addEventListener("click", function () {
                newTodoItem.innerHTML = `
            <form class="edit-form">
                <input type="text" class="edit-todo-item-text-field">
                <button type="button">Сохранить</button>
                <button type="button" class="cancel-button">Отмена</button>
            </form>   
            `;

                newTodoItem.querySelector(".edit-todo-item-text-field").value = newTodoItemText;

                newTodoItem.querySelector(".cancel-button").addEventListener("click", function () {
                    setViewMode();
                });

                newTodoItem.querySelector(".edit-form").addEventListener("submit", function () {
                    e.preventDefault();

                    setViewMode();
                });
            });
        }

        setViewMode();
        todoList.appendChild(newTodoItem);

        newTodoItemTextField.value = "";

    })
})