/**
 * Formats input numbers to use commas
 */
[inputAmount, outputAmount] = new AutoNumeric.multiple(
    ['#inputAmount', '#outputAmount'],
    [
        {
            watchExternalChanges: true,
            decimalPlaces: 4,
        },
        'floatPos',
    ]
);

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
    const newOutputAmount = $('#inputAmount').val();
    const newInputAmount = $('#outputAmount').val();

    const newOutputCurrency = $('.fromCurrencyList option:selected').text();
    const newInputCurrency = $('.toCurrencyList option:selected').text();

    $('.fromCurrencyList').val(newInputCurrency);
    $('.toCurrencyList').val(newOutputCurrency);

    $('#inputAmount').val(newInputAmount);
    $('#outputAmount').val(newOutputAmount);

    changeFromCountryImage();
    changeToCountryImage();
}

/**
 * Handles changing country images
 */

function changeFromCountryImage() {
    let selected = $('.fromCurrencyList option:selected').text();
    $('img.fromFlag').attr(
        'src',
        `https://www.countryflags.io/${currencyToFlag[selected]}/flat/64.png`
    );
    convertCurrency();
}

function changeToCountryImage() {
    let selected = $('.toCurrencyList option:selected').text();
    $('img.toFlag').attr(
        'src',
        `https://www.countryflags.io/${currencyToFlag[selected]}/flat/64.png`
    );
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
const currencyToFlag = {
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
