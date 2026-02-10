const _ = window._;

// Исходные данные
const people = [
    { name: "Иван", age: 25 },
    { name: "Петр", age: 30 },
    { name: "Семен", age: 17 },
    { name: "Светлана", age: 35 },
    { name: "Анна", age: 22 },
    { name: "Дмитрий", age: 28 },
    { name: "Иван", age: 40 },
    { name: "Анна", age: 19 },
    { name: "Петр", age: 25 },
    { name: "Мария", age: 31 }
];

// 1. Посчитать средний возраст всех людей
const averageAge = _.meanBy(people, 'age');
console.log('Средний возраст:', averageAge); // 27.2

// 2. Получить список людей с возрастом от 20 до 30 включительно, отсортировать их по возрастанию возраста
const filteredAndSortedList = _.chain(people)
    .filter(p => p.age >= 20 && p.age <= 30)
    .sortBy('age')
    .value();
console.log('Люди от 20 до 30 лет:');
console.table(filteredAndSortedList);

// 3. Получить список уникальных имен людей с возрастом от 20 до 30 включительно, отсортировать его по убыванию
const uniqueNames = _.chain(people)
    .filter(p => p.age >= 20 && p.age <= 30)
    .map('name')
    .uniq()
    .orderBy() // сортировка по возрастанию
    .reverse() // переворачиваем для убывания
    .value();
console.log('Уникальные имена (по убыванию):', uniqueNames);

// 4. Получить объект, в котором ключами будут имена людей, а значениями – количество людей с этим именем
const nameCount = _.countBy(people, 'name');
console.log('Количество людей по именам:');
console.log(nameCount);