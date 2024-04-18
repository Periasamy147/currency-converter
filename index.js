var currencyForm = document.getElementById('currencyForm');
var amountInput = document.getElementById('amount');
var fromCurrencySelect = document.getElementById('fromCurrency');
var toCurrencySelect = document.getElementById('toCurrency');
var resultDiv = document.getElementById('result');
if (currencyForm && amountInput && fromCurrencySelect && toCurrencySelect && resultDiv) {
    currencyForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission
        // Get values from form
        var amount = parseFloat(amountInput.value);
        var fromCurrency = fromCurrencySelect.value;
        var toCurrency = toCurrencySelect.value;
        // Make API request for conversion rates
        fetch('https://api.exchangerate-api.com/v4/latest/' + fromCurrency)
            .then(function (response) { return response.json(); })
            .then(function (data) {
            // Retrieve conversion rates from API response
            var conversionRates = data.rates;
            // Perform conversion
            var convertedAmount = amount * conversionRates[toCurrency];
            // Display result
            resultDiv.innerText = amount + ' ' + fromCurrency + ' = ' + convertedAmount + ' ' + toCurrency;
        })
            .catch(function (error) {
            console.error('Error fetching conversion rates:', error);
            resultDiv.innerText = 'Error fetching conversion rates. Please try again later.';
        });
    });
}
else {
    console.error('One or more required elements not found.');
}
