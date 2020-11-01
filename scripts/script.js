async function convertCurrency(){
    const from = $(".fromCurrencyList option:selected").text(); 
    const to = $(".toCurrencyList option:selected").text();
    const amount = $("#inputAmount").val();

    await getExchangeRates().then((result) => {
        //Exchange Rate Data
        const exchangeRates = result.rates;
        
        //Free Fixer Plan offers only EUR as Base currency
        if(from == 'EUR'){
            updateInputTo(exchangeRates[to]*amount); 
        }
        else{
            updateInputTo((exchangeRates[to]/exchangeRates[from])*amount);
        }
    }); 
}

async function getExchangeRates(){
     //Request Options
     var requestOptions = {
        method: 'GET',
        redirect: 'follow',
    };

    //Appending Query String to URL
    var url = new URL("http://data.fixer.io/api/latest")
    params = {access_key: "c87e645a08c512636bbd9b1c45a58fc8"}
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    
    //Request to the server
    return await fetch(url, requestOptions)
        .then(response => response.text())
        .then(res => {
            return Promise.resolve(JSON.parse(res));       
        })
        .catch(error => console.log('error', error))
}

function updateInputTo(amount){
    $("#outputAmount").val(amount); 
}

function flipAmounts(){
    const newOutputAmount = $("#inputAmount").val();
    const newInputAmount = $("#outputAmount").val();

    $("#inputAmount").val(newInputAmount);
    $("#outputAmount").val(newOutputAmount);
}

$("#inputAmount").keyup(function() {
    convertCurrency();
});

$("select.fromCurrencyList").change(() => {
    let selected = $(".fromCurrencyList option:selected").text();
    $("img.fromFlag").attr('src', `https://www.countryflags.io/${currencyToFlag[selected]}/flat/64.png`);
    convertCurrency();
});

  $("select.toCurrencyList").change(() => {
    let selected = $(".toCurrencyList option:selected").text();
    $("img.toFlag").attr('src', `https://www.countryflags.io/${currencyToFlag[selected]}/flat/64.png`);
    convertCurrency();
});

const currencyToFlag = {
    AUD: "AU",
    CAD: "CA",
    CHF: "CH",
    CNY: "CN",
    EUR: "EU",
    GBP: "GB",
    HKD: "HK",
    JPY: "JP",
    NZD: "NZ",
    USD: "US"
}