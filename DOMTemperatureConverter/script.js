"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const celsiusInputElement = document.getElementById("celsius-scale");

    const kelvinOutputElement = document.getElementById("kelvin-scale");
    const fahrenheitOutputElement = document.getElementById("fahrenheit-scale");

    kelvinOutputElement.readOnly = true;
    fahrenheitOutputElement.readOnly = true;

    const form = document.getElementById("temperature-form");

    function convertTemperature() {
        const inputValue = celsiusInputElement.value.trim();
        const celsiusTemperature = Number(inputValue);

        // Проверка с использованием Number()
        if (isNaN(celsiusTemperature) || inputValue === "") {
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
    }

    form.addEventListener("click", function (e) {
        e.preventDefault();
        convertTemperature();
    });

    celsiusInputElement.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            convertTemperature();
        }
    });
});