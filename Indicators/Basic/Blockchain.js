let fetchAsync = require('../../utils/fetch')

function getBlockchain(){
    console.log("Statut de la Blockchain : ")
    fetchAsync('https://api.ark.io/api/blockchain')
    .then(res => res.data)
    .then((resultat) => {
      return(resultat);
    })
  }

//getBlockchain();


module.exports.getBlockchain = getBlockchain;