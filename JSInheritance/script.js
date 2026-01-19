"use strict";

(function () {

    createObjectUsingPrototype();
    createObjectUsingClass();
})();

function createObjectUsingPrototype() {
    function Animal(name) {
        this.name = name;
    }

    Animal.prototype.speak = function() {
        console.log(`${this.name} издает звук`);
    };

    function Dog(name) {
        Animal.call(this, name);
    }

    Dog.prototype = Object.create(Animal.prototype);
    Dog.prototype.constructor = Dog;

    Dog.prototype.speak = function() {
        console.log(`${this.name} лает`);
    };

    function Cat(name) {
        Animal.call(this, name);
    }

    Cat.prototype = Object.create(Animal.prototype);
    Cat.prototype.constructor = Cat;

    Cat.prototype.speak = function() {
        console.log(`${this.name} мяукает`);
    };

    const animal = new Animal("Неизвестное животное");
    animal.speak();

    const dog = new Dog("Бобик");
    console.log("dog.constructor.name:", dog.constructor.name);
    dog.speak();

    const cat = new Cat("Мурка");
    console.log("cat.constructor.name:", cat.constructor.name);
    cat.speak();
}

function createObjectUsingClass() {
    class Animal {
        constructor(name) {
            this.name = name;
        }

        speak() {
            console.log(`${this.name} издает звук`);
        }
    }

    class Dog extends Animal {
        speak() {
            console.log(`${this.name} лает`);
        }
    }

    class Cat extends Animal {
        speak() {
            console.log(`${this.name} мяукает`);
        }
    }

    const animal = new Animal("Неизвестное животное");
    animal.speak();

    const dog = new Dog("Бобик");
    dog.speak();

    const cat = new Cat("Мурка");
    cat.speak();
}