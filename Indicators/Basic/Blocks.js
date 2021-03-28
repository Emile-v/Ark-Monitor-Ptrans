let fetchAsync = require('../../utils/fetch')

function getBlocks(page=1, limit=100){
    console.log("Liste des blocks: ")
    fetchAsync('https://api.ark.io/api/blocks?page='+page+'&limit='+limit)
    .then(res => res.data)
    .then((resultat) => {
      console.log(resultat);
    })
  }


  function getBlockbyID(idblock){
    console.log("Liste des blocks: ")
    fetchAsync('https://api.ark.io/api/blocks/'+idblock)
    .then(res => res.data)
    .then((resultat) => {
      console.log(resultat);
    })
  }
  // getBlockbyID("3e3126993a27bdb36daa810360e5d2f167afbdf4dc117ea59571da46be7ad126");