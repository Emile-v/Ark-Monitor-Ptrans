let fetchAsync = require('../../utils/fetch')

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

  //getStaticFeesPeers()


  module.exports.getStaticFeesPeers = getStaticFeesPeers;