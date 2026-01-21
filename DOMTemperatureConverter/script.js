"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const celsiusInputElement = document.getElementById("celsius-scale");

    const kelvinOutputElement = document.getElementById("kelvin-scale");
    const fahrenheitOutputElement = document.getElementById("fahrenheit-scale");

    kelvinOutputElement.readOnly = true;
    fahrenheitOutputElement.readOnly = true;

    const form = document.getElementById("temp-form");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const celsiusTemperature = parseFloat(celsiusInputElement.value);

        if (isNaN(celsiusTemperature)) {
            alert("Пожалуйста, введите корректное число!");
            return;
        }

        function convertToKelvin(celsiusTemperature) {
            return celsiusTemperature + 273.15;
        }

        function convertToFahrenheit(celsiusTemperature) {
            return (celsiusTemperature * 9 / 5) + 32;
        }

        const kelvinTemperature = convertToKelvin(celsiusTemperature);
        const fahrenheitTemperature = convertToFahrenheit(celsiusTemperature);

        kelvinOutputElement.value = kelvinTemperature;
        fahrenheitOutputElement.value = fahrenheitTemperature;
    });
});