/*• Создайте массив объектов-стран (пусть будет несколько
стран)
• У страны есть название и список городов (пусть будет по
несколько городов)
• У города есть название и численность населения
• Найдите страну/страны с максимальным количеством
городов
• Получите объект с информацией по всем странам такого
вида: ключ – название страны, значение – суммарная
численность по стране
• Оформите код в виде функций*/

const countries = [
    {
        name: "Россия",
        cities: [
            { name: "Москва", population: 12506468 },
            { name: "Санкт-Петербург", population: 5351935 },
            { name: "Новосибирск", population: 1620162 },
            { name: "Екатеринбург", population: 1493749 }
        ]
    },
    {
        name: "США",
        cities: [
            { name: "Нью-Йорк", population: 8336817 },
            { name: "Лос-Анджелес", population: 3979576 },
            { name: "Чикаго", population: 2693976 },
            { name: "Хьюстон", population: 2320268 }
        ]
    },
    {
        name: "Германия",
        cities: [
            { name: "Берлин", population: 3769495 },
            { name: "Гамбург", population: 1847253 },
            { name: "Мюнхен", population: 1471508 },
            { name: "Кёльн", population: 1087863 },
            { name: "Франкфурт", population: 753056 }
        ]
    },
    {
        name: "Япония",
        cities: [
            { name: "Токио", population: 13929286 },
            { name: "Иокогама", population: 3726167 },
            { name: "Осака", population: 2691185 },
        ]
    },
    {
        name: "Франция",
        cities: [
            { name: "Париж", population: 2148271 },
            { name: "Марсель", population: 870018 },
            { name: "Лион", population: 515695 },
            { name: "Тулуза", population: 479553 }
        ]
    }
];

"use strict";

const CountryApp = (function() {
    // Тут будут данные и функции

    const findCountriesWithMaxCities = () => {
        const cityCounts = countries.map(country => country.cities.length);
        const maxCount = Math.max(...cityCounts);
        return countries.filter(country => country.cities.length === maxCount);
    }

    const getCountriesTotalPopulation = () => {
        return countries.reduce((result, country) => {
            // твой код здесь
            const totalPopulation = country.reduce(country.cities.population,)
        }, {});
    }

    return {
        // Тут будут публичные методы
        //findCountriesWithMaxCities
        getCountriesTotalPopulation
    };
})();

// Основная логика
(function() {

    console.log(CountryApp.findCountriesWithMaxCities())// Тут будем вызывать методы и выводить результаты
})();