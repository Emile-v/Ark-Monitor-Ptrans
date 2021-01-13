'use strict';

import {fetchAsync} from "./fetch.js"

// Ne retourne pas le bon resultat : pour l'instant ca semble être un statut "global", sur tout le réseau
// Même chose pour les fees.

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
// getStaticFeesPeers();