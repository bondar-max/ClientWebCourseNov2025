document.addEventListener("DOMContentLoaded", function () {
    const celsiusInputElement = document.getElementById('celsius-scale');

    const kelvinOutputElement = document.getElementById('kelvin-scale');
    const fahrenheitOutputElement = document.getElementById('fahrenheit-scale');

    kelvinOutputElement.readOnly = true;
    fahrenheitOutputElement.readOnly = true;

    const convertBtn = document.querySelector('.convert-button');
    convertBtn.addEventListener("click", function (e) {
        const celsiusValue = parseFloat(celsiusInputElement.value);

        if (isNaN(celsiusValue)) {
            alert('Пожалуйста, введите корректное число!');
            return;
        }

        const kelvinValue = celsiusValue + 273.15;
        const fahrenheitValue = (celsiusValue * 9/5) + 32;

        kelvinOutputElement.value = kelvinValue;
        fahrenheitOutputElement.value = fahrenheitValue;
    });
});