(function() {
    "use strict";

    // Пространство имен для задач
    window.ArrayTasks = window.ArrayTasks || {};

    // 1. Работа с массивом чисел
    ArrayTasks.processArray = function() {
        const array = [34, 12, 56, 78, 23, 9, 45, 67, 89, 1, 33, 77, 92, 44];

        // Сортировка по убыванию
        const sortedArray = [...array].sort((a, b) => b - a);

        // Первые 5 элементов
        const firstFiveElements = sortedArray.slice(0, 5);

        // Последние 5 элементов исходного массива
        const lastFiveElements = array.slice(-5);

        // Сумма четных чисел
        const evenNumbersSum = array.reduce((sum, num) =>
            num % 2 === 0 ? sum + num : sum, 0);

        console.log("Исходный массив:", array);
        console.log("Отсортированный по убыванию:", sortedArray);
        console.log("Первые 5 элементов:", firstFiveElements);
        console.log("Последние 5 элементов:", lastFiveElements);
        console.log("Сумма четных чисел:", evenNumbersSum);
    };

    // 2. Массив чисел от 1 до 100 и их квадраты
    ArrayTasks.processOneToHundredArray = function() {
        // Создаем массив от 1 до 100
        const array = Array.from({length: 100}, (_, i) => i + 1);

        // Квадраты четных чисел
        const evenNumbersSquares = array
            .filter(num => num % 2 === 0)
            .map(num => num * num);

        console.log("Массив от 1 до 100:", array);
        console.log("Квадраты четных чисел:", evenNumbersSquares);
        console.log("Количество четных чисел:", evenNumbersSquares.length);
    };

    // Запуск всех задач
    ArrayTasks.runAll = function() {
        console.log("=== Задача 1: Работа с массивом чисел ===");
        ArrayTasks.processArray();

        console.log("\n=== Задача 2: Массив 1-100 и квадраты четных ===");
        ArrayTasks.processOneToHundredArray();
    };

})();

// Запуск задач
ArrayTasks.runAll();