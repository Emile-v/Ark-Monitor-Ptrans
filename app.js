'use strict';
const os = require('os');
const psList = require('ps-list');

var ip2loc = require("ip2location-nodejs");
ip2loc.IP2Location_init("./ip2Location/IP2LOCATION-LITE-DB3.IPV6.BIN");


const fetch = require('node-fetch');
//fetch Asynchrone
async function fetchAsync (url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}
//Premier test
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

//Indicateur de localisation des noeuds
// Ici on retourne seulement les localisations des 10 premiers pairs du noeud de l'api
function getCountry(){
  fetchAsync('https://api.ark.io/api/peers?page=1&limit=10')
  .then(res => res.data)
    .then((delegates) => {
      console.log("\n localisations des 10 premiers pairs du noeud de l'api :")
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




// voila le probleme depuis le début : je fermais la connexion au service avant l'appel asynchrone, forcement ca marchait pas
// ip2loc.IP2Location_close();


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
    }
  })
}


function getGeneralMachineInfos(){
  console.log(os.type()+ " " + os.platform() + "  " + os.arch());
  console.log(os.cpus()); 
  console.log(os.networkInterfaces()); 
  console.log(os.freemem() +" / "+ os.totalmem());
   
  (async () => {
    let psl =await psList();
    //=> [{pid: 3213, name: 'node', cmd: 'node test.js', ppid: 1, uid: 501, cpu: 0.1, memory: 1.5}, …]
    console.log(psl);
  })();
  
  if (process.pid) {
    console.log('This process is your pid ' + process.pid + " " + process.nam);
  }
}

getGeneralMachineInfos();