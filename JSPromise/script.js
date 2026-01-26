"use strict";

(async function () {
    function loadProductsListUsingPromise() {
        console.log("Загрузка #1 началась...");

        fetch("https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json")
            .then(response => {

                if (!response.ok) {
                    return new Error(`HTTP ошибка: ${response.status}`);
                }

                return response.json();
            })
            .then(data => {
                console.log("Загруженные данные: ", data);
            })
            .catch(error => console.log(error.message))
            .finally(() => {
                console.log("Загрузка завершена");
            });
    }

// Объявляем асинхронную функцию для загрузки данных
    async function loadProductsListUsingAsyncAwait() {
        console.log("Загрузка #2 началась...");

        try {
            const response = await fetch("https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json");

            if (!response.ok) {
                return new Error(`HTTP ошибка! Статус: ${response.status}`);
            }

            const data = await response.json();
            console.log("Загруженные данные: ", data);
            return data;
        } catch (error) {
            console.error("Произошла ошибка:", error.message);
            throw error;
        } finally {
            console.log("Загрузка завершена");
        }
    }

    await loadProductsListUsingPromise();

    await new Promise(resolve => setTimeout(resolve, 1000));

    await loadProductsListUsingAsyncAwait();
})();