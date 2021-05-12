const {url} = require("../../utils/globalvar")
const fetch = require('node-fetch');


async function fetchAsync (url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
  }


  async function getStatusPeers(){


    let delegates = require('../../listOfNodes.json')
    
    let result = {
        desactivatedAPI : [],
        activatedAPI : {
          synced : [],
          notSynced : []
        }
      }
      for(const elem of delegates){
        if(elem.ports['@arkecosystem/core-api']==4003){
          let add='http://'+elem.ip+":4003"+'/api/node/status'
          let pair = await fetchAsync(add)
          if(pair.data.synced === true){
            result.activatedAPI.synced.push(elem.ip)
          }
          else{
            result.activatedAPI.notSynced.push(elem.ip)
          }
        }
        else{
          result.desactivatedAPI.push(elem.ip)
        }
      };

      return result
  }

/** test function */
// async function test(){
//   let a = await getStatusPeers()
//   console.log(a)
// }

// test()

  module.exports.getStatusPeers = getStatusPeers;
