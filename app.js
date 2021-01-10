'use strict';

//serveur express
/*
const express = require('express')
const app = express();
const port = 8000;

app.get('/', (req, res) => {
  res.send('Hello World !')
});

app.listen(port, () => {
  console.log(`app listening on port ${port}!`)
});
*/


// Exécute un appel AJAX GET
// Prend en paramètres l'URL cible et la fonction callback appelée en cas de succès
/*
function ajaxGet(url, callback) {
  let req = new XMLHttpRequest();
  req.open("GET", url);
  req.addEventListener("load", function () {
      if (req.status >= 200 && req.status < 400) {
          // Appelle la fonction callback en lui passant la réponse de la requête
          callback(req.responseText);
      } else {
          console.error(req.status + " " + req.statusText + " " + url);
      }
  });
  req.addEventListener("error", function () {
      console.error("Erreur réseau avec l'URL " + url);
  });
  req.send(null);
}
*/

/*
function afficher(reponse) {
  console.log(reponse);
}
ajaxGet("https://api.ark.io/api/delegates?page=1&limit=100", afficher);

//ac fct anonyme
ajaxGet("http://localhost/javascript-web-srv/data/langages.txt", function (reponse) {
    console.log(reponse);
});
*/
var ip2loc = require("ip2location-nodejs");
ip2loc.IP2Location_init("./ip2Location/IP2LOCATION-LITE-DB3.IPV6.BIN");


const fetch = require('node-fetch');
//fetch Asynchrone
async function fetchAsync (url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

function getNomsDelegue(){
  console.log("Usernames of the 51 forging delegates :")
  fetchAsync('https://api.ark.io/api/delegates?page=1&limit=51')
  .then(res => res.data)
  .then((delegates) => { 
    for (let i = 0; i < delegates.length; i++) {
      console.log(delegates[i].username);
    }
  })
}

function getCountry(){
  fetchAsync('https://api.ark.io/api/peers?page=1&limit=10')
  .then(res => res.data)
    .then((delegates) => { 
      for (let i = 0; i < delegates.length; i++) {
        console.log(delegates[i].ip);
        // appel du service sur l'IP
        console.log(ip2loc.IP2Location_get_country_long(delegates[i].ip));
        console.log(ip2loc.IP2Location_get_city(delegates[i].ip));

      }
      ip2loc.IP2Location_close();
          },
    )
}
// getCountry();


function getStatusPeers(){
  console.log("Statuts de 10 pairs")
  fetchAsync('https://api.ark.io/api/peers?page=1&limit=10')
  .then(res => res.data)
  .then((delegates) => { 
    for (let i = 0; i < delegates.length; i++) {
      fetchAsync('https://api.ark.io/api/node/status?ip='+delegates[i].ip)
      .then(res=> res.data)
      .then((pair) =>{
        console.log(delegates[i].ip + " " +pair.synced);
      })
    }
  })
}


function getStaticFeesPeers(){
  console.log("Statuts de 10 pairs")
  fetchAsync('https://api.ark.io/api/peers?page=1&limit=10')
  .then(res => res.data)
  .then((delegates) => { 
    for (let i = 0; i < delegates.length; i++) {
      fetchAsync('https://api.ark.io/api/transactions/fees?ip='+delegates[i].ip)
      .then(res=> res.data)
      .then((pair) =>{
        console.log(delegates[i].ip );
        console.log(pair[Object.keys(pair)[0]]);
      })

      
    }
  })
}

// getStatusPeers();
getStaticFeesPeers();

// voila le probleme depuis le début : je fermais la connexion au service avant l'appel asynchrone, forcement ca marchait pas
// ip2loc.IP2Location_close();




