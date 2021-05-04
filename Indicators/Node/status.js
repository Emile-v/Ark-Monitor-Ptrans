const {url} = require("../../utils/globalvar")

let fetchAsync = require('../../utils/fetch')

function getStatusPeers1(){
    console.log("Statuts de 10 pairs")
    fetchAsync('https://api.ark.io/api/peers?page=1&limit=100')
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

  // getStatusPeers()


  // {
  //   desactivatedAPI : []
  //   activatedAPI : {
  //                     synced : [...]
  //                     notSynced : [...]
  //                   }

  // }

  async function getStatusPeers(){


    let delegates = require('../../listOfNodes.json')
    let result_final = {
      name : "Status Peers",
      result : null
    };  
    
    let result = {
        desactivatedAPI : [],
        activatedAPI : {
          synced : [],
          notSynced : []
        }
      }
      for (let i = 0; i < delegates.length; i++) {
        try{
           // si le port est -1, l'api n'est pas disponible.
          if(delegates[i].ports['@arkecosystem/core-api']!='-1'){
            if(delegates[i].ports['@arkecosystem/core-api']){
              let add='http://'+delegates[i].ip+":"+delegates[i].ports['@arkecosystem/core-api']+'/api/node/status'
              let pair = await fetchAsync(add)

                if(pair.data.synced == true){
                  result.activatedAPI.synced.push(delegates[i].ip)
                }
                else{
                  result.activatedAPI.notSynced.push(delegates[i].ip)
                }
            }
          }
          else result.desactivatedAPI.push(delegates[i].ip)
        }
        catch(e){
          
        }       
      }
      result_final.result = result
      return result
  }
  // getStatusPeers()

  module.exports.getStatusPeers = getStatusPeers;
