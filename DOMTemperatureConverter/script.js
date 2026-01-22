"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const celsiusInputElement = document.getElementById("celsius-scale");

    const kelvinOutputElement = document.getElementById("kelvin-scale");
    const fahrenheitOutputElement = document.getElementById("fahrenheit-scale");

    kelvinOutputElement.readOnly = true;
    fahrenheitOutputElement.readOnly = true;

    const form = document.getElementById("temperature-form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const inputValue = celsiusInputElement.value.trim();
        const celsiusTemperature = parseFloat(inputValue);

        if (isNaN(celsiusTemperature) || /[a-zA-Zа-яА-ЯёЁ]/.test(inputValue)) {
            alert("Пожалуйста, введите корректное число!");
            kelvinOutputElement.value = "";
            fahrenheitOutputElement.value = "";
            celsiusInputElement.value = "";
            celsiusInputElement.focus();
            return;
        }

        function convertToKelvin(celsiusTemperature) {
            return celsiusTemperature + 273.15;
        }

        function convertToFahrenheit(celsiusTemperature) {
            return (celsiusTemperature * 9 / 5) + 32;
        }

        kelvinOutputElement.value = convertToKelvin(celsiusTemperature);
        fahrenheitOutputElement.value = convertToFahrenheit(celsiusTemperature);
    });
});