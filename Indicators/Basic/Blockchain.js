let fetchAsync = require('../../utils/fetch')

function getBlockchain(){
    console.log("Statut de la Blockchain : ")
    fetchAsync('https://api.ark.io/api/blockchain')
    .then(res => res.data)
    .then((resultat) => {
      console.log(resultat);
    })
  }

getBlockchain();