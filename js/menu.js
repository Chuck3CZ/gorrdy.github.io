$(document).ready(function(){
  var menuString = `<ul class="nav">
   <a href="index.html"><li class="nav-item">Domů</li></a>
   <a href="sats.html"><li class="nav-item">Cena BTC</li></a>
   <a href="o_projektu.html"> <li class="nav-item-right">O projektu</li></a>
  </ul>`
  $("#navigation").html(menuString)
  
  var footerString = `<div>
     © Gorrdy
     <p>
      Najdete mě zde:<br />
      <a target="_blank" href="https://discord.gg/8KPPRCj">Discord</a>,
      <a target="_blank" href="https://twitter.com/_Honza_Dvorak">Twitter</a>,
      <a target="_blank" href="https://github.com/gorrdy">Github</a>,
      <a target="_blank" href="mailto:dvorakh1997@gmail.com">E-mail</a>
     </p>
     <p>
      Další zajímavé projekty:<br />
      <a target="_blank" href="https://btc-slovnik.cz/">Bitcoinový slovníček pro mírně pokročilé</a>,
      <a target="_blank" href="https://www.kryptodoupe.cz/">Kryptodoupě.cz</a>,
      <a target="_blank" href="https://www.youtube.com/channel/UCCegl13nmUvxUKMJqng1S-A">Bitcoinovej kanál</a>
     </p>
     <p>
 	  <a id="donate" href="#donate" onclick="insertQr(); return false;">Příspěvek</a><br />
	  <div id="lnurl"></div>
     </p>    
     </div>`
   $("#footer").html(footerString)
})

function insertQr () {
  var string = '<div class="center-div" style="width:250px"><img alt="QR platba" src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&amp;data=LNURL1DP68GURN8GHJ7MRWVF5HGUEWVDHK6TMVDE6HYMRS9ASHQ6F0WCCJ7MRWW4EXCTENXSEQD0Z9ZY"><br></div><div class="center-text">lnurl1dp68gurn8ghj7mrwvf5hguewvdhk6tmvde6hymrs9ashq6f0wccj7mrww4exctenxseqd0z9zy<br /><br /><a target="_blank" href="https://lnbits.com/tpos/EPdibZWaMyLFRvr4g6Rikp">Běžná LN Faktura</a></div></div>'
  $("#lnurl").html(string)
  $('html,body').animate({scrollTop: document.body.scrollHeight},"slow");
}