/**
 * Converts Currency
 */
async function convertCurrency() {
    const fromCurrency = $('.fromCurrencyList option:selected').text();
    const toCurrency = $('.toCurrencyList option:selected').text();
    const amount = $('#inputAmount').val();

    await getExchangeRates().then((result) => {
        // Exchange Rate Data
        const exchangeRates = result.rates;

        // CAD Base
        if (fromCurrency == 'CAD') updateInputTo(exchangeRates[toCurrency] * amount);
        else updateInputTo((exchangeRates[toCurrency] / exchangeRates[fromCurrency]) * amount);
    });
}

/**
 * Receives Exchange Rates from API
 */
async function getExchangeRates() {
    // Request to the API
    return await fetch('https://api.exchangeratesapi.io/latest?base=CAD', { method: 'GET' })
        .then((response) => response.text())
        .then((res) => {
            return Promise.resolve(JSON.parse(res));
        })
        .catch(() => console.log('Error getting exchange rates'));
}
