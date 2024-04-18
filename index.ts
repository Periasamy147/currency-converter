const currencyForm = document.getElementById('currencyForm');
const amountInput = document.getElementById('amount') as HTMLInputElement;
const fromCurrencySelect = document.getElementById('fromCurrency') as HTMLSelectElement;
const toCurrencySelect = document.getElementById('toCurrency') as HTMLSelectElement;
const resultDiv = document.getElementById('result');

if (currencyForm && amountInput && fromCurrencySelect && toCurrencySelect && resultDiv) {
    currencyForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission

        // Get values from form
        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        // Make API request for conversion rates
        fetch('https://api.exchangerate-api.com/v4/latest/' + fromCurrency)
            .then(response => response.json())
            .then(data => {
                // Retrieve conversion rates from API response
                const conversionRates = data.rates;

                // Perform conversion
                const convertedAmount = amount * conversionRates[toCurrency];

                // Display result
                resultDiv.innerText = amount + ' ' + fromCurrency + ' = ' + convertedAmount + ' ' + toCurrency;
            })
            .catch(error => {
                console.error('Error fetching conversion rates:', error);
                resultDiv.innerText = 'Error fetching conversion rates. Please try again later.';
            });
    });
} else {
    console.error('One or more required elements not found.');
}
