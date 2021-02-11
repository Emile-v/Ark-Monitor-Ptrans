
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