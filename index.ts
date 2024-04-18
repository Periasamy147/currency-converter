var form = document.getElementById('currencyForm');
if (form) {
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission

        // Get values from form
        var amountInput = document.getElementById('amount') as HTMLInputElement;
        var amount = parseFloat(amountInput.value || '0');

        var fromCurrencySelect = document.getElementById('fromCurrency') as HTMLSelectElement;
        var fromCurrency = fromCurrencySelect.value || '';

        var toCurrencySelect = document.getElementById('toCurrency') as HTMLSelectElement;
        var toCurrency = toCurrencySelect.value || '';

        // Make sure required elements are found
        if (!amount || !fromCurrency || !toCurrency) {
            console.error('Required elements not found.');
            return;
        }

        // Make API request for conversion rates
        fetch('https://api.exchangerate-api.com/v4/latest/' + fromCurrency)
            .then(response => response.json())
            .then(data => {
                // Retrieve conversion rates from API response
                var conversionRates = data.rates;

                // Perform conversion
                var convertedAmount = amount * conversionRates[toCurrency];

                // Display result
                var resultElement = document.getElementById('result');
                if (resultElement) {
                    resultElement.innerText = amount + ' ' + fromCurrency + ' = ' + convertedAmount + ' ' + toCurrency;
                }
            })
            .catch(error => {
                console.error('Error fetching conversion rates:', error);
                var resultElement = document.getElementById('result');
                if (resultElement) {
                    resultElement.innerText = 'Error fetching conversion rates. Please try again later.';
                }
            });
    });
}
