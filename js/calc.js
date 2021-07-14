var myVar;
$(document).ready(init())

function init() {
  GetCurrentBtcPrice();
  myVar = setInterval(LoopBtcPrice, 60000)
}

function LoopBtcPrice() {
  GetCurrentBtcPrice();
}

function GetBtcPrice () {
  var datum = document.getElementById("date").value
  var sats  = document.getElementById("amount").value
  var date = datum
  $("#den_datum").html(date)
  var url = 'https://api.coindesk.com/v1/bpi/historical/close.json?start='
  var url = url.concat (date, "&end=", date)
  var test = $.getJSON( url , function() {
  var price_btc = test.responseJSON.bpi[date]
    var url2='https://api.kb.cz/openapi/v1/exchange-rates/USD'
    var usd = $.getJSON( url2 , function() {
      var usdczk = usd.responseJSON.middle
      var price_btc = test.responseJSON.bpi[date]
      var price_btc_czk = price_btc * usdczk
      price_btc = round(price_btc, 0)
      price_btc_czk = round(price_btc_czk, 0)
      $("#btcprice").html(price_btc)
      $("#btcpriceczk").html(price_btc_czk)
      var price_sats = price_btc / 100000000 * sats
      var price_sats_czk = price_sats * usdczk
      price_sats = round(price_sats, 0)
      price_sats_czk = round(price_sats_czk, 0)
      $("#satscount").html(sats)
      $("#satsprice").html(price_sats)
      $("#satspriceczk").html(price_sats_czk)
    })
  })
}

function GetCurrentBtcPrice () {
  var url = 'https://api.coindesk.com/v1/bpi/currentprice/CZK.json'
  var response = $.getJSON( url , function() {
	currency = document.getElementById("currencySelected").value
	var usd = response.responseJSON.bpi.USD.rate_float
	var czk = response.responseJSON.bpi.CZK.rate_float
	var url2 ='https://api.kb.cz/openapi/v1/exchange-rates/EUR'
	var eur = $.getJSON( url2 , function() {
	  var eurczk = eur.responseJSON.middle
      var usdp = response.responseJSON.bpi.USD.rate_float
	  var czkp = response.responseJSON.bpi.CZK.rate_float
	  var eurp = czk / eurczk
	  var price_btc_current
	  if (!currency) {
		price_btc_current = czkp  
	  }
	  if (currency === "CZK"){
		price_btc_current = czkp
	  }
	  if (currency === "EUR"){
		price_btc_current = eurp
	  }
	  if (currency === "USD"){
		price_btc_current = usdp
	  }
      $("#currentbtcprice").html(price_btc_current)
    })
  })
}

function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

function kryptoConverter(valNum) {
  var url = 'https://api.coindesk.com/v1/bpi/currentprice/CZK.json'
  var response = $.getJSON( url , function() {
    var price_btc_current_czk = round(response.responseJSON.bpi.CZK.rate_float, 0)
    var premiumPlus = (1 + (document.getElementById("premiumPercent").value / 100));
    var premiumMinus = (1 - (document.getElementById("premiumPercent").value / 100));
    valNum = parseFloat(valNum)
    valNum = valNum * price_btc_current_czk / 100000000
    var valNumPlus = valNum * premiumPlus;
    var valNumMinus = valNum * premiumMinus;
    valNum = round(valNum, 1)
    document.getElementById("inputCzk").value="";
    Show("outputSatoshi")
    Hide("outputCzk")
    $("#inputCzkPlus").html(round(valNumPlus, 0));
    $("#inputCzkMiddle").html(round(valNum, 0));
    $("#inputCzkMinus").html(round(valNumMinus, 0));
  })
}
function kryptoConverter2(valNum) {
  var url = 'https://api.coindesk.com/v1/bpi/currentprice/CZK.json'
  var response = $.getJSON( url , function() {
    var price_btc_current_czk = round(response.responseJSON.bpi.CZK.rate_float, 0)
    var premiumPlus = (1 + (document.getElementById("premiumPercent").value / 100));
    var premiumMinus = (1 - (document.getElementById("premiumPercent").value / 100));
    valNum = parseFloat(valNum);
    valNum = valNum / price_btc_current_czk * 100000000
    var valNumPlus = valNum * premiumPlus;
    var valNumMinus = valNum * premiumMinus;
    valNum = round(valNum, 1)
    document.getElementById("inputSatoshi").value="";
    Hide("outputSatoshi")
    Show("outputCzk")
    $("#inputSatoshiPlus").html(round(valNumPlus, 0));
    $("#inputSatoshiMiddle").html(round(valNum, 0));
    $("#inputSatoshiMinus").html(round(valNumMinus, 0));
  })
}

function NullAll(){
  document.getElementById("inputSatoshi").value="";
  document.getElementById("inputCzk").value="";
  $("#inputSatoshiPlus").html("");
  $("#inputSatoshiMiddle").html("");
  $("#inputSatoshiMinus").html("");
  $("#inputCzkPlus").html("");
  $("#inputCzkMiddle").html("");
  $("#inputCzkMinus").html("");
}

function Show(id) {
  var x = document.getElementById(id);
  x.style.display = "none";
}

function Hide(id) {
  var x = document.getElementById(id);
  x.style.display = "block";
}

function detectLastActionAndUpdate(){
  var in_sat = document.getElementById("inputSatoshi").value;
  var in_czk = document.getElementById("inputCzk").value;
  console.log(in_sat)
  console.log(in_czk)
  if(in_sat){
    kryptoConverter(in_sat)
  } else {
    kryptoConverter2(in_czk)
  }
}

function ChangeCurrency(){
  if (!document.getElementById("currencySelected").value){
	document.getElementById("currencySelected").value = "CZK"
  }
  var current=document.getElementById("currencySelected").value
  if (current === "CZK"){
    $("#currencySelected").html("EUR")
    document.getElementById("currencySelected").value = "EUR"
  }
  if (current === "EUR"){
    $("#currencySelected").html("USD")
    document.getElementById("currencySelected").value = "USD"
  }
  if (current === "USD"){
    $("#currencySelected").html("CZK")
    document.getElementById("currencySelected").value = "CZK"
  }
  
}
