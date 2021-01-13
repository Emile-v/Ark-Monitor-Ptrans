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
      // si le port est -1, l'api n'est pas disponible.
      if(delegates[i].ports['@arkecosystem/core-api']!='-1'){
        let add='http://'+delegates[i].ip+":"+delegates[i].ports['@arkecosystem/core-api']+'/api/node/status'      
      fetchAsync(add)
      .then(res=> res.data)
      .then((pair) =>{
        console.log(delegates[i].ip  + " " +pair.synced);
      })
    }
    else console.log(delegates[i].ip + " Api indisponible.");
    }
  })
}


function getStaticFeesPeers(){
console.log("Fees de 10 pairs.")
  fetchAsync('https://api.ark.io/api/peers?page=1&limit=10')
  .then(res => res.data)
  .then((delegates) => { 
    for (let i = 0; i < delegates.length; i++) {
      // si le port est -1, l'api n'est pas disponible.
      if(delegates[i].ports['@arkecosystem/core-api']!='-1'){
        let add='http://'+delegates[i].ip+":"+delegates[i].ports['@arkecosystem/core-api']+'/api/node/fees'      
      fetchAsync(add)
      .then(res=> res.data)
      .then((pair) =>{
        console.log(delegates[i].ip);
        console.log("Moyenne transfer: "+pair["1"]["transfer"]["avg"]);
      })
    }
    else console.log(delegates[i].ip + " Api indisponible.");
    }
  })

}

// getStatusPeers();
// getStaticFeesPeers();

// voila le probleme depuis le début : je fermais la connexion au service avant l'appel asynchrone, forcement ca marchait pas
// ip2loc.IP2Location_close();

/** %%%%%%%%%%%%%%%%%% Ajout de l'indicateur de filtrage de transaction par rapport a une durée %%%%%%%%%%%%%%%*/

// fetchAsync('https://api.ark.io/api/transactions?page=1&limit=100&type=0')
// .then(res => {

//   /** on transforme toute les timestamps.human de notre data en DATE */
//   res.data.forEach(element => {
//     element.timestamp.human = new Date (element.timestamp.human)
//   });

//   /** test sur le jour */
//   console.log(res.data[0].timestamp.human.getDate());
//   /** test sur l'année'*/
//   console.log(res.data[0].timestamp.human.getFullYear());

//   /** le jour d'aujourd'hui */
//   let now = new Date(Date.now())
//   console.log("le jour aujourd'hui est :")
//   console.log(now.getDate());


//   /** l'heure actuelle */
//   console.log("l'heure actuelle est :")
//   console.log(now.getUTCHours()) // ca marche


//   /** la minute actuelle */
//   console.log("la minute actuelle est :")
//   console.log(now.getUTCMinutes()) // ca marche

//   const result = res.data.filter(transaction => transaction.timestamp.human.getDate() == now.getDate() 
//                                                 && transaction.timestamp.human.getUTCHours() >= now.getUTCHours()-1)

//   /** on obtient la liste des transactions qui s'est effectué sur la dernière dixaines de minutes */
//   console.log("le nombre de transaction est :")
//   console.log(result.length)
//   console.log(result)  

//   return res.data

// })

//%%%%%%%%%%%%%%%%%%% FIN %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


