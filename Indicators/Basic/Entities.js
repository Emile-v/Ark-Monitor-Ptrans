let fetchAsync = require('../../utils/fetch')

function getNodeConfig(){
    fetchAsync('https://api.ark.io/api/node/configuration')
    .then(res => res.data)
    .then((resultat) => {
      return(resultat);
    })
  }


  function getCryptoConfig(){
    fetchAsync('https://api.ark.io/api/node/configuration/crypto')
    .then(res => res.data)
    .then((resultat) => {
      return(resultat);
    })
  }

  function getFeeStats(){
    fetchAsync('https://api.ark.io/api/node/fees')
    .then(res => res.data)
    .then((resultat) => {
      return(resultat);
    })
  }


  function getNodeStatus(){
    fetchAsync('https://api.ark.io/api/node/status')
    .then(res => res.data)
    .then((resultat) => {
      return(resultat);
    })
  }


  function getSyncStatus(){
    fetchAsync('https://api.ark.io/api/node/syncing')
    .then(res => res.data)
    .then((resultat) => {
      return(resultat);
    })
  }

  getSyncStatus()