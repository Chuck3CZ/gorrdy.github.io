var myVar;
$(document).ready(init())


function init() {
  GetCurrentBtcPrice();
  myVar = setInterval(LoopBtcPrice, 60000);
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
    var price_btc_current_usd = round(response.responseJSON.bpi.USD.rate_float, 0)
    var price_btc_current_czk = round(response.responseJSON.bpi.CZK.rate_float, 0)
    $("#currentbtcpriceusd").html(price_btc_current_usd)
    $("#currentbtcpriceczk").html(price_btc_current_czk)
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
    valNum = round(parseFloat(valNum),0);
    valNum = round(valNum * price_btc_current_czk / 100000000, 0)
    document.getElementById("intputCzk").value=valNum;
  })
}
function kryptoConverter2(valNum) {
  var url = 'https://api.coindesk.com/v1/bpi/currentprice/CZK.json'
  var response = $.getJSON( url , function() {
    var price_btc_current_czk = round(response.responseJSON.bpi.CZK.rate_float, 0)
    valNum = round(parseFloat(valNum), 0);
    valNum = round(valNum / price_btc_current_czk * 100000000, 0)
    document.getElementById("inputSatoshi").value=valNum;
  })
}
