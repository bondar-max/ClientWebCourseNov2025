"use strict";

(async function () {

    loadProductsListUsingPromise();

    await new Promise((resolve) => setTimeout(resolve, 1000));

    loadProductsListUsingAsyncAwait()
        .then(data => console.log("Загруженные данные: ", data))
        .finally(() => {
            console.log("Загрузка завершена")
        });
})();

function loadProductsListUsingPromise() {
    console.log("Загрузка началась...");

    fetch("https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json")
        .then(response => {

            if (!response.ok) {
                return new Error("HTTP ошибка: ${response.status}");
            }

            return response.json()
        })
        .then(data => {
            console.log("Загруженные данные: ", data)
        })
        .catch(error => console.log(error.message))
        .finally(() => {
            console.log("Загрузка завершена")
        });
}

// Объявляем асинхронную функцию для загрузки данных
async function loadProductsListUsingAsyncAwait() {
    console.log("Загрузка началась...");

    try {
        const response = await fetch("https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json");

        if (!response.ok) {
            return new Error(`HTTP ошибка! Статус: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Произошла ошибка:", error.message);
    }
}
