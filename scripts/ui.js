/**
 * Load all exchanges on page load
 */
function startup() {
    $('#inputAmount').val(1);
    convertCurrency().then(() => {
        updateAllExchanges('CAD');
    });
}

/**
 * Formats input numbers to use commas
 */
[inputAmount, outputAmount] = new AutoNumeric.multiple(
    ['#inputAmount', '#outputAmount'],
    [
        {
            watchExternalChanges: true,
            decimalPlaces: 2,
        },
        'floatPos',
    ]
);

/**
 * Update img src
 */
function updateImg(element, country) {
    $(element).attr('src', `https://www.countryflags.io/${country}/flat/64.png`);
}

/**
 * Updating amounts when input currency changes
 */
function updateInputTo(amount) {
    $('#outputAmount').val(amount);
}

/**
 * Flipping exchange rates on the UI
 */
function flipExchanges() {
    const newOutputCurrency = $('.fromCurrencyList option:selected').text();
    const newInputCurrency = $('.toCurrencyList option:selected').text();

    $('.fromCurrencyList').val(newInputCurrency);
    $('.toCurrencyList').val(newOutputCurrency);

    changeFromCountryImage();
    changeToCountryImage();
}

/**
 * Handles changing country images
 */
function changeFromCountryImage() {
    const selected = $('.fromCurrencyList option:selected').text();
    updateImg('img#fromFlag', currency[selected]);
    convertCurrency(selected);
    updateAllExchanges(selected);
}

function changeToCountryImage() {
    let selected = $('.toCurrencyList option:selected').text();
    updateImg('img#toFlag', currency[selected]);
}

/**
 * Updates all of the exchanges at the bottom of the screen
 */
function updateAllExchanges(baseCurrency) {
    updateImg('#baseCurrencyImg', currency[baseCurrency]);
    $('#baseCurrency').html(`${baseCurrency}: 1`);

    // Reusing currency object to store rates for each exchange
    const updatedExchangeRates = convertAllCurrencies(baseCurrency, { ...currency });

    let i = 1;
    Object.keys(updatedExchangeRates).forEach((key) => {
        updateImg(`#currency${i}Img`, currency[key]);
        $(`#currency${i}`).html(
            `${key}: ${Math.round((updatedExchangeRates[key] + Number.EPSILON) * 100) / 100}`
        );
        i++;
    });
}

/**
 * jQuery event listeners
 */
$('#inputAmount').keyup(() => {
    convertCurrency();
});

$('.fromCurrencyList').change(() => {
    changeFromCountryImage();
    convertCurrency();
});

$('.toCurrencyList').change(() => {
    changeToCountryImage();
    convertCurrency();
});

/**
 * Object to hold currency/flag value
 */
const currency = {
    AUD: 'AU',
    CAD: 'CA',
    CHF: 'CH',
    CNY: 'CN',
    EUR: 'EU',
    GBP: 'GB',
    HKD: 'HK',
    JPY: 'JP',
    NZD: 'NZ',
    USD: 'US',
};
