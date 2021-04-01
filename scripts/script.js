/**
 * Converts Currency
 */
async function convertCurrency() {
    const fromCurrency = $('.fromCurrencyList option:selected').text();
    const toCurrency = $('.toCurrencyList option:selected').text();
    const amount = $('#inputAmount').val().replace(/,/g, '');

    await getExchangeRates().then((rates) => {
        // Exchange Rate Data
        const exchangeRates = rates;

        updateInputTo((exchangeRates[toCurrency] / exchangeRates[fromCurrency]) * amount);
    });
}

/**
 * Converts all Currencies
 */
function convertAllCurrencies(baseCurrency, currency) {
    const exchangeRates = JSON.parse(sessionStorage.getItem('cc')).rates;

    delete currency[baseCurrency];

    Object.keys(currency).forEach((key) => {
        currency[key] = exchangeRates[key] / exchangeRates[baseCurrency];
    });

    return currency;
}

/**
 * Receives Exchange Rates from API
 */
async function getExchangeRates() {
    const date = Date.now();

    if (
        sessionStorage.getItem('cc') == null ||
        date - JSON.parse(sessionStorage.getItem('cc')).date > 3000000
    ) {
        // Request to the API (uses CAD as the base currency for request)
        return await fetch(
            'https://v6.exchangerate-api.com/v6/d9681cd90e2f13ef81ea2400/latest/CAD',
            { method: 'GET' }
        )
            .then((response) => response.text())
            .then((res) => {
                const data = JSON.parse(res);
                console.log(data);
                sessionStorage.setItem(
                    'cc',
                    JSON.stringify({ date: date, rates: data.conversion_rates })
                );
                location.reload();
                return Promise.resolve(data.rates);
            })
            .catch(() => console.log('Error getting exchange rates'));
    } else {
        return Promise.resolve(JSON.parse(sessionStorage.getItem('cc')).rates);
    }
}
