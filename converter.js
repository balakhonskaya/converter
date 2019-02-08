$.get('https://openexchangerates.org/api/latest.json', {app_id: 'a276aaa0a5dd4eb38d8cbe66a5fb2fe0'}, function(data) {
  console.log("1 US Dollar equals " + data.rates.EUR + " Euro")
  var USDEUR = data.rates.EUR;
  console.log(USDEUR);
  var EURUSD = +(1/data.rates.EUR).toFixed(6);
  console.log(EURUSD);
  var USDRUB = data.rates.RUB;
  console.log(USDRUB);
  var EURRUB = +(data.rates.RUB/data.rates.EUR).toFixed(6);
  console.log(EURRUB);
  var crrncy = {'EUR': {'RUB': EURRUB, 'USD': EURUSD}, 'USD': {'RUB': USDRUB, 'EUR': USDEUR}};
  console.log(crrncy);
          

  var btn = document.querySelector('.calculate-btn');
  var baseCurrencyInput = document.getElementById('currency-1');
  var secondCurrencyInput = document.getElementById('currency-2');
  var amountInput = document.getElementById('amount');
  var toShowAmount = document.querySelector('.given-amount');
  var toShowBase = document.querySelector('.base-currency');
  var toShowSecond = document.querySelector('.second-currency');
  var toShowResult = document.querySelector('.final-result');

  function convertCurrency(event) {
    event.preventDefault();
    var amount = amountInput.value; 
    var from = baseCurrencyInput.value; 
    var to = secondCurrencyInput.value; 
    var result = 0;
    
    try {
      if (from == to) {  
        result = amount;
        toShowResult.textContent = result;
      } else {
      result = amount * crrncy[from][to];
        toShowResult.textContent = result.toFixed(2);
      }
    } catch(err) {
      result = amount * (1 / crrncy[to][from]);
      toShowResult.textContent = result.toFixed(2);
    }
    
    toShowAmount.innerHTML = amount;
    toShowBase.textContent = from + ' = ';
    toShowSecond.textContent = to;
  }

  btn.addEventListener('click', convertCurrency);

});