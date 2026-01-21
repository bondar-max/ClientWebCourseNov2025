"use strict";

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
            { name: "Осака", population: 2691185 }
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

// Функция для поиска стран с максимальным количеством городов
function getCountriesWithMaxCityCount(countriesList) {
    if (countriesList.length === 0) {
        return [];
    }

    const citiesCounts = countriesList.map(country => country.cities.length);
    const maxCount = Math.max(...citiesCounts);

    return countriesList.filter(country => country.cities.length === maxCount);
}

// Функция для получения суммарного населения по странам
function getCountriesTotalPopulations(countriesList) {
    const result = {};

    countriesList.forEach(country => {
        result[country.name] = calculateCountryPopulation(country);
    });

    return result;
}

function calculateCountryPopulation(country) {
    return country.cities
        .reduce((sum, city) => sum + city.population, 0);
}

(function() {
    console.log("Страны с максимальным количеством городов:");
    console.log(getCountriesWithMaxCityCount(countries));

    console.log("\nОбщее население по странам:");
    console.log(getCountriesTotalPopulations(countries));
})();